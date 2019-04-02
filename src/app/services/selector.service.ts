import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {

  constructor(public http: HttpClient) { }

  firmDataSource: any;
  
  getData(type):Observable<any>{
    var  baseURL = 'selector/get/'+type; 
    return this.http.get(baseURL);
  }
  getDependentData(type,id):Observable<any>{
    var  baseURL = 'selector/get/'+type+"/"+id; 
    return this.http.get(baseURL);
  }
  getReportData(form):Observable<any>{
    var  baseURL = 'search/booking';
    return this.http.post(baseURL,form);
  }
}
