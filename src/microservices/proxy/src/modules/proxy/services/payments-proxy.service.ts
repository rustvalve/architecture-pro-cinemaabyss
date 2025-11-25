import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class PaymentsProxyService {
  private readonly monolithUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.monolithUrl = this.configService.get<string>('MONOLITH_URL');
    console.log(
      'PaymentsProxyService initialized with monolith URL:',
      this.monolithUrl,
    );
  }

  async getPayments(query: any, headers: any) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.monolithUrl}/api/payments`, {
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

  async getPaymentById(id: string, headers: any) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(`${this.monolithUrl}/api/payments?id=${id}`, {
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

  async createPayment(body: any, headers: any) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .post(`${this.monolithUrl}/api/payments`, body, {
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
