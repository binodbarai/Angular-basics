import {Component, OnInit} from '@angular/core';
import {HttpHandlerServiceService} from "../services/http-handler-service.service";
import {Router} from "@angular/router";
import {ToastService} from "../services/toast.service";

@Component({
  selector: 'app-table-personal-detail',
  templateUrl: './table-personal-detail.component.html',
  styleUrl: './table-personal-detail.component.scss'
})
export class TablePersonalDetailComponent implements OnInit{
  protected fetchedData: any;
  popoverTitle: string = 'Delete confirmation';
  popoverMessage: string = 'Do you really want to delete?';
  cancelClicked: boolean = false;
  constructor(private httpHandlerService: HttpHandlerServiceService,
              private router: Router,
              private toast: ToastService
              ) {
  }
  ngOnInit(): void {
    this.fetchApicalled();
  }
  fetchApicalled(){
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
  viewPersonalDetail(id: any){
    this.router.navigate(["/viewPersonalDetail", id]);
  }
  editPersonalDetail(id: any){
    this.router.navigate(["/editPersonalDetail", id]);
  }
  addPersonalDetail(){
    this.router.navigate(["/reactive-form"])
  }
  deletePersonalDetail(id: any){
    this.httpHandlerService.deletePersonalDetail(id).subscribe(
      response => {
        console.log("Data delete vayo!!");
        this.toast.showSuccess("Data delete vayo.");
        this.fetchApicalled();
      },
      error => {
        console.log("Delete vayena!!");
      },
      () =>{
        console.log("Delete vayera sakkyo!!");
      }
    );
  }
}
