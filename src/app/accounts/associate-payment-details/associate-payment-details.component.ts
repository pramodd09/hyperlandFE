import { Component, OnInit } from '@angular/core';
import { AssociatePaymentDetails } from '../../model/AssociatePaymentDetails';
import { AssociatePaymentDetailsDialog } from './create-associate-payment.component';
import { MatDialog } from '@angular/material';
import { SelectorService } from '../../services/selector.service';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/Agent';
import { FormBuilder, FormControl,Validators, FormGroup, NgForm } from "@angular/forms";
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { columnList } from '../report-column-list';
@Component({
  selector: 'app-associate-payment-details',
  templateUrl: './associate-payment-details.component.html',
  styleUrls: ['./associate-payment-details.component.scss']
})
export class AssociatePaymentDetailsComponent implements OnInit {

  constructor(public dialog: MatDialog,
   private selectorService: SelectorService,
   private fb: FormBuilder,
   private agentService: AgentService) {
     this.agentCtrl = new FormControl();
    this.reportForm = this.fb.group({
      'agentId': [null]
    });

   }
  columns=columnList["agentPayment"];
  agentCtrl :FormControl;
   filteredAgent: Observable<any[]>;
   agents:Agent[];
    reportForm: FormGroup;
  reportData: any;
  associatePaymentData : AssociatePaymentDetails;

  ngOnInit() {
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
  filterAgent(name: string) {
        return this.agents.filter(agent =>
          agent.agentName.toLowerCase().indexOf(name.toLowerCase()) === 0);
      }

  openDialog(): void {
    this.associatePaymentData = new AssociatePaymentDetails();
    const dialogRef = this.dialog.open(AssociatePaymentDetailsDialog, {
      width: '400px',
      data : this.associatePaymentData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 onFormSubmit(form) {
    if(form)
    {
      form.agentId =  form.agentId.split('|')[0];
      this.selectorService.getReportDataByType(form,'agentPaymentDetails').subscribe(
      res => {
        console.log(res);
        this.reportData = res;
      },
      error => {
        console.log('There was an error while retrieving report data' + error);
      }
)
}
// console.log(form)
}
onEnter(evt: any){

  }
}
