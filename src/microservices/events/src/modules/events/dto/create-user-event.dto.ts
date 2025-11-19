import {
  IsInt,
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateUserEventDto {
  @IsInt()
  user_id: number;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  action: string;

  @IsDateString()
  timestamp: string;
}
