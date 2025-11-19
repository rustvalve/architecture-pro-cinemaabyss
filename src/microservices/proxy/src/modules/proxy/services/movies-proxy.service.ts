import { Injectable, Logger, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProxyService } from 'src/modules/proxy/proxy.service';

@Injectable()
export class MoviesProxyService {
  private readonly logger = new Logger(MoviesProxyService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly proxyService: ProxyService,
  ) {}

  private getTargetUrl(): string {
    if (this.proxyService.isGradualMigrationEnabled()) {
      const migrationPercent = this.proxyService.getMigrationPercent();
      const useMonolith = this.proxyService.shouldUseMonolith(migrationPercent);

      if (useMonolith) {
        this.logger.log('Routing to Monolith');
        return this.proxyService.getMonolithUrl();
      }

      this.logger.log('Routing to Movies Microservice');
      return this.proxyService.getMoviesServiceUrl();
    }

    return this.proxyService.getMoviesServiceUrl();
  }

  async getMovies(query: any, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/movies`;

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

  async getMovieById(id: string, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/movies/${id}`;

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

  async createMovie(body: any, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/movies`;

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

  async updateMovie(id: string, body: any, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/movies/${id}`;

      this.logger.debug(`Proxying PUT ${url}`);

      const response = await firstValueFrom(
        this.httpService.put(url, body, {
          headers: this.filterHeaders(headers),
        }),
      );

      return response.data;
    } catch (error: any) {
      this.handleError(error);
    }
  }

  async deleteMovie(id: string, headers: any) {
    try {
      const targetUrl = this.getTargetUrl();
      const url = `${targetUrl}/api/movies/${id}`;

      this.logger.debug(`Proxying DELETE ${url}`);

      const response = await firstValueFrom(
        this.httpService.delete(url, {
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
