import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsService } from '../enrollments.service';
import { EnrollmentRepository } from '../enrollment.repository';
import { StudentsService } from '../../students/students.service';
import { CoursesService } from '../../courses/courses.service';

describe('EnrollmentsService', () => {
  let service: EnrollmentsService;
  let repo: EnrollmentRepository;

  const mockRepo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByStudentAndCourse: jest.fn(),
    createEnrollment: jest.fn(),
    deleteEnrollment: jest.fn(),
  };

  const mockStudentsService = {
    findOne: jest.fn(),
  };

  const mockCoursesService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnrollmentsService,
        { provide: EnrollmentRepository, useValue: mockRepo },
        { provide: StudentsService, useValue: mockStudentsService },
        { provide: CoursesService, useValue: mockCoursesService },
      ],
    }).compile();

    service = module.get<EnrollmentsService>(EnrollmentsService);
    repo = module.get<EnrollmentRepository>(EnrollmentRepository);
  });

  it('deve listar todas as matrículas', async () => {
    mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
    const result = await service.findAll();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('deve criar uma matrícula', async () => {
    mockStudentsService.findOne.mockResolvedValue(true);
    mockCoursesService.findOne.mockResolvedValue(true);
    mockRepo.findByStudentAndCourse.mockResolvedValue(null);
    mockRepo.createEnrollment.mockResolvedValue({ id: 1 });

    const result = await service.create({ studentId: 1, courseId: 1 });
    expect(result).toEqual({ id: 1 });
  });

  it('deve lançar erro ao tentar criar matrícula duplicada', async () => {
    mockStudentsService.findOne.mockResolvedValue(true);
    mockCoursesService.findOne.mockResolvedValue(true);
    mockRepo.findByStudentAndCourse.mockResolvedValue({ id: 99 });

    await expect(
      service.create({ studentId: 1, courseId: 1 }),
    ).rejects.toThrow('Estudante já matriculado neste curso');
  });

  it('deve remover uma matrícula', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.deleteEnrollment.mockResolvedValue(true);

    await expect(service.delete(1)).resolves.not.toThrow();
  });

  it('deve lançar erro ao remover matrícula inexistente', async () => {
    mockRepo.findById.mockResolvedValue(null);

    await expect(service.delete(1)).rejects.toThrow('Matrícula não encontrada');
  });
});
