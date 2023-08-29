import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User, Activity } from '@Entities';

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

  @OneToMany(() => Activity, (activity) => activity.list, {
    onDelete: 'CASCADE',
  })
  activities: Activity[];
}
