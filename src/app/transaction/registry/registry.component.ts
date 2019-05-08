import { Component, OnInit } from '@angular/core';
import { Firm } from '../../model/Firm';
import { Block } from '../../model/Block';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SelectorService } from '../../services/selector.service';
import { Customer } from '../../model/Booking';
import { Registry } from '../../model/Registry';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { RegistryService } from '../../services/registry.service';
import { Bank } from '../../model/Bank';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.scss']
})
export class RegistryComponent implements OnInit {

  registryForm: FormGroup;
  registry : Registry;
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

  constructor(private fb: FormBuilder,
    private selectorService: SelectorService,
    private snackBar : MatSnackBar,
    private registryService : RegistryService) {

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
   reportForm: FormGroup;

  ngOnInit() {
    this.registry = new Registry();
    this.registry.registryDate = new Date();
    this.registryForm = this.fb.group({
    "customerId" :[null],
    "bookingId": [null],
    "registryNumber":[null],
    "registryDate": [null],
    "stampDuty" : [null],
    "paymentMode" : [null],
    "tehsil" : [null],
    "chequeDate" : [null],
    "chequeNo" : [null],
    "bankName" : [null],
    "khasraNumber" : [null],
    "remark" : [null]
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

  registrySubmitForm() {

    var code =  this.registry.customerId.split('|')[0];
    var value1 = this.registry.customerId.split('|')[1];
    this.registry.customerId = code;

    if(this.registry.id==undefined || this.registry.id==null) {
      // create new daily expense
      
      this.registryService.createRegistry(this.registry).subscribe(
        res => {
          console.log(res);
          this.openSnackBar('Registray Created Successfully','');
        },
        error => {
          this.openSnackBar('Error while creating Registray, Please contact your adminstrator','');
        });
    }
    else {

      this.registryService.updateRegistry(this.registry).subscribe(
        res => {
          console.log(res);
          this.openSnackBar('Registray Updated Successfully','');
        },
        error => {
          this.openSnackBar('Error while updating Registray, Please contact your adminstrator','');
        });
    }
  }

}
