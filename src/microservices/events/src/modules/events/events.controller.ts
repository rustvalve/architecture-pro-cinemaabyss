import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateMovieEventDto } from './dto/create-movie-event.dto';
import { CreateUserEventDto } from './dto/create-user-event.dto';
import { CreatePaymentEventDto } from './dto/create-payment-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('movie')
  @HttpCode(HttpStatus.CREATED)
  async createMovieEvent(@Body() createMovieEventDto: CreateMovieEventDto) {
    return this.eventsService.createMovieEvent(createMovieEventDto);
  }

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  async createUserEvent(@Body() createUserEventDto: CreateUserEventDto) {
    return this.eventsService.createUserEvent(createUserEventDto);
  }

  @Post('payment')
  @HttpCode(HttpStatus.CREATED)
  async createPaymentEvent(
    @Body() createPaymentEventDto: CreatePaymentEventDto,
  ) {
    return this.eventsService.createPaymentEvent(createPaymentEventDto);
  }
}
