import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
declare var require: any
var $ = require('jquery');
// import $ from 'jquery';
// window.jQuery = window.$ = $;

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.css']
})
export class StudentprofileComponent implements OnInit {

  userDetails;
  timetable;
  subject;
  questions;
  out;
  answer=[];
  
  // length;
  experiments;
  select_exp=0;
  expname='EXP5'
  url='hello'
  constructor(private userService: UserService, private router: Router,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.userService.getstudentProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.subject=this.userDetails['subject_name'];
        this.experiments=0;
        // this.length=this.subject.length;
        // this.timetable=res['time'];
        console.log(this.userDetails,this.subject);
        // console.log(this.timetable);
        if (this.subject.length==1)
        {
          var sub=this.subject[0];
          this.findexp(sub);
        }
      },
      err => { 
        console.log(err);
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  check(){
    console.log('js working');
  }

  select(event:any){
    console.log(event.target.value);
    var sub=event.target.value;
    this.findexp(sub);
  }

  findexp(sub)
  {
    console.log('calling query');
    this.userService.experiments(sub).subscribe(
      res=>{
        console.log(res['exp']);
        var temp=[]
        for(var i in res['exp'])
        {
          temp.push(res['exp'][i])
        }
        console.log(temp);
        this.experiments=temp;
      },
      err=>{
        console.log('error');
      }
    );
  }

  open(i){
    console.log(i['Question'])
    this.select_exp=i
    this.expname=this.select_exp['Exp_Name']
    this.url='http://docs.google.com/gview?url=https://91a30372.ngrok.io/api/file/'+this.expname+'.pdf&embedded=true'
    this.questions=i['Question'];
  }

  submit(){
    console.log('submit')
    var i
    for(i=0;i<this.questions.length;i++){
      var x='#'+i.toString()
      console.log($(x).val())
      this.answer.push($(x).val())
    }
    this.out=$('#output').val();
    var data={
      'Subject':this.select_exp['Subject_Name'],
      'Exp_Name':this.select_exp['Exp_Name'],
      'student_id':this.userDetails['student_id'],
      'Output':this.out,
      'Output_question':this.answer
    }
    this.userService.output(data).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err)
      }
    );
    console.log(data);
  }

  model={
    language:"",
    code:"",
    input:"",
    output:"",
    error:"",
    message:"",
    description:"",
    // answer:""
  }
  codesubmit(form:NgForm){
    console.log('in function');
    var x,y,token,timer = '';
    var lang = 'C';
    var code ='';
    var my_input='';
    var gfg_compiler_api_endpoint = "https://api.judge0.com/submissions/";
    var languages = ['C', 'Cpp', 'Cpp14', 'Java', 'Python', 'Python3', 'Scala', 'Php', 'Perl', 'Csharp'];
    lang=$("#lang").val();
    // alert(lang);
    code=$("#code").val();
    my_input=$("#input").val();
    x = $.post(gfg_compiler_api_endpoint+'?base64_encoded=false&wait=true/' ,{'language_id': lang,'source_code': code,'stdin': my_input } ).done(function(data) {
      token = data['token']+'/'
       let timer = setInterval(function(){
                  y = $.get(gfg_compiler_api_endpoint + token).done(function(op){
                    if (op['status']['id']!=1 && op['status']['id']!=2){
                      clearInterval(timer);
                      // console.log(op['stdout']);
                      // this.output=op['stdout'];
                      // this.out=op['stdout'];
                      // console.log(this.out);
                      $("#output").val(op['stdout']);
                      $("#error").val(op['stderr']);
                      $("#message").val(op['message']);
                      $("#description").val(op['status']['description']);
                    }
                  }).fail(function(){
                    alert("error1");
                  });
                }, 1000)
      }).fail(function() {
          alert( "error2" );
        });
    console.log('form',form.value);
  }

}
