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
  getDependentDataPlotByAction(action,id):Observable<any>{
    console.log('inByAction')
    console.log(action)
    if(action=='Available')
    var  baseURL = 'selector/get/availablePlot/'+id;
    else
    var  baseURL = 'selector/get/bookedPlot/'+id;
    return this.http.get(baseURL);
  }
  getReportData(form,type):Observable<any>{
    console.log(form)
    var  baseURL = 'search/'+type;
    return this.http.post(baseURL,form);
  }

  getReportDataByType(form,type):Observable<any>{
    var  baseURL = 'search/'+type;
    return this.http.post(baseURL,form);
  }

  holdUnholdProperty(action,rows){
    var  baseURL = 'searchRows/'+action;
    return this.http.post(baseURL,rows);
  }
}
