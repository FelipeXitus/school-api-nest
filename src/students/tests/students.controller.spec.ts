import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from '../students.controller';
import { StudentsService } from '../students.service';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [{ provide: StudentsService, useValue: mockService }],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  it('deve listar estudantes', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);
    expect(await controller.findAll()).toEqual([{ id: 1 }]);
  });

  it('deve criar estudante', async () => {
    mockService.create.mockResolvedValue({ id: 1 });
    expect(
      await controller.create({ name: 'Felipe', email: 'felipe@test.com' }),
    ).toEqual({ id: 1 });
  });

  it('deve remover estudante', async () => {
    mockService.delete.mockResolvedValue(true);
    expect(await controller.delete(1)).toEqual({
      message: 'Estudante removido com sucesso',
    });
  });
});
