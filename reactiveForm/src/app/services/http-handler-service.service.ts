import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpHandlerServiceService {
  private apiUrl = "http://localhost:8080/api/v1"

  constructor(private http: HttpClient) { }

  addPersonalDetail(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/personalDetail/save`, userDetails);
  }
  fetchPersonalDetail(): Observable<any> {
    return this.http.get(`${this.apiUrl}/personalDetail/fetch`);
  }
  fetchPersonalDetailById(id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/personalDetail/fetch/${id}`);
  }
  editPersonalDetail(data : any ): Observable<any>{
    return this.http.put(`${this.apiUrl}/personalDetail/update`, data)
  }
  deletePersonalDetail(id: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/personalDetail/delete/${id}`, id)
  }
}
