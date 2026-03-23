import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Enrollments E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  it('/enrollments (POST) deve criar matrícula', async () => {
    const res = await request(app.getHttpServer())
      .post('/enrollments')
      .send({ studentId: 1, courseId: 1 })
      .expect(201);

    expect(res.body).toHaveProperty('id');
  });

  it('/enrollments (GET) deve listar matrículas', async () => {
    const res = await request(app.getHttpServer())
      .get('/enrollments')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/enrollments/:id (GET) deve retornar matrícula', async () => {
    const res = await request(app.getHttpServer())
      .get('/enrollments/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  it('/enrollments/:id (DELETE) deve remover matrícula', async () => {
    await request(app.getHttpServer())
      .delete('/enrollments/1')
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
