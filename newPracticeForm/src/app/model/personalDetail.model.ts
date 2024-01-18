import {FamilyDetailsModel} from "./familyDetails.model";

export class PersonalDetailModel{
  id: string = '';
  firstname: string = '';
  lastname: string | undefined;
  dob: string | undefined;
  age: string | undefined;
  email: string | undefined;
  phoneNumber: string | undefined;
  familyDetails: Array<FamilyDetailsModel> | undefined;
}
