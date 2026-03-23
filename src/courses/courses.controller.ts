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
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // GET /courses
  @Get()
  @ApiOperation({ summary: 'Lista todos os cursos' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  async findAll() {
    return this.coursesService.findAll();
  }

  // GET /courses/:id
  @Get(':id')
  @ApiOperation({ summary: 'Busca um curso pelo ID' })
  @ApiResponse({ status: 200, description: 'Curso encontrado' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  // POST /courses
  @Post()
  @ApiOperation({ summary: 'Cria um novo curso' })
  @ApiResponse({ status: 201, description: 'Curso criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Payload inválido' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateCourseDto) {
    return this.coursesService.create(dto);
  }

  // PUT /courses/:id
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um curso existente' })
  @ApiResponse({ status: 200, description: 'Curso atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado' })
  @ApiResponse({ status: 400, description: 'Payload inválido' })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, dto);
  }

  // DELETE /courses/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um curso pelo ID' })
  @ApiResponse({ status: 204, description: 'Curso removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Curso não encontrado' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.coursesService.delete(id);
    return { message: 'Curso removido com sucesso' };
  }
}
