import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: true,
      service: 'events-service',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
