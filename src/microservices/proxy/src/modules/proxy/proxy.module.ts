import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyController } from './proxy.controller';
import { ProxyService } from './proxy.service';
import { MoviesProxyService } from './services/movies-proxy.service';
import { EventsProxyService } from './services/events-proxy.service';
import { UsersProxyService } from './services/users-proxy.service';
import { PaymentsProxyService } from './services/payments-proxy.service';
import { SubscriptionsProxyService } from './services/subscriptions-proxy.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [ProxyController],
  providers: [
    ProxyService,
    MoviesProxyService,
    EventsProxyService,
    UsersProxyService,
    PaymentsProxyService,
    SubscriptionsProxyService,
  ],
})
export class ProxyModule {}
