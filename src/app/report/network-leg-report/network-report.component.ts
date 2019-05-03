import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'ng2-org-chart';
import { ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AgentService } from '../../services/agent.service';
import { MatSnackBar } from '@angular/material';

import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { Agent } from '../../model/Agent';
import { SelectorService } from '../../services/selector.service';
@Component({
   selector: 'network-report',
   templateUrl: './network-report.component.html',
   styleUrls: ['./network-report.component.scss'],
   encapsulation: ViewEncapsulation.None
})
export class NetworkReport implements OnInit {
  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private selectorService: SelectorService,
    private snackBar : MatSnackBar) {
    this.agentCtrl = new FormControl();
    this.reportForm= this.fb.group({
     'agentId' :[null,Validators.required]
     });
    }
  
  reportForm: FormGroup;
  agentCtrl :FormControl;
  agents:Agent[];
  filteredAgent: Observable<any[]>;
  topEmployee : IEmployee;

  
  ngOnInit(){
    var me = this;
    this.agentService.getAllAgent().subscribe(
      res => {
        console.log(res);
        this.agents = res.result;
      this.filteredAgent = this.agentCtrl.valueChanges
    .pipe(
      startWith(''),
      map(agent => agent ? me.filterAgent(agent) : me.agents.slice())
    );

      },
      error => {
        console.log('There was an error while retrieving report data' + error);
      });
  }
  displayFn(agent: string) {
    if(agent)
    {
      return agent ? agent.split("|")[1] : undefined;
     }
   }  
   filterAgent(name: string) {
    return this.agents.filter(agent =>
      agent.agentName.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  onFormSubmit(form:any){
     // search agent report
     console.log(form.agentId);
     var agentId = form.agentId.split("|")[0];
     this.selectorService.getAgentLegReport(agentId).subscribe(
      res => {  
        console.log(res);  
        this.topEmployee  = JSON.parse(res.result);      
      },  
      error => {  
        console.log('There was an error while retrieving report data' + error);
      }
    )
    
  }
   
}
