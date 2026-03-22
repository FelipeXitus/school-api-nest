import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Courses (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/courses (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/courses')
      .send({ title: 'Math 101' });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Math 101');
  });
});
