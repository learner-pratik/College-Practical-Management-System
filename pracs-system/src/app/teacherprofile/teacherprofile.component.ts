import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-teacherprofile',
  templateUrl: './teacherprofile.component.html',
  styleUrls: ['./teacherprofile.component.css']
})
export class TeacherprofileComponent implements OnInit {

  userDetails;
  roles;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getteacherProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        // module.exports.userDetails=this.userDetails;
        this.roles=this.userDetails.Role.split(',');
        if (this.roles.length==1)
        {
          this.router.navigateByUrl('/teacherprofile/'+this.roles[0]);
        }
        this.userService.setData(this.userDetails);
        console.log(this.userDetails.teacher_id);
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
