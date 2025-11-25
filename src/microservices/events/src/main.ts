import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const kafkaBrokers = (process.env.KAFKA_BROKERS || 'localhost:9092').split(
    ',',
  );

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'events-service',
        brokers: kafkaBrokers,
      },
      consumer: {
        groupId: 'events-service-group',
      },
    },
  });

  await app.startAllMicroservices();
  logger.log('Kafka microservice started');

  const port = process.env.PORT ?? 8082;
  await app.listen(port);
  logger.log(`🚀 Events Service is running on port ${port}`);
  logger.log(`📡 Kafka brokers: ${kafkaBrokers.join(', ')}`);
}

bootstrap();
