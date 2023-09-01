import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { List, InvalidToken } from '@Entities';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  firstName: string;

  @Column('varchar', { length: 60 })
  lastName: string;

  @Column('varchar', { length: 75, unique: true })
  email: string;

  @Column('varchar', { length: 128 })
  password: string;

  @Column('boolean', { default: false })
  verified: boolean;

  @OneToMany(() => List, (list) => list.owner)
  lists: List[];

  @OneToMany(() => InvalidToken, (invalidToken) => invalidToken.user)
  invalidTokens: InvalidToken[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
