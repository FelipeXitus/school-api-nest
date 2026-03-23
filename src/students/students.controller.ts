import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@ApiTags('Students')
@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os estudantes' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um estudante pelo ID' })
  @ApiResponse({ status: 200, description: 'Estudante encontrado' })
  @ApiResponse({ status: 404, description: 'Estudante não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria um novo estudante' })
  @ApiResponse({ status: 201, description: 'Estudante criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Payload inválido ou e-mail duplicado' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateStudentDto) {
    return this.studentsService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um estudante existente' })
  @ApiResponse({ status: 200, description: 'Estudante atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Estudante não encontrado' })
  @ApiResponse({ status: 400, description: 'Payload inválido ou e-mail duplicado' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um estudante pelo ID' })
  @ApiResponse({ status: 204, description: 'Estudante removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Estudante não encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.studentsService.delete(id);
    return { message: 'Estudante removido com sucesso' };
  }
}