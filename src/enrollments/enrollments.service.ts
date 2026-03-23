import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EnrollmentRepository } from './enrollment.repository';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { StudentsService } from '../students/students.service';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    private readonly enrollmentRepo: EnrollmentRepository,
    private readonly studentsService: StudentsService,
    private readonly coursesService: CoursesService,
  ) {}

  async findAll() {
    return this.enrollmentRepo.findAll();
  }

  async findOne(id: number) {
    const enrollment = await this.enrollmentRepo.findById(id);
    if (!enrollment) {
      throw new NotFoundException('Matrícula não encontrada');
    }
    return enrollment;
  }

  async create(dto: CreateEnrollmentDto) {
    // valida se student existe
    await this.studentsService.findOne(dto.studentId);

    // valida se course existe
    await this.coursesService.findOne(dto.courseId);

    // valida matrícula duplicada
    const exists = await this.enrollmentRepo.findByStudentAndCourse(
      dto.studentId,
      dto.courseId,
    );

    if (exists) {
      throw new BadRequestException('Estudante já matriculado neste curso');
    }

    return this.enrollmentRepo.createEnrollment(dto);
  }

  async delete(id: number) {
    const existing = await this.enrollmentRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Matrícula não encontrada');
    }

    await this.enrollmentRepo.deleteEnrollment(id);
    return;
  }
}