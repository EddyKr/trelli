import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../auth-service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup;

  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router,
              private http: HttpClient) {
    this.form = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    });

    if (authService.isLoggedIn()){
      console.log("You are already logged in!");
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit() {

  }

  register() {
    const val = this.form.value;

    var headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    if (val.username && val.password) {
      return this.http.post('http://localhost/Trelli/api/register.json', {'username': val.username, 'password': val.password}, {headers: headers})
          .subscribe(response => {
            this.processRegister(response);
          });
    }
  }

  processRegister(response){
    if (response.success == true){
      this.authService.setSession(response);
      console.log("User is logged in!");
      this.router.navigateByUrl('/');
    } else {
      console.log("Try again!");
      this.router.navigateByUrl('/register');
    }
  }

}
