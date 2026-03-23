import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from '../courses.controller';
import { CoursesService } from '../courses.service';

describe('CoursesController', () => {
  let controller: CoursesController;
  let service: CoursesService;

  const mockService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursesController],
      providers: [{ provide: CoursesService, useValue: mockService }],
    }).compile();

    controller = module.get<CoursesController>(CoursesController);
    service = module.get<CoursesService>(CoursesService);
  });

  it('deve listar cursos', async () => {
    mockService.findAll.mockResolvedValue([{ id: 1 }]);
    expect(await controller.findAll()).toEqual([{ id: 1 }]);
  });

  it('deve criar curso', async () => {
    mockService.create.mockResolvedValue({ id: 1 });
    expect(await controller.create({ title: 'NestJS' })).toEqual({ id: 1 });
  });

  it('deve remover curso', async () => {
    mockService.delete.mockResolvedValue(true);
    expect(await controller.delete(1)).toEqual({
      message: 'Curso removido com sucesso',
    });
  });
});
