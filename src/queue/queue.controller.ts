import { Controller, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('services')
  getService() {
    return this.queueService.servicesQueue();
  }
}
