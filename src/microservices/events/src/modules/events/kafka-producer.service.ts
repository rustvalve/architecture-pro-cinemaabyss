import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaProducerService implements OnModuleInit {
  private readonly logger = new Logger(KafkaProducerService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const topics = ['movie-events', 'user-events', 'payment-events'];

    for (const topic of topics) {
      await this.kafkaClient.connect();
    }

    this.logger.log('Kafka Producer connected');
  }

  async sendMessage(
    topic: string,
    message: any,
  ): Promise<{ partition: number; offset: string }> {
    try {
      this.logger.debug(
        `Sending message to topic ${topic}: ${JSON.stringify(message)}`,
      );

      const result = await this.kafkaClient
        .emit(topic, {
          key: message.id,
          value: JSON.stringify(message),
        })
        .toPromise();

      return {
        partition: 0,
        offset: Date.now().toString(),
      };
    } catch (error) {
      this.logger.error(
        `Error sending message to Kafka: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }
}
