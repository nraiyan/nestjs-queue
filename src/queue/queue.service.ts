import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SERVICE_QUEUE } from 'src/utils/constant';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue(SERVICE_QUEUE) private readonly serviceQueue: Queue,
  ) {}

  async servicesQueue() {
    await this.serviceQueue.add({
      service_name: 'Queue testing........',
    });
    console.log('Services coming in!');
  }
}
