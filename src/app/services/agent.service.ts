import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from '../model/Agent';
import { MatTableDataSource } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(public http: HttpClient) { }

  agentDataSource: any;

  getAllAgent():Observable<any>{
    var  baseURL = 'master/getAll/agent';
    return this.http.get(baseURL);
  }

  createAgent(agentRequest : Agent) : Observable<any>{
    var baseURL = 'master/add/agent';
    return this.http.post(baseURL,agentRequest);
  }

  updateAgent(agentRequest: Agent) : Observable<any> {
    var  baseURL = 'master/update/agent/'+ agentRequest.id;
    return this.http.post(baseURL,agentRequest);
  }

  getAgentById(agentId : any) : Observable<any>{
    var  baseURL = 'master/get/agent/'+agentId;
    return this.http.get(baseURL);
  }

  deleteAgent(agentId) : Observable<any> {
    var  baseURL = 'master/delete/agent/'+agentId;
    return this.http.post(baseURL,{});
  }
}
