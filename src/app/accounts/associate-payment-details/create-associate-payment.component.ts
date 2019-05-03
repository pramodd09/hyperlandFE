import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder, FormControl,Validators, FormGroup, NgForm } from "@angular/forms";
import { AssociatePaymentDetails } from "../../model/AssociatePaymentDetails";
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import { SelectorService } from '../../services/selector.service';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/Agent';
import { columnList } from '../report-column-list';
import { AssociatePaymentDetailsService } from "../../services/associate-payment-details.service";
@Component({
    selector: 'associate-payment-details-dialog',
    templateUrl: './create-associate-payment.component.html',
    styleUrls: [ './create-associate-payment.component.scss']
  })
  export class AssociatePaymentDetailsDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<AssociatePaymentDetailsDialog>,
      private fb: FormBuilder,
      private selectorService: SelectorService,
      private associatePaymentDetailsService: AssociatePaymentDetailsService,
      private agentService: AgentService,
      private snackBar : MatSnackBar) {
      this.agentCtrl = new FormControl();


        this.associatePaymentDetailsForm= this.fb.group({
          'dueAmount' : [],
          'paidAmt': [],
          'paymentDate' : [],
          'mode' : [],
          'transactionId': [],
          'transactionDate' : [],
          'bankName' : [],
          'agentId' :[],
          'totalAmount':[],
          'paymentAmount':[],

        });
      }
      associatePaymentDetailsForm: FormGroup;
      assocaitePayment : AssociatePaymentDetails;
      agentCtrl :FormControl;
      filteredAgent: Observable<any[]>;
      agents:Agent[];
      bankList: any;
      reportForm: FormGroup;
      ngOnInit() {
        this.assocaitePayment = new AssociatePaymentDetails();
        this.assocaitePayment.paymentDate = new Date();
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
      this.getbankList();
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      closePopup() : void {
        this.dialogRef.close();
      }
  
      onFormSubmit(form: NgForm)  
      {
              var idValue = this.assocaitePayment.agentId;

            this.assocaitePayment.agentId = idValue.split('|')[0];
            this.assocaitePayment.agentName = idValue.split('|')[1];
           this.associatePaymentDetailsService.createAssociatePaymentDetails(this.assocaitePayment).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Associate Payment Details Created Successfully','');
            this.closePopup();
          },
          error => {
            console.log('There was an error while creating Farmer Payment Details !!!' + error);
            this.openSnackBar('Error while creating Farmer Payment Details, Please contact your adminstrator','');
          });
      }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
     filterAgent(name: string) {
        return this.agents.filter(agent =>
          agent.agentName.toLowerCase().indexOf(name.toLowerCase()) === 0);
      }
   getbankList()
   {
            this.selectorService.getData('bank').subscribe(
                res => {
                    console.log(res);
                    this.bankList = res.result;
                },
                error => {
                  console.log('There was an error while retrieving Albums !!!' + error);
                }
            )
  }
      onEnter(evt: any){
         console.dir(evt) ;
         var value = evt.source.value;
         if(value){
        var agentId = value.split("|")[0];
        var agentName = value.split("|")[1];
         this.agentService.getAgentById(agentId).subscribe(
            res => {
              console.log(res);
              this.assocaitePayment.paidAmount = res.result.paidAmount;
              this.assocaitePayment.totalAmount = res.result.totalAmount;
              },
            error => {
              console.log('There was an error while updating city !!!' + error);
              this.openSnackBar('Error while updating city, Please contact your adminstrator','');
            });
        }
      }
  
     /*  submitForm() {
        if(this.city.id==undefined || this.city.id==null) {
          // create new city
          this.cityService.createCity(this.city).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('City Created Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while creating city !!!' + error);
              this.openSnackBar('Error while creating city, Please contact your adminstrator','');
            });
        }
        else {
          this.cityService.updateCity(this.city).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('City Updated Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while updating city !!!' + error);  
              this.openSnackBar('Error while updating city, Please contact your adminstrator','');
            });
        }
      } */
  }
