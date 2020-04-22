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
import { PracticalInchargeComponent } from './teacherprofile/practical-incharge/practical-incharge.component'
import { StudentinfoComponent } from './studentinfo/studentinfo.component'
import { ExperimentComponent } from './studentinfo/experiment/experiment.component'
import { AttendanceComponent } from './studentinfo/attendance/attendance.component'

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/student', component: AdminComponent,
  children: [{ path: '', component: StudentComponent }]},
  { path: 'admin/teacher', component: AdminComponent,
  children: [{ path: '', component: TeacherComponent }]},
  { path: 'admin/timetable', component: AdminComponent,
  children: [{ path: '', component: TimetableComponent }]},
  { path: 'studentinfo', component: StudentinfoComponent},
  { path: 'studentinfo/experiment', component: StudentinfoComponent,
    children: [{ path: '', component: ExperimentComponent }]},
  { path: 'studentinfo/attendance', component: StudentinfoComponent,
    children: [{ path: '', component: AttendanceComponent }]},
  { path: 'studentprofile', component: StudentprofileComponent,canActivate:[AuthGuard] },
  { path: 'teacherprofile', component: TeacherprofileComponent,canActivate:[AuthGuard] },
  { path: 'teacherprofile/class_incharge', component: TeacherprofileComponent,
    children: [{ path: '', component: ClassInchargeComponent }]
  },
  { path: 'teacherprofile/subject_incharge', component: TeacherprofileComponent,
    children: [{ path: '', component: SubInchargeComponent }]},
  { path: 'teacherprofile/hod', component: TeacherprofileComponent,
    children: [{ path: '', component: HodComponent }]},
  { path: 'teacherprofile/practical_incharge', component: TeacherprofileComponent,
    children: [{ path: '', component: PracticalInchargeComponent }]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
