import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { stringify } from 'querystring';
import { SERVICE_QUEUE } from 'src/utils/constant';

@Processor(SERVICE_QUEUE)
export class ServiceQueueConsumer {
  //const logger = new logger(ServiceQueueConsumer.name)
  @Process()
  async serviceProcess(service: Job) {
    console.log('service id', service.id);
    console.log(JSON.stringify(service.data));

    await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
    console.log(`Service with id ${service.id} was sent successfully!!`);
  }
}
