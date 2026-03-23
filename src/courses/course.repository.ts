import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';

@Injectable()
export class CourseRepository {
  constructor(
    @InjectRepository(Course)
    private readonly repo: Repository<Course>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  createCourse(data: Partial<Course>) {
    const course = this.repo.create(data);
    return this.repo.save(course);
  }

  updateCourse(id: number, data: Partial<Course>) {
    return this.repo.update(id, data);
  }

  deleteCourse(id: number) {
    return this.repo.delete(id);
  }
}
