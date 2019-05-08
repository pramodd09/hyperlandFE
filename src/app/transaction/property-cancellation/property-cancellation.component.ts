import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectorService } from '../../services/selector.service';
import { MatSnackBar } from '@angular/material';
import { PropertyCancellation } from '../../model/PropertyCancellation';
import { Firm } from '../../model/Firm';
import { Block } from '../../model/Block';
import { Bank } from '../../model/Bank';
import { Customer } from '../../model/Booking';
import { PropertyCancellationService } from '../../services/property-cancellation.service';

@Component({
  selector: 'app-property-cancellation',
  templateUrl: './property-cancellation.component.html',
  styleUrls: ['./property-cancellation.component.scss']
})
export class PropertyCancellationComponent implements OnInit {

  propertyCancellationForm: FormGroup;
  propertycancellation : PropertyCancellation;
  step = 0;
  index = 0;
  isLoading = false;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  reportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private selectorService: SelectorService,
    private snackBar : MatSnackBar,
    private propertyCancellationService : PropertyCancellationService
  ) { 


    this.reportForm = this.fb.group({
      'firmId': [null],
      'projectId':[null],
      'blockId':[null],
      'plotNumber':[null],
      'customerName' : [null]
    });
  }

  firmList : Firm[];
  blockList : Block[];
  bankList : Bank[];
  customerList : Customer[];
  plotNumberList:any[];
  propertyList:any[];

  ngOnInit() {

    this.propertycancellation = new PropertyCancellation();
    this.propertycancellation.cancellationDate = new Date();

    this.propertyCancellationForm = this.fb.group({
      "customerId" :[null],
      "bookingId": [null],
      "cancelCharges" :[null],
      "paidAmount": [null],
      "returnAmount":[null],
      "cancellationDate": [null],
      "paymentMode" : [null],
      "chequeDate" : [null],
      "chequeNo" : [null],
      "bankName" : [null],
      "descriptopn" : [null]
      });


      
    this.selectorService.getData("firm").subscribe(
      res => {
        this.firmList=res.result;
      },
      error => {
        console.log('There was an error while retrieving Albums !!!' + error);
      });
      this.selectorService.getData("customer").subscribe(
        res => {
          this.customerList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        });

        this.selectorService.getData("bank").subscribe(
          res => {
            this.bankList=res.result;
          },
        );
  }

  onChange(event,type){
    var value = event;
  if(value){
    var code =  value.split('|')[0];
    var value1 = value.split('|')[1];

    console.log(value1+"  -- >"+code);
 
    this.selectorService.getDependentData(type,code).subscribe(
      res => {
        if(type == 'block')
          this.blockList = res.result;
        else if (type == 'property')
           this.propertyList=res.result;
        else if(type == 'bookedPlot')
          this.plotNumberList = res.result;
        console.dir(this.propertyList);
      },
      error => {
        console.log('There was an error while retrieving Albums !!!' + error);
      }
    )
   
   }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  propertyCancellationSubmitForm() {

    var code =  this.propertycancellation.customerId.split('|')[0];
    var value1 = this.propertycancellation.customerId.split('|')[1];
    this.propertycancellation.customerId = code;

    if(this.propertycancellation.id==undefined || this.propertycancellation.id==null) {
      // create new daily expense
      
      this.propertyCancellationService.createPropertyCancellation(this.propertycancellation).subscribe(
        res => {
          console.log(res);
          this.openSnackBar('Property Cancellation Created Successfully','');
        },
        error => {
          this.openSnackBar('Error while creating Property Cancellation, Please contact your adminstrator','');
        });
    }
    else {

      this.propertyCancellationService.updatePropertyCancellation(this.propertycancellation).subscribe(
        res => {
          console.log(res);
          this.openSnackBar('Property Cancellation Updated Successfully','');
        },
        error => {
          this.openSnackBar('Error while updating Expense, Please contact your adminstrator','');
        });
    }
  }

}
