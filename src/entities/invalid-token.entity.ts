import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '@Entities';

@Entity()
export class InvalidToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  jti: string;

  @ManyToOne(() => User, (user) => user.invalidTokens)
  user: User;
}
