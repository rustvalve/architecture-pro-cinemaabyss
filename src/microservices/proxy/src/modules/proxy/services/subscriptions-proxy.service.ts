import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class SubscriptionsProxyService {
  private readonly monolithUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.monolithUrl = this.configService.get<string>('MONOLITH_URL');
    console.log(
      'SubscriptionsProxyService initialized with monolith URL:',
      this.monolithUrl,
    );
  }

  async getSubscriptions(query: any, headers: any) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.monolithUrl}/api/subscriptions`, {
            params: query,
            headers: this.forwardHeaders(headers),
          })
          .pipe(
            catchError((error) => {
              throw new HttpException(
                error.response?.data || error.message,
                error.response?.status || 500,
              );
            }),
          ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSubscriptionById(id: string, headers: any) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.monolithUrl}/api/subscriptions?id=${id}`, {
            headers: this.forwardHeaders(headers),
          })
          .pipe(
            catchError((error) => {
              throw new HttpException(
                error.response?.data || error.message,
                error.response?.status || 500,
              );
            }),
          ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createSubscription(body: any, headers: any) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .post(`${this.monolithUrl}/api/subscriptions`, body, {
            headers: this.forwardHeaders(headers),
          })
          .pipe(
            catchError((error) => {
              throw new HttpException(
                error.response?.data || error.message,
                error.response?.status || 500,
              );
            }),
          ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  private forwardHeaders(headers: any): any {
    const headersToForward = ['authorization', 'content-type', 'user-agent'];
    const forwardedHeaders: any = {};

    headersToForward.forEach((header) => {
      if (headers[header]) {
        forwardedHeaders[header] = headers[header];
      }
    });

    return forwardedHeaders;
  }
}
