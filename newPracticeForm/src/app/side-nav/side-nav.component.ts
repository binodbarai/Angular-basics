import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {
  constructor(private router: Router) {
  }
  onLogout(){
    this.router.navigate(["/login"]);
    localStorage.removeItem("token");
  }
}
