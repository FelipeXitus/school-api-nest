import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private repo: Repository<Enrollment>,
  ) {}

  async create(dto: CreateEnrollmentDto) {
    const existing = await this.repo.findOne({
      where: { studentId: dto.studentId, courseId: dto.courseId },
    });

    if (existing) {
      throw new ConflictException({
        message: 'Enrollment already exists',
        details: ['student already enrolled in this course'],
        status: 409,
      });
    }

    const enrollment = this.repo.create(dto);
    return this.repo.save(enrollment);
  }
}
