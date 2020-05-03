import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

import { UserService } from '../../shared/user.service';
import { environment } from './../../../environments/environment'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [UserService]
})
export class StudentComponent implements OnInit {

  // constructor(private userService: UserService) { }

  ngOnInit() {
  }
  // model={
    
  // }

  // onSubmit(form : NgForm){
  //   this.userService.uploadexcel(form.value);
  // }

  
  uploadedFiles: Array < File > ;

  constructor(private http: HttpClient) {
      
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
    alert("student data uploaded");
}

}


