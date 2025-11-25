import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Headers,
} from '@nestjs/common';
import { MoviesProxyService } from 'src/modules/proxy/services/movies-proxy.service';
import { EventsProxyService } from 'src/modules/proxy/services/events-proxy.service';
import { UsersProxyService } from 'src/modules/proxy/services/users-proxy.service';
import { PaymentsProxyService } from 'src/modules/proxy/services/payments-proxy.service';
import { SubscriptionsProxyService } from 'src/modules/proxy/services/subscriptions-proxy.service';

@Controller('api')
export class ProxyController {
  constructor(
    private readonly moviesProxyService: MoviesProxyService,
    private readonly eventsProxyService: EventsProxyService,
    private readonly usersProxyService: UsersProxyService,
    private readonly paymentsProxyService: PaymentsProxyService,
    private readonly subscriptionsProxyService: SubscriptionsProxyService,
  ) {}

  @Get('movies')
  async getMovies(@Query() query: any, @Headers() headers: any) {
    return this.moviesProxyService.getMovies(query, headers);
  }

  @Get('movies/:id')
  async getMovieById(@Param('id') id: string, @Headers() headers: any) {
    return this.moviesProxyService.getMovieById(id, headers);
  }

  @Post('movies')
  async createMovie(@Body() body: any, @Headers() headers: any) {
    return this.moviesProxyService.createMovie(body, headers);
  }

  @Put('movies/:id')
  async updateMovie(
    @Param('id') id: string,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    return this.moviesProxyService.updateMovie(id, body, headers);
  }

  @Delete('movies/:id')
  async deleteMovie(@Param('id') id: string, @Headers() headers: any) {
    return this.moviesProxyService.deleteMovie(id, headers);
  }

  @Get('events')
  async getEvents(@Query() query: any, @Headers() headers: any) {
    return this.eventsProxyService.getEvents(query, headers);
  }

  @Get('events/:id')
  async getEventById(@Param('id') id: string, @Headers() headers: any) {
    return this.eventsProxyService.getEventById(id, headers);
  }

  @Post('events')
  async createEvent(@Body() body: any, @Headers() headers: any) {
    return this.eventsProxyService.createEvent(body, headers);
  }

  @Get('users')
  async getUsers(@Query() query: any, @Headers() headers: any) {
    return this.usersProxyService.getUsers(query, headers);
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: string, @Headers() headers: any) {
    return this.usersProxyService.getUserById(id, headers);
  }

  @Post('users')
  async createUser(@Body() body: any, @Headers() headers: any) {
    return this.usersProxyService.createUser(body, headers);
  }

  @Put('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: any,
    @Headers() headers: any,
  ) {
    return this.usersProxyService.updateUser(id, body, headers);
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string, @Headers() headers: any) {
    return this.usersProxyService.deleteUser(id, headers);
  }

  @Get('payments')
  async getPayments(@Query() query: any, @Headers() headers: any) {
    return this.paymentsProxyService.getPayments(query, headers);
  }

  @Get('payments/:id')
  async getPaymentById(@Param('id') id: string, @Headers() headers: any) {
    return this.paymentsProxyService.getPaymentById(id, headers);
  }

  @Post('payments')
  async createPayment(@Body() body: any, @Headers() headers: any) {
    return this.paymentsProxyService.createPayment(body, headers);
  }

  @Get('subscriptions')
  async getSubscriptions(@Query() query: any, @Headers() headers: any) {
    return this.subscriptionsProxyService.getSubscriptions(query, headers);
  }

  @Get('subscriptions/:id')
  async getSubscriptionById(@Param('id') id: string, @Headers() headers: any) {
    return this.subscriptionsProxyService.getSubscriptionById(id, headers);
  }

  @Post('subscriptions')
  async createSubscription(@Body() body: any, @Headers() headers: any) {
    return this.subscriptionsProxyService.createSubscription(body, headers);
  }
}
