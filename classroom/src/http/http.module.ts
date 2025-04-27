import path from 'node:path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { CoursesResolver } from './graphql/resolvers/courses.resolver';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments.resolver';
import { StudentsResolver } from './graphql/resolvers/students.resolver';
import { CoursesService } from '@/services/courses.service';
import { EnrollmentsService } from '@/services/enrollments.service';
import { StudentsService } from '@/services/students.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    // Revolers
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,

    // Services
    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
