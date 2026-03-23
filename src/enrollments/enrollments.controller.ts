import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todas as matrículas' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  async findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma matrícula pelo ID' })
  @ApiResponse({ status: 200, description: 'Matrícula encontrada' })
  @ApiResponse({ status: 404, description: 'Matrícula não encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.enrollmentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma nova matrícula' })
  @ApiResponse({ status: 201, description: 'Matrícula criada com sucesso' })
  @ApiResponse({
    status: 400,
    description: 'Payload inválido ou matrícula duplicada',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma matrícula pelo ID' })
  @ApiResponse({ status: 204, description: 'Matrícula removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Matrícula não encontrada' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.enrollmentsService.delete(id);
    return { message: 'Matrícula removida com sucesso' };
  }
}
