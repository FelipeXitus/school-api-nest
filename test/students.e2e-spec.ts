import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Students E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.init();
  });

  it('/students (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/students')
      .send({ name: 'Felipe', email: 'felipe@test.com' })
      .expect(201);

    expect(res.body).toHaveProperty('id');
  });

  it('/students (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/students')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/students/:id (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/students/1')
      .expect(200);

    expect(res.body).toHaveProperty('id');
  });

  it('/students/:id (DELETE)', async () => {
    await request(app.getHttpServer()).delete('/students/1').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
