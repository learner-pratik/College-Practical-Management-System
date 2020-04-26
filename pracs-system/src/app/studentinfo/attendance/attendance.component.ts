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
  role
  sublist=[]
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.student=this.userService.getData('student')
    this.role=this.userService.getData('role')
    if (this.role!='student'){
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
    else{
      this.userService.getsubjects(this.student['Year']).subscribe(
        res=>{
          console.log(res['subject'],'sub')
          for(var i in res['subject'])
          {
            this.sublist.push(res['subject'][i]['Subject_Name'])
          }
          console.log(this.sublist)
        },
        err=>{
          console.log(err)
        }
      )
    }
  }

  selectsub(s){
    this.subject=s
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