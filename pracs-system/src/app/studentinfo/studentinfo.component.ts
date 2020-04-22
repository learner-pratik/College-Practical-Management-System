import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-studentinfo',
  templateUrl: './studentinfo.component.html',
  styleUrls: ['./studentinfo.component.css']
})
export class StudentinfoComponent implements OnInit {
  student
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.student=this.userService.getData('student')
    console.log('particular student',this.student)
  }

}
