import { Component, ViewChild } from '@angular/core';
import { FormContinerModel } from '../models/form-continer-model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form-continer',
  templateUrl: './form-continer.component.html',
  styleUrl: './form-continer.component.scss'
})

export class FormContinerComponent {

  @ViewChild('myForm') myForm!: NgForm;
  
  form: FormContinerModel = new FormContinerModel();
  
  userDetails: FormContinerModel[] = [];


  onSubmitForm(){
    const newUserDetails: FormContinerModel = { ...this.form };
    this.userDetails.push(newUserDetails);

    this.form = new FormContinerModel();

    this.myForm.resetForm();
  }

  calculateAge() {
    if(this.form.dob){
      const dob = new Date(this.form.dob);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();

      this.form.age = age.toString();
    }
  }
  showAlert(message: string){
    if(message){
      alert(message);
    }
  }
  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    
     // Replace any non-numeric characters with an empty string
    input.value = value.replace(/\D/g, '');
  }

}

