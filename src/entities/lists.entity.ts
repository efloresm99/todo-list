import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user.entity';

@Entity('list')
export class List {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 100 })
  description?: string;

  @Column({ type: 'boolean', default: false })
  finished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.lists)
  owner: User;
}
