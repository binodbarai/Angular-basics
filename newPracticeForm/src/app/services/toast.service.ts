import { Injectable } from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) { }

  showSuccess(message: any){
    this.toast.success(message,"Success");
  }
  showError(message: any){
    this.toast.error(message, "Unable to perform");
  }
  showWarning(message: any){
    this.toast.warning(message);
  }
  showInfo(message: any){
    this.toast.show(message);
  }

}
