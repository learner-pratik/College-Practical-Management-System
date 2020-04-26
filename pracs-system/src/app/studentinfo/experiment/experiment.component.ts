import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

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
  }

  selectgrade(g){
    var grade=g.target.value
    this.userService.assigngrade(this.gsid,this.gs,'time',this.ge,grade).subscribe(
      res=>{
        console.log('Assigned')
      },
      err=>{
        console.log(err)
      }
    )
  }

}