import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  MessagePattern,
  Payload,
  Ctx,
  KafkaContext,
} from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumerService.name);

  onModuleInit() {
    this.logger.log('Kafka Consumer initialized');
  }

  @MessagePattern('movie-events')
  async handleMovieEvent(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originalMessage = context.getMessage();
    const partition = context.getPartition();
    const offset = originalMessage.offset;

    this.logger.log(
      `Consumed MOVIE event from partition ${partition} offset ${offset}`,
    );
    this.logger.log(`   Data: ${JSON.stringify(message)}`);

    this.processMovieEvent(message);
  }

  @MessagePattern('user-events')
  async handleUserEvent(@Payload() message: any, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const partition = context.getPartition();
    const offset = originalMessage.offset;

    this.logger.log(
      `Consumed USER event from partition ${partition} offset ${offset}`,
    );
    this.logger.log(`Data: ${JSON.stringify(message)}`);

    this.processUserEvent(message);
  }

  @MessagePattern('payment-events')
  async handlePaymentEvent(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originalMessage = context.getMessage();
    const partition = context.getPartition();
    const offset = originalMessage.offset;

    this.logger.log(
      `Consumed PAYMENT event from partition ${partition} offset ${offset}`,
    );
    this.logger.log(`   Data: ${JSON.stringify(message)}`);

    this.processPaymentEvent(message);
  }

  private processMovieEvent(event: any) {
    this.logger.log(`Processing movie event: ${event.id}`);
  }

  private processUserEvent(event: any) {
    this.logger.log(`Processing user event: ${event.id}`);
  }

  private processPaymentEvent(event: any) {
    this.logger.log(`Processing payment event: ${event.id}`);
  }
}
