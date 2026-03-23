import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({ example: 'Felipe Andrade' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'felipe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Software Engineering', required: false })
  @IsOptional()
  @IsString()
  course?: string;
}