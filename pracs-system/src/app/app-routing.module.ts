import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { TeacherprofileComponent } from './teacherprofile/teacherprofile.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { StudentComponent } from './admin/student/student.component';
import { TeacherComponent } from './admin/teacher/teacher.component';
import { TimetableComponent } from './admin/timetable/timetable.component';
import { ClassInchargeComponent } from './teacherprofile/class-incharge/class-incharge.component';
import { SubInchargeComponent } from './teacherprofile/sub-incharge/sub-incharge.component';
import { HodComponent } from './teacherprofile/hod/hod.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/student', component: StudentComponent},
  { path: 'admin/teacher', component: TeacherComponent},
  { path: 'admin/timetable', component: TimetableComponent},
  { path: 'studentprofile', component: StudentprofileComponent,canActivate:[AuthGuard] },
  { path: 'teacherprofile', component: TeacherprofileComponent,canActivate:[AuthGuard] },
  { path: 'teacherprofile/class_incharge', component: ClassInchargeComponent},
  { path: 'teacherprofile/subject_incharge', component: SubInchargeComponent},
  { path: 'teacherprofile/hod', component: HodComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
