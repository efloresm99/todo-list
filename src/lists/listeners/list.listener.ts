import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { ListListenerService } from '@Lists/services';

@Injectable()
export class ListListener {
  constructor(private readonly listListenerService: ListListenerService) {}

  @OnEvent('list.checkIfListIsFinished')
  async checkIfListIsFinished(ids: number[]): Promise<void> {
    this.listListenerService.checkIfListIsCompleted(ids);
  }
}
