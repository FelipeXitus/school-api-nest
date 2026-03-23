import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(private readonly studentRepo: StudentRepository) {}

  async findAll() {
    return this.studentRepo.findAll();
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findById(id);
    if (!student) {
      throw new NotFoundException('Estudante não encontrado');
    }
    return student;
  }

  async create(dto: CreateStudentDto) {
    const existing = await this.studentRepo.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('E-mail já está em uso');
    }

    return this.studentRepo.createStudent(dto);
  }

  async update(id: number, dto: UpdateStudentDto) {
    const existing = await this.studentRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Estudante não encontrado');
    }

    if (dto.email && dto.email !== existing.email) {
      const emailExists = await this.studentRepo.findByEmail(dto.email);
      if (emailExists) {
        throw new BadRequestException('E-mail já está em uso');
      }
    }

    await this.studentRepo.updateStudent(id, dto);
    return this.findOne(id);
  }

  async delete(id: number) {
    const existing = await this.studentRepo.findById(id);
    if (!existing) {
      throw new NotFoundException('Estudante não encontrado');
    }

    await this.studentRepo.deleteStudent(id);
    return;
  }
}