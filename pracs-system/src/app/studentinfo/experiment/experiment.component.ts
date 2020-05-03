import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
declare var require: any
var $ = require('jquery');

@Component({
  selector: 'app-experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css']
})
export class ExperimentComponent implements OnInit {
  student
  subject
  sublist=[]
  output
  outputquestion=[]
  exp=[]
  experiment
  ge
  gs
  gsid
  role
  exp_grade
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.student=this.userService.getData('student')
    this.role=this.userService.getData('role')
    if (this.role!='student'){
    this.subject=this.userService.getData('subject')
    this.userService.experiments(this.subject).subscribe(
      res=>{
        var e=res['exp']
        for(var i in e){
          this.exp.push(e[i])
        }
        console.log(this.exp)
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
    this.exp=[]
    this.userService.experiments(this.subject).subscribe(
      res=>{
        var e=res['exp']
        for(var i in e){
          this.exp.push(e[i])
        }
        console.log(this.exp)
      },
      err=>{
        console.log(err)
      }
    )
  }

  selectexp(e){
    var exp_name=this.exp[e]['Exp_Name']
    this.ge=exp_name
    this.gs=this.exp[e]['Subject_Name']
    this.gsid=this.student['student_id']
    this.userService.outputstudent(this.subject,exp_name,this.student['student_id']).subscribe(
      res=>{
        var sub=res['submission']
        console.log('out',sub,sub.length)
        if (sub.length==0)
        this.output=-101
        else{
        this.output=sub[0]['Output']
        this.outputquestion=sub[0]['Output_question']
        console.log(this.outputquestion[0])
        this.experiment=this.exp[e]['Question']
      }
      },
      err=>{
        console.log(err)
      }
    )
    this.grade();
  }

  assign(g){
    var grade=$('#grade').val();
    console.log(grade);
    this.userService.assigngrade(this.gsid,this.gs,'time',this.ge,grade).subscribe(
      res=>{
        console.log('Assigned')
      },
      err=>{
        console.log(err)
      }
    )
  }

  grade(){
    var data={'Exp_Name':this.ge,'Subject_Name':this.gs,'student_id':this.gsid}
    this.userService.getgrade(data).subscribe(
      res=>{
        console.log(res['grade'][0]['grade'])
        this.exp_grade=res['grade'][0]['grade']
        if (this.exp_grade=='A ')
        this.exp_grade='A+'
        if (this.exp_grade=='B ')
        this.exp_grade='B+'
      },
      err=>{
        console.log(err)
      }
    )
  }

}