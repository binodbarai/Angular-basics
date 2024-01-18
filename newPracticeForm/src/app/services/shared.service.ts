import {Injectable} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor() {
  }

  familyCalculateAge(familyDetailsArray: FormGroup) {
    const familyDobControl = familyDetailsArray.get('familyDob');

    if (familyDobControl && familyDobControl.value) {
      const today = new Date();
      const birthDate = new Date(familyDobControl.value);

      let age = today.getFullYear() - birthDate.getFullYear();

      return age;
    }
    return 0;
  }

}
