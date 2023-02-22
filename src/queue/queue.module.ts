import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SERVICE_QUEUE } from 'src/utils/constant';
import { ServiceQueueConsumer } from './queue.consumer';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],

      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: SERVICE_QUEUE,
    }),
  ],
  providers: [QueueService, ServiceQueueConsumer],
  controllers: [QueueController],
})
export class QueueModule {}
