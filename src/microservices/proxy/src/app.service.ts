import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      service: 'proxy-service',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
