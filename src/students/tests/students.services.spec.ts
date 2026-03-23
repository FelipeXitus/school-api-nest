import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from '../students.service';
import { StudentRepository } from '../student.repository';

describe('StudentsService', () => {
  let service: StudentsService;
  let repo: StudentRepository;

  const mockRepo = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    createStudent: jest.fn(),
    updateStudent: jest.fn(),
    deleteStudent: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: StudentRepository, useValue: mockRepo },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repo = module.get<StudentRepository>(StudentRepository);
  });

  it('deve listar estudantes', async () => {
    mockRepo.findAll.mockResolvedValue([{ id: 1 }]);
    expect(await service.findAll()).toEqual([{ id: 1 }]);
  });

  it('deve criar estudante', async () => {
    mockRepo.findByEmail.mockResolvedValue(null);
    mockRepo.createStudent.mockResolvedValue({ id: 1 });

    expect(
      await service.create({ name: 'Felipe', email: 'felipe@test.com' }),
    ).toEqual({ id: 1 });
  });

  it('deve lançar erro ao criar estudante com email duplicado', async () => {
    mockRepo.findByEmail.mockResolvedValue({ id: 99 });

    await expect(
      service.create({ name: 'Felipe', email: 'felipe@test.com' }),
    ).rejects.toThrow('E-mail já está em uso');
  });

  it('deve remover estudante', async () => {
    mockRepo.findById.mockResolvedValue({ id: 1 });
    mockRepo.deleteStudent.mockResolvedValue(true);

    await expect(service.delete(1)).resolves.not.toThrow();
  });
});
