import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/Booking';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http: HttpClient) { }

  agentDataSource: any;

  getAllAgent():Observable<any>{
    var  baseURL = 'master/getAll/agent';
    return this.http.get(baseURL);
  }

  createBooking(bookingrequest : Booking) : Observable<any>{
    var baseURL = 'master/add/agent';
    return this.http.post(baseURL,bookingrequest);
  }

  updateBooking(bookingrequest: Booking) : Observable<any> {
    var  baseURL = 'master/update/agent/'+ bookingrequest.id;
    return this.http.post(baseURL,bookingrequest);
  }

  getBookingById(bookingId : any) : Observable<any>{
    var  baseURL = 'master/get/agent/'+bookingId;
    return this.http.get(baseURL);
  }

  deleteBooking(bookingId) : Observable<any> {
    var  baseURL = 'master/delete/agent/'+bookingId;
    return this.http.post(baseURL,{});
  }
}
