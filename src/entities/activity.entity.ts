import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Priorities } from '@Common/enums';
import { List } from '@Entities';

@Entity('activity')
export class Activity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 70 })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: Priorities, default: Priorities.MEDIUM })
  priority: Priorities;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @ManyToOne(() => List, (list) => list.activities)
  list: List;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
