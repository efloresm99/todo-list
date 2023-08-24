import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { List } from './lists.entity';

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

  @OneToMany(() => List, (list) => list.owner)
  lists: List[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
