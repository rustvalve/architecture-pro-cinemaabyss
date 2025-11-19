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

@Controller('api')
export class ProxyController {
  constructor(
    private readonly moviesProxyService: MoviesProxyService,
    private readonly eventsProxyService: EventsProxyService,
    private readonly usersProxyService: UsersProxyService,
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
}
