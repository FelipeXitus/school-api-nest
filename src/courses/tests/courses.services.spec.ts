import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from '../courses.service';
import { CourseRepository } from '../course.repository';

describe('CoursesService', () => {
  let service: CoursesService;
  let repo: CourseRepository;

  const mockRepo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    createCourse: jest.fn(),
    updateCourse: jest.fn(),
    deleteCourse: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: CourseRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    repo = module.get<CourseRepository>(CourseRepository);
  });

  it('deve listar cursos', async () => {
    mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
    expect(await service.findAll()).toEqual([{ id: 1 }]);
  });

  it('deve retornar um curso pelo ID', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    expect(await service.findOne(1)).toEqual({ id: 1 });
  });

  it('deve lançar erro ao buscar curso inexistente', async () => {
    mockRepo.findById.mockResolvedValue(null);
    await expect(service.findOne(1)).rejects.toThrow('Curso não encontrado');
  });

  it('deve criar curso', async () => {
    mockRepo.createCourse.mockResolvedValue({ id: 1 });
    expect(await service.create({ title: 'NestJS' })).toEqual({ id: 1 });
  });

  it('deve atualizar curso', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.updateCourse.mockResolvedValue(true);
    mockRepo.findById.mockResolvedValue({ id: 1, title: 'Updated' });

    expect(await service.update(1, { title: 'Updated' })).toEqual({
      id: 1,
      title: 'Updated',
    });
  });

  it('deve remover curso', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.deleteCourse.mockResolvedValue(true);

    await expect(service.delete(1)).resolves.not.toThrow();
  });
});
