import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { User } from './user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    Id: '',
    Password: '',
    Ren_Password: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
  
  constructor(private http: HttpClient,private router:Router) { }

  //http methods
  postUser(user: User){
    console.log(user);
    return this.http.post(environment.apiBaseUrl+'/gen_pass',user,this.noAuthHeader);
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  // uploadexcel(user:User){
  //   return this.http.post(environment.apiBaseUrl + '/uploadexcel',user);
  // }

  getstudentProfile() {
    return this.http.get(environment.apiBaseUrl + '/studentProfile');
  }

  getteacherProfile() {
    return this.http.get(environment.apiBaseUrl + '/teacherProfile');
  }

  //Helper Methods
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.clear();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  
  private data;

  setData(key,data){
    // this.data = JSON.stringify(data);
    localStorage.setItem(key,JSON.stringify(data))
  }

  getData(key){
    let temp = localStorage.getItem(key);
    // this.clearData();
    
    return JSON.parse(temp);
  }

  clearData(){
    this.data = undefined;
  }

  experiments(sub)
  {
    const params = new HttpParams().set('Subject_Name',sub);
    console.log(params,'sending query');
    return this.http.get(environment.apiBaseUrl + '/exp',{params});
  }

  output(data){
    // const params1 = new HttpParams().append('Data',data);
    // console.log(params1,'sending query');
    const d={'data':data}
    // var d={'data':data}
    return this.http.post(environment.apiBaseUrl + '/submit',d);
  }

  role(t_id){
    console.log("request sending to server")
    const params = new HttpParams().set('t_id',t_id);
    console.log(params,'sending query');
    return this.http.get(environment.apiBaseUrl+'/getrole',{params});
  }

  students(y,d,b){
    console.log('searching students query')
    var params = new HttpParams().set('Year',y);
    params=params.append('Division',d)
    params=params.append('Batch',b)
    console.log(params)
    return this.http.get(environment.apiBaseUrl+'/getstudents',{params});
  }

  getsubmission(sub){
    const params = new HttpParams().set('Subject_Name',sub);
    return this.http.get(environment.apiBaseUrl+'/getsubmission',{params})
  }

  outputstudent(sub,exp,sid){
    var params = new HttpParams().set('Subject_Name',sub);
    params=params.append('Exp_Name',exp)
    params=params.append('student_id',sid)
    return this.http.get(environment.apiBaseUrl+'/outputstudent',{params});
  }

  getsubjects(y){
    const params = new HttpParams().set('Year',y);
    return this.http.get(environment.apiBaseUrl+'/getsubject',{params})
  }

  getattendance(sid,sub){
    var params = new HttpParams().set('Subject_Name',sub);
    params=params.append('student_id',sid)
    return this.http.get(environment.apiBaseUrl+'/getattendance',{params});
  }

  assigngrade(sid,sub,time,exp_name,grade){
    var params = new HttpParams().set('Subject_Name',sub);
    params=params.append('student_id',sid)
    params=params.append('time',time)
    params=params.append('exp_name',exp_name)
    params=params.append('grade',grade)
    return this.http.get(environment.apiBaseUrl+'/assigngrade',{params});
  }
  
  settimetable(data){
    console.log(data)
    // var params = new HttpParams().set('Day',data['Day'])
    // params=params.append('Time',data['Time'])
    // params=params.append('Subject_Name',data['Subject_Name'])
    // params=params.append('Lab',data['Lab'])
    // params=params.append('Batch',data['Batch'])
    // params=params.append('Year',data['Year'])
    // params=params.append('Division',data['Division'])
    // console.log(params)
    return this.http.post(environment.apiBaseUrl+'/admintimetable',{data});
  }

  setexperiment(data){
    console.log(data)
    return this.http.post(environment.apiBaseUrl+'/uploadexp',{data});
  }
  
  setrole(data){
    console.log(data,'sending')
    return this.http.post(environment.apiBaseUrl+'/role',{data});
  }

  getgrade(data){
    console.log(data)
    return this.http.post(environment.apiBaseUrl+'/getgrade',{data});
  }
}
