import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  shouldUseMonolith(migrationPercent: number): boolean {
    const random = Math.random() * 100;
    const useMonolith = random > migrationPercent;
    this.logger.debug(
      `Migration decision: ${useMonolith ? 'Monolith' : 'Microservice'} (random: ${random.toFixed(2)}, threshold: ${migrationPercent})`,
    );

    return useMonolith;
  }

  getMonolithUrl(): string {
    return process.env.MONOLITH_URL || 'http://monolith:8080';
  }

  getMoviesServiceUrl(): string {
    return process.env.MOVIES_SERVICE_URL || 'http://movies-service:8081';
  }

  getEventsServiceUrl(): string {
    return process.env.EVENTS_SERVICE_URL || 'http://events-service:8082';
  }

  getMigrationPercent(): number {
    return parseInt(process.env.MOVIES_MIGRATION_PERCENT || '0', 10);
  }

  isGradualMigrationEnabled(): boolean {
    return process.env.GRADUAL_MIGRATION === 'true';
  }
}
