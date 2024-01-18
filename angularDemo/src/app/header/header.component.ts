import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  email: string = 'asd@gmail.com';
  onSubmit(form: any){}
  onInputChange(event: any){
  console.log("On Input change :",event);
  }
}
