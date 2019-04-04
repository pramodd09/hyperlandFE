import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(public http: HttpClient) { }

  bankDataSource: any;

  getAllData():Observable<any>{
    var  baseURL = 'master/getAll/bank';
    return this.http.get(baseURL);
  }

  getDataById(type, id : any) : Observable<any>{
    var  baseURL = 'master/get/'+type+'/'+id;
    return this.http.get(baseURL);
  }

  deleteBank(bankId) : Observable<any> {
    var  baseURL = 'master/delete/bank/'+bankId;
    return this.http.post(baseURL,{});
  }
}
