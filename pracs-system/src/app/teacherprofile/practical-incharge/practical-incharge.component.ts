import { Component, OnInit ,Input} from '@angular/core';

import { UserService } from '../../shared/user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import { TeacherprofileComponent } from '../teacherprofile.component'
// let student=require('../teacherprofile.component/userDetails');

var $ = require('jquery');
declare var require: any

@Component({
  selector: 'app-practical-incharge',
  templateUrl: './practical-incharge.component.html',
  styleUrls: ['./practical-incharge.component.css']
})
export class PracticalInchargeComponent implements OnInit {
  students;
  batches=[];
  teacher=this.userService.getData('role');
  flag=0
  constructor(private userService: UserService,private http: HttpClient) { }

  ngOnInit() {
    console.log(this.teacher);
    this.getbatch(this.teacher)
    // console.log(batch)
    // this.getstudents(batch)
  }

  uploadedFiles: Array < File > ;


  fileChange(element) {
    this.uploadedFiles = element.target.files;
}

upload() {
    let formData = new FormData();
    for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("file", this.uploadedFiles[i]);
    }
    return this.http.post(environment.apiBaseUrl+'/upload', formData)
        .subscribe((response) => {
            console.log('response received is ', response);
        })
}

getbatch(data){
  for(var i in data)
  {
    if(data[i]['Role']=='practical_incharge')
    {
      var s
      s=data[i]['Year']+' '+data[i]['Division']+' '+data[i]['Batch']+' '+data[i]['Subject_Name']
      this.batches.push(s)
    }
  }
}

selectbatch(batch){
  console.log(batch.target.value)
  var batch=batch.target.value
  var temp=[]
  temp=batch.split(' ')
  this.userService.setData('subject',temp[3])
  var data={'Year':temp[0],'Division':temp[1],'Batch':temp[2]}
  this.getstudents(data)
}

getstudents(data){
  var year=data['Year']
  var div=data['Division']
  var batch=data['Batch']
  this.userService.students(year,div,batch).subscribe(
    res=>{
      console.log(res,'hello')
      this.students=res['students']
    },
    err=>{
      console.log(err)
    }
  )

}

save(j){
  this.userService.setData('student',this.students[j])
}

slide(){
  // $(document).ready(function(){
    // $("#btn").click(function(){
      if(this.flag==1){
      $("#d").slideUp();
      this.flag=0
      return
      }
      if(this.flag==0){
      $("#d").slideDown();
      this.flag=1
      return
      }
    // });
  }

}
