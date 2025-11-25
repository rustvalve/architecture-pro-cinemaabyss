import {
  IsInt,
  IsNumber,
  IsString,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreatePaymentEventDto {
  @IsInt()
  payment_id: number;

  @IsInt()
  user_id: number;

  @IsNumber()
  amount: number;

  @IsString()
  status: string;

  @IsDateString()
  timestamp: string;

  @IsOptional()
  @IsString()
  method_type?: string;
}
