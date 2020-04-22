//built-in 
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
//routes
import { AppRoutingModule } from './app-routing.module';
import { UserService } from './shared/user.service';
//components
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { StudentprofileComponent } from './studentprofile/studentprofile.component';
import { TeacherprofileComponent } from './teacherprofile/teacherprofile.component';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { StudentComponent } from './admin/student/student.component';
import { TeacherComponent } from './admin/teacher/teacher.component';
import { TimetableComponent } from './admin/timetable/timetable.component';
import { SubInchargeComponent } from './teacherprofile/sub-incharge/sub-incharge.component';
import { ClassInchargeComponent } from './teacherprofile/class-incharge/class-incharge.component';
import { HodComponent } from './teacherprofile/hod/hod.component';
import { PracticalInchargeComponent } from './teacherprofile/practical-incharge/practical-incharge.component';
import { StudentinfoComponent } from './studentinfo/studentinfo.component';
import { ExperimentComponent } from './studentinfo/experiment/experiment.component';
import { AttendanceComponent } from './studentinfo/attendance/attendance.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    StudentprofileComponent,
    TeacherprofileComponent,
    AdminComponent,
    StudentComponent,
    TeacherComponent,
    TimetableComponent,
    SubInchargeComponent,
    ClassInchargeComponent,
    HodComponent,
    PracticalInchargeComponent,
    StudentinfoComponent,
    ExperimentComponent,
    AttendanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },UserService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
