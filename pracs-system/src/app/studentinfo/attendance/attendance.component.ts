import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  student
  subject
  attendance
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.student=this.userService.getData('student')
    this.subject=this.userService.getData('subject')
    this.userService.getattendance(this.student['student_id'],this.subject).subscribe(
      res=>{
        this.attendance=res['attend']
        console.log(this.attendance)
      },
      err=>{
        console.log(err)
      }
    )
  }

}
