import { Component, OnInit } from '@angular/core';

import { UserService } from '../../shared/user.service';
var $ = require('jquery');
declare var require: any

@Component({
  selector: 'app-class-incharge',
  templateUrl: './class-incharge.component.html',
  styleUrls: ['./class-incharge.component.css']
})
export class ClassInchargeComponent implements OnInit {

  students={}
  exp=[]
  batches=[0,0,0,0]
  complete=[]
  class=[]
  subject
  allsubject=[]
  data
  role=this.userService.getData('role')
  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.role);
    for(var i in this.role)
    {
      if(this.role[i]['Role']=='class_incharge')
      {
        var s
        s=this.role[i]['Year']+' '+this.role[i]['Division']
        this.class.push(s)
      }
    }
    
  }

  selectsubject(sub){
    this.subject=sub.target.value
    if(this.subject==-1){
      this.flag=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      // return
      }
    this.batches=[0,0,0,0]
    this.getstudents(this.data)
  }

  selectclass(sel){
    this.batches=[0,0,0,0]
    this.allsubject=[]
    console.log(sel.target.value)
    var sel=sel.target.value
    var temp=[]
    temp=sel.split(' ')
    this.data={'Year':temp[0],'Division':temp[1],'Batch':'all'}
    this.userService.getsubjects(temp[0]).subscribe(
      res=>{
        for(var i in res['subject'])
        this.allsubject.push(res['subject'][i]['Subject_Name'])
      },
      err=>{

      }
    )
    // this.getstudents(data)
  }

  getstudents(data){
    this.students={}
    var year=data['Year']
    var div=data['Division']
    var batch=data['Batch']
    this.userService.students(year,div,batch).subscribe(
      res=>{
        console.log(res,'hello')
        var s=res['students']
        for (var i in s){
          this.students[s[i]['student_id']]=s[i]
          this.batches[s[i]['Batch']-1]+=1
        }
        console.log(this.students)
        this.getsubmission()
      },
      err=>{
        console.log(err)
      }
    )
  
  }

  getsubmission(){
    this.exp=[]
    this.userService.getsubmission(this.subject).subscribe(
      res=>{
        console.log('submissions',res)
        for(var i in res['submission'])
        {
          if(!this.exp.includes(res['submission'][i]['Exp_Name']))
          this.exp.push(res['submission'][i]['Exp_Name'])    
        }
        console.log('experiments',this.exp)
        for(var i in this.exp){
          var done=[0,0,0,0]
          for(var j in res['submission'])
        {
          if(Object.keys(this.students).includes(res['submission'][j]['student_id']) && res['submission'][j]['Exp_Name']==this.exp[i])
          {
            var b=this.students[res['submission'][j]['student_id']]['Batch']
            // console.log('var b',b)
            done[b-1]+=1
          }
          console.log('done',done)
        }
        this.complete.push(done)
        console.log('completing',this.complete)
        }

        console.log('completed',this.complete)
      },
      err=>{
        console.log(err)
      }
    )
  }

  flag=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  slide(x){
  // $(document).ready(function(){
    // $("#btn").click(function(){
      
      if(this.flag[x]==1){
      $("#"+x).slideUp();
      this.flag[x]=0
      return
      }
      if(this.flag[x]==0){
      $("#"+x).slideDown();
      this.flag[x]=1
      return
      }
    // });
  }

}
