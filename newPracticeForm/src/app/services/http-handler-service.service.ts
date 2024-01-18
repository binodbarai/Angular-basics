import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {GlobalResponseModel} from "../model/globalResponse.model";
import {PersonalDetailModel} from "../model/personalDetail.model";

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerServiceService {
  private apiUrl = "http://localhost:8080/api/v1"

  constructor(private http: HttpClient) { }

  postloginDetails(data: any): Observable<any> {
    return this.http.post( `${this.apiUrl}/login`, data);
  }

  addPersonalDetail(userDetails: any): Observable<GlobalResponseModel<PersonalDetailModel>> {
    // Work of this code is done by interceptors
    // let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.post<GlobalResponseModel<PersonalDetailModel>>(`${this.apiUrl}/personalDetail/save`, userDetails
      // , {headers}
    );
  }
  fetchPersonalDetail(): Observable<GlobalResponseModel<PersonalDetailModel>> {
    //let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.get<GlobalResponseModel<PersonalDetailModel>>(`${this.apiUrl}/personalDetail/fetch`
      // , {headers}
    );
  }
  fetchPersonalDetailById(id: number): Observable<GlobalResponseModel<PersonalDetailModel>>{
    // let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.get<GlobalResponseModel<PersonalDetailModel>>(`${this.apiUrl}/personalDetail/fetch/${id}`
      // ,{headers}
    );
  }
  editPersonalDetail(data : any ): Observable<GlobalResponseModel<PersonalDetailModel>>{
    // let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.put<GlobalResponseModel<PersonalDetailModel>>(`${this.apiUrl}/personalDetail/update`, data
      // , {headers}
    );
  }
  deletePersonalDetail(id: any): Observable<any>{
    // let headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('token')}`)
    return this.http.delete(`${this.apiUrl}/personalDetail/delete/${id}`
      // ,{headers}
    );
  }

  //To upload files
  upload(data: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/student/save/person`, data);
  }

  showPerson(): Observable<any>{
    return this.http.get(`${this.apiUrl}/student/get/person`);
  }
  displayImage(): Observable<any>{
    return this.http.get(`${this.apiUrl}/student/get/person`,{responseType: "blob"})
  }

  downloadPerson(id: any): Observable<any>{
    return this.http.get(`${this.apiUrl}/student/download/${id}`
      ,{responseType: "blob"}
    );
  }

}
