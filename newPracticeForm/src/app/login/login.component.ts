import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpHandlerServiceService} from "../services/http-handler-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginDetail: any;

  constructor(private formbuilder: FormBuilder,
              private httpHandlerServiceService: HttpHandlerServiceService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.loginDetails();
  }

  private loginDetails() {
    this.loginDetail = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  login(data: any) {
    this.httpHandlerServiceService.postloginDetails(data).subscribe(
      (response: any) => {
        console.log("Response from server:", response);
        localStorage.setItem("token", response.data.token);
        this.router.navigate(["/home"]);
      },
      (error: any) => {
        console.error("Error:", error);
      }
    );
  }
}
