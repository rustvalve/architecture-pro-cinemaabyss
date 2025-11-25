import {
  IsInt,
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CreateMovieEventDto {
  @IsInt()
  movie_id: number;

  @IsString()
  title: string;

  @IsString()
  action: string;

  @IsOptional()
  @IsInt()
  user_id?: number;

  @IsOptional()
  @IsNumber()
  rating?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres?: string[];

  @IsOptional()
  @IsString()
  description?: string;
}
