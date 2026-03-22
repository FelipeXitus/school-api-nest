import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './courses/course.entity';
import { Student } from './students/student.entity';
import { Enrollment } from './enrollments/enrollment.entity';
import { CoursesModule } from './courses/courses.module';
import { StudentsModule } from './students/students.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/database.sqlite',
      entities: [Course, Student, Enrollment],
      synchronize: true, // em produção, usar migrações
    }),
    CoursesModule,
    StudentsModule,
    EnrollmentsModule,
    HealthModule,
  ],
})
export class AppModule {}
