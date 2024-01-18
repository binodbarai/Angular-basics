import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpHandlerServiceService} from "../services/http-handler-service.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-view-personal-detail',
  templateUrl: './view-personal-detail.component.html',
  styleUrl: './view-personal-detail.component.scss'
})
export class ViewPersonalDetailComponent implements OnInit{
  public id: any;
  public specificPersonalDetail: any;

  constructor(
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private httpHandlerServiceService: HttpHandlerServiceService,
    private location: Location
    ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.id = params['id'];
    })
    console.log(this.id);
    this.httpHandlerServiceService.fetchPersonalDetailById(this.id).subscribe(
      response => {
        // Handle the successful response here
        console.log('ekjana ko detail', response.data);
        this.specificPersonalDetail = response.data;
      },
      error => {
        // Handle the error here
        console.error('error vayo', error);
      },
      () =>{
        console.log('api call complete vo');
      });{

    }

  }
  goBack(){
    this.location.back();
  }

}
