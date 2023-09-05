import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Observable, lastValueFrom } from 'rxjs';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';

import { VerifyUserDto } from '@Common/dtos';
import { User } from '@Entities';

import { CreateUserDto } from '../dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject('VERIFICATION') private readonly verificationClient: ClientProxy,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salts = +process.env.PASSWORD_SALTS;
    const { password: unencryptedPassword, ...userData } = createUserDto;
    const password = await bcrypt.hash(unencryptedPassword, salts);
    const userToSave = this.usersRepository.create({
      ...userData,
      password,
    });
    const user = await this.usersRepository.save(userToSave);
    const validation = await this.createUserVerification(user.email);
    const identifier = await lastValueFrom(validation);
    // TODO: send email to user with the identifier
    return user;
  }

  async getOneUserForAuth(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email, verified: true },
      relations: {
        invalidTokens: true,
      },
    });
  }

  async getUserVerification(email: string): Promise<string> {
    return await lastValueFrom(
      this.verificationClient.send(
        { cmd: 'get_verification_by_custom_id' },
        { customId: email },
      ),
    );
  }

  async createUserVerification(email: string): Promise<Observable<any>> {
    return this.verificationClient.send(
      { cmd: 'create_verification' },
      { customId: email, format: 'string' },
    );
  }

  async verifyUser(verifyUserDto: VerifyUserDto): Promise<void> {
    const { verificationId, userEmail } = verifyUserDto;
    const result = this.verificationClient.send(
      { cmd: 'verify' },
      { verificationId },
    );
    const customId = await lastValueFrom(result);
    const emailsAreDifferent = customId !== userEmail;
    const customIdNotFound = !customId;
    const validationFailed = emailsAreDifferent || customIdNotFound;
    if (validationFailed) {
      this.userValidationFailed();
    }
    const user = await this.usersRepository.findOne({
      where: {
        email: customId,
      },
    });
    if (!user) {
      this.userValidationFailed();
    }
    user.verified = true;
    this.usersRepository.save(user);
    this.verificationClient.emit('delete_verification', { verificationId });
  }

  private userValidationFailed(): void {
    throw new UnprocessableEntityException('Unable to verify user');
  }
}
