import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {

  faUserCircle = faUserCircle;
  
  userDetails;
  roles;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getteacherProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log("hello world");
        console.log(this.userDetails);
        // module.exports.userDetails=this.userDetails;
        // this.roles=this.userDetails.Role.split(',');
        // if (this.roles.length==1)
        // {
        //   this.router.navigateByUrl('/teacherprofile/'+this.roles[0]);
        // }
        this.userService.role(this.userDetails.teacher_id).subscribe(
          res=>{
            var s
            s=res['role']
            this.userService.setData('role',s)
            console.log(res['role'])
            var a=[]
            for (var i in res['role'])
            if(!a.includes(res['role'][i]['Role']))  
            a.push(res['role'][i]['Role'])
            this.roles=a
            console.log(this.roles,a)
            if (this.roles.length==1)
            {
              this.router.navigateByUrl('/teacherprofile/'+this.roles[0]);
            }
          },
          err=>{console.log(err)}
        );
        // this.userService.setData(this.userDetails);
        console.log(this.userDetails.teacher_id);
        // console.log(this.userService.getData())
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
 
}
