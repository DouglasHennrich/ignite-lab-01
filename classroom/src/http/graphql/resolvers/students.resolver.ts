import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Student } from '../models/student';
import { StudentsService } from '@/services/students.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '@/http/auth/authorization.guard';
import { EnrollmentsService } from '@/services/enrollments.service';
import { CurrentUser, IAuthUser } from '@/http/auth/current-user';

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  me(@CurrentUser() user: IAuthUser) {
    return this.studentsService.getStudentByAuthUserId(user.sub);
  }

  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  students() {
    return this.studentsService.listAllStudents();
  }

  @ResolveField()
  enrollments(@Parent() student: Student) {
    return this.enrollmentsService.listEnrollmentsByStudentId(student.id);
  }
}
