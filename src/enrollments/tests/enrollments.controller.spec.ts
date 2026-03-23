import { Test, TestingModule } from '@nestjs/testing';
import { EnrollmentsController } from '../enrollments.controller';
import { EnrollmentsService } from '../enrollments.service';

describe('EnrollmentsController', () => {
  let controller: EnrollmentsController;
  let service: EnrollmentsService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnrollmentsController],
      providers: [{ provide: EnrollmentsService, useValue: mockService }],
    }).compile();

    controller = module.get<EnrollmentsController>(EnrollmentsController);
    service = module.get<EnrollmentsService>(EnrollmentsService);
  });

  it('deve listar matrículas', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('deve criar matrícula', async () => {
    mockService.create.mockResolvedValue({ id: 1 });
    const result = await controller.create({ studentId: 1, courseId: 1 });
    expect(result).toEqual({ id: 1 });
  });

  it('deve remover matrícula', async () => {
    mockService.delete.mockResolvedValue(true);
    const result = await controller.delete(1);
    expect(result).toEqual({ message: 'Matrícula removida com sucesso' });
  });
});
