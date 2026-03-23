import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';

@Injectable()
export class StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  createStudent(data: Partial<Student>) {
    const student = this.repo.create(data);
    return this.repo.save(student);
  }

  updateStudent(id: number, data: Partial<Student>) {
    return this.repo.update(id, data);
  }

  deleteStudent(id: number) {
    return this.repo.delete(id);
  }
}