import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private readonly courseRepo: CourseRepository) {}

  async findAll() {
    return this.courseRepo.findAll();
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findById(id);
    if (!course) {
      throw new NotFoundException('Curso não encontrado');
    }
    return course;
  }

  async create(dto: CreateCourseDto) {
    return this.courseRepo.createCourse(dto);
  }

  async update(id: number, dto: UpdateCourseDto) {
    const existing = await this.courseRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Curso não encontrado');
    }

    await this.courseRepo.updateCourse(id, dto);
    return this.findOne(id);
  }

  async delete(id: number) {
    const existing = await this.courseRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Curso não encontrado');
    }

    await this.courseRepo.deleteCourse(id);
    return;
  }
}