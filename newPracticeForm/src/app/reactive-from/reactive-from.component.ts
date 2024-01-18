import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl} from "@angular/forms";
import {DatePipe, Location} from "@angular/common";
import {SharedService} from "../services/shared.service";
import {HttpHandlerServiceService} from "../services/http-handler-service.service";
import {observable} from "rxjs";
import {Router} from "@angular/router";
// import {ToastrModule, ToastrService} from "ngx-toastr";
import {ToastService} from "../services/toast.service";


@Component({
  selector: 'app-reactive-from',
  templateUrl: './reactive-from.component.html',
  styleUrls: ['./reactive-from.component.scss']
})
export class ReactiveFromComponent implements OnInit {
  submittedUserData: any[] = [];
  userDetails: any;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  i: any;
  maxDate: any;
  protected fetchedData: any;

  constructor(private formbuilder: FormBuilder,
              private date:DatePipe,
              private shared:SharedService,
              private httpHandlerService: HttpHandlerServiceService,
              private router: Router,
              private location: Location,
              private toast: ToastService
              ) { }

  ngOnInit(): void {
    this.userDetails = this.formbuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      age: [],
      dob: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
      familyDetails: this.formbuilder.array([]),
    });
    this.addFamilyDetails();

    this.maxDate=this.date.transform(new Date(),"yyyy-MM-dd");

    this.httpHandlerService.fetchPersonalDetail().subscribe(
      (response) => {
        // Handle the successful response here
        console.log('API call successful', response.data);
        this.fetchedData = response.data;
      },
      error => {
        // Handle the error here
        console.error('API call error', error);
      },
      () =>{
        console.log('API call completed');
      }
    )
  }


  OnReactiveFormSubmit(userDetails: any) {
   if(this.userDetails.valid){
     console.log("userDetails", userDetails);
     this.submittedUserData.push(userDetails);
     this.httpHandlerService.addPersonalDetail(userDetails).subscribe(
       response => {
         // Handle the successful response here
         console.log('API call successful', response);
         if(response.status == "success"){
           this.toast.showSuccess("Data Insert Vayo.");
           this.location.back();
         }

       },
       error => {
         // Handle the error here
         console.error('API call error', error);
       },
       () =>{
         console.log('API call completed');
       }
     );
   }else {
     this.toast.showError("Data ramari rakh!!");
   }

  }


  get getFamilyDetails(): FormArray {
    return this.userDetails.get('familyDetails') as FormArray;
  }

  addFamilyDetails() {
    this.getFamilyDetails.push(
      this.formbuilder.group({
          familyFirstName: ['', Validators.required],
          familyLastName: ['', Validators.required],
          familyDob: ['', Validators.required],
          familyAge: [],
          familyPhone: ['', Validators.required],
          familyEmail: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      })
    );
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;

     // Replace any non-numeric characters with an empty string
    input.value = value.replace(/\D/g, '');
  }

  deleteFamilyDetails(i: number) {
    this.getFamilyDetails.removeAt(i);
  }
  calculateAge() {
    const dobValue = this.userDetails.get('dob')?.value;
    if (dobValue) {
      const today = new Date();
      const dob = new Date(dobValue);
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      this.userDetails.get('age')?.patchValue(age.toString());
    }
  }
  familyCalculateAge(index: number) {
    const familyDetailsArray = this.getFamilyDetails.at(index) as FormGroup;
    const age = this.shared.familyCalculateAge(familyDetailsArray);

    if (age !== null) {
      familyDetailsArray.get('familyAge')?.patchValue(age);
    }
  }


  resetFrom(){
    this.userDetails.reset();
    this.getFamilyDetails.reset();
  }
  goBack(){
    this.location.back();
  }
}
