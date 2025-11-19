import { Injectable, Logger } from '@nestjs/common';
import { KafkaProducerService } from './kafka-producer.service';
import { CreateMovieEventDto } from './dto/create-movie-event.dto';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { CreatePaymentEventDto } from './dto/create-payment-event.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);

  constructor(private readonly kafkaProducerService: KafkaProducerService) {}

  async createMovieEvent(dto: CreateMovieEventDto) {
    this.logger.log(`Creating movie event: ${JSON.stringify(dto)}`);

    const event = {
      id: `movie-${dto.movie_id}-${Date.now()}`,
      type: 'movie',
      timestamp: new Date().toISOString(),
      payload: dto,
    };

    const result = await this.kafkaProducerService.sendMessage(
      'movie-events',
      event,
    );

    this.logger.log(
      `Movie event sent to Kafka: partition=${result.partition}, offset=${result.offset}`,
    );

    return {
      status: 'success',
      partition: result.partition,
      offset: result.offset,
      event,
    };
  }

  async createUserEvent(dto: CreateUserEventDto) {
    this.logger.log(`Creating user event: ${JSON.stringify(dto)}`);

    const event = {
      id: `user-${dto.user_id}-${Date.now()}`,
      type: 'user',
      timestamp: dto.timestamp || new Date().toISOString(),
      payload: dto,
    };

    const result = await this.kafkaProducerService.sendMessage(
      'user-events',
      event,
    );

    this.logger.log(
      `User event sent to Kafka: partition=${result.partition}, offset=${result.offset}`,
    );

    return {
      status: 'success',
      partition: result.partition,
      offset: result.offset,
      event,
    };
  }

  async createPaymentEvent(dto: CreatePaymentEventDto) {
    this.logger.log(`Creating payment event: ${JSON.stringify(dto)}`);

    const event = {
      id: `payment-${dto.payment_id}-${Date.now()}`,
      type: 'payment',
      timestamp: dto.timestamp || new Date().toISOString(),
      payload: dto,
    };

    const result = await this.kafkaProducerService.sendMessage(
      'payment-events',
      event,
    );

    this.logger.log(
      `Payment event sent to Kafka: partition=${result.partition}, offset=${result.offset}`,
    );

    return {
      status: 'success',
      partition: result.partition,
      offset: result.offset,
      event,
    };
  }
}
