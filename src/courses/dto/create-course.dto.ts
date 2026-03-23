import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ example: 'Node.js Fundamentals' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Backend', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 'Curso introdutório de Node.js', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
