import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DatePipe, Location} from "@angular/common";
import {SharedService} from "../services/shared.service";
import {HttpHandlerServiceService} from "../services/http-handler-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastService} from "../services/toast.service";
@Component({
  selector: 'app-edit-personal-detial',
  templateUrl: './edit-personal-detial.component.html',
  styleUrl: './edit-personal-detial.component.scss'
})
export class EditPersonalDetialComponent implements OnInit{
  submittedUserData: any[] = [];
  userDetails: any;
  emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  i: any;
  maxDate: any;
  protected fetchedData: any;
  id: any;
  private familyDetails: any;

  constructor(private formbuilder: FormBuilder,
              private date:DatePipe,
              private shared:SharedService,
              private httpHandlerService: HttpHandlerServiceService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toast: ToastService,
              private location: Location

  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
    })
    console.log(this.id);

    this.httpHandlerService.fetchPersonalDetailById(this.id).subscribe(
      (data) =>{
        this.populateFields(data.data);
      }
    );


    this.userDetails = this.formbuilder.group({
      id:'',
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

    this.maxDate=this.date.transform(new Date(),"yyyy-MM-dd");

  }

  OnReactiveFormSubmit(data: any) {
    if(this.userDetails.valid) {
      this.httpHandlerService.editPersonalDetail(data).subscribe(
        response => {
          // Handle the successful response here
          console.log('API call successful', response);
          this.toast.showSuccess("Data update vayo.");
          this.location.back();
        },
        error => {
          // Handle the error here
          console.error('API call error', error);
        },
        () => {
          console.log('API call completed');
        }
      );
    }
    else{
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
  viewPersonalDetail(id: any){
    this.router.navigate(["/viewPersonalDetail", id]);
  }
  editPersonalDetail(id: any){
    this.router.navigate(["/editPersonalDetail", id]);
  }

  resetFrom(){
    this.userDetails.reset();
    this.getFamilyDetails.reset();
  }

  private populateFields(data: any) {
    console.log("Fetched details", data);
    this.userDetails.patchValue(
      {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dob,
        age: data.age,
        email: data.email,
        phoneNumber: data.phone,
      }
    );
    if(Array.isArray(data.familyDetails)){
      data.familyDetails.forEach((familyDetails: any)=>{
        this.addFamilyDetailsWithData(familyDetails);
      })
    }

  }

  private addFamilyDetailsWithData(familyDetailsData: any) {
    this.getFamilyDetails.push(
      this.formbuilder.group(
        {
          id: familyDetailsData.id,
          familyFirstName: familyDetailsData.familyFirstName,
          familyLastName: familyDetailsData.familyLastName,
          familyDob: familyDetailsData.familyDob,
          familyAge: familyDetailsData.familyAge,
          familyEmail: familyDetailsData.familyEmail,
          familyPhone: familyDetailsData.familyPhone,
        }
      )
    )

  }
  goBack(){
    this.location.back();
  }
}
