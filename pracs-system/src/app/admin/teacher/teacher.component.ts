import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../../shared/user.service';
import { environment } from './../../../environments/environment'

declare var require: any
var $ = require('jquery');

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {

  // constructor() { }

  ngOnInit() {
  }

  
  
  uploadedFiles: Array < File > ;

  constructor(private http: HttpClient,private userService:UserService) {
      
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
}

upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("file", this.uploadedFiles[i]);
    }
    return this.http.post(environment.apiBaseUrl+'/uploadexcel', formData)
        .subscribe((response) => {
            console.log('response received is ', response);
        })
    alert("professor database uploaded");
}

submit(){
  var data={
    'teacher_id':$('#teacher_id').val(),
    'Role':$('#Role').val(),
    'Year':$('#Year').val(),
    'Batch':$('#Batch').val(),
    'Division':$('#Division').val(),
    'Subject_Name':$('#Subject_Name').val()
  }
  console.log(data);
  this.userService.setrole(data).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    )
  alert("professor role added");
}

}
