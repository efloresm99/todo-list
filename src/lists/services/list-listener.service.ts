import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { List } from '@Entities';

@Injectable()
export class ListListenerService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>,
  ) {}

  async checkIfListIsCompleted(activityIds: number[]): Promise<void> {
    const list = await this.listRepository
      .createQueryBuilder('list')
      .innerJoinAndSelect('list.activities', 'activities')
      .where(
        'list.id = (SELECT DISTINCT "listId" FROM "activity" WHERE "id" IN (:...activityIds))',
        {
          activityIds,
        },
      )
      .getOne();
    const listIsFinished = list.activities.every((act) => act.completed);
    const listStatusChanged = list.finished !== listIsFinished;
    if (listStatusChanged) {
      list.finished = listIsFinished;
      await this.listRepository.save(list);
    }
  }
}
