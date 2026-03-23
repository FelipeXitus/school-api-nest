import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';

@Injectable()
export class EnrollmentRepository {
  constructor(
    @InjectRepository(Enrollment)
    private readonly repo: Repository<Enrollment>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['student', 'course'] });
  }

  findById(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['student', 'course'],
    });
  }

  findByStudentAndCourse(studentId: number, courseId: number) {
    return this.repo.findOne({ where: { studentId, courseId } });
  }

  createEnrollment(data: Partial<Enrollment>) {
    const enrollment = this.repo.create(data);
    return this.repo.save(enrollment);
  }

  deleteEnrollment(id: number) {
    return this.repo.delete(id);
  }
}