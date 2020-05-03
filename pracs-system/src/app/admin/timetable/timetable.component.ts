import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
declare var require: any
var $ = require('jquery');

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})
export class TimetableComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
  }

  submit(){
    var time=$('#Time').val()
    time=time.split('-')
    var data={
     'Day':$('#Day').val(),
     'Time':time,
     'Subject_Name':$('#Subject_Name').val(),
     'Lab':$('#Lab').val(),
     'Batch':$('#Batch').val(),
     'Year':$('#Year').val(),
     'Division':$('#Division').val()
    }
    this.userService.settimetable(data).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
    alert("timetable added");
  }

}
