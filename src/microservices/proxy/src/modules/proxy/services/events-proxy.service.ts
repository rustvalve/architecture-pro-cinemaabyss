import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProxyService } from 'src/modules/proxy/proxy.service';

@Injectable()
export class EventsProxyService {
  private readonly logger = new Logger(EventsProxyService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly proxyService: ProxyService,
  ) {}

  private getTargetUrl(): string {
    return this.proxyService.getEventsServiceUrl();
  }

  async getEvents(query: any, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/events`;

      this.logger.debug(`Proxying GET ${url}`);

      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: query,
          headers: this.filterHeaders(headers),
        }),
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async getEventById(id: string, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/events/${id}`;

      this.logger.debug(`Proxying GET ${url}`);

      const response = await firstValueFrom(
        this.httpService.get(url, {
          headers: this.filterHeaders(headers),
        }),
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async createEvent(body: any, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/events`;

      this.logger.debug(`Proxying POST ${url}`);

      const response = await firstValueFrom(
        this.httpService.post(url, body, {
          headers: this.filterHeaders(headers),
        }),
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private filterHeaders(headers: any): Record<string, string> {
    const filtered: Record<string, string> = {};
    const allowedHeaders = [
      'authorization',
      'content-type',
      'accept',
      'user-agent',
    ];

    for (const key of Object.keys(headers)) {
      if (allowedHeaders.includes(key.toLowerCase())) {
        filtered[key] = headers[key];
      }
    }

    return filtered;
  }

  private handleError(error: any): never {
    if (error.response) {
      this.logger.error(
        `Upstream service error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
      );
      throw new HttpException(error.response.data, error.response.status);
    }

    this.logger.error(`Request failed: ${error.message}`);
    throw new HttpException(
      {
        message: 'Service unavailable',
        error: error.message,
      },
      503,
    );
  }
}
