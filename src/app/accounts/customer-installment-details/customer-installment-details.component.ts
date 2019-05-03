import { Component, OnInit } from '@angular/core';
import { CustomerInstallmentDetails } from '../../model/CustomerInstallmentDetails';
import { CustomerInstallmentDetailsDialog } from './create-customer-installment.component';
import { MatDialog } from '@angular/material';
import { LandService } from "../../services/land.service";
import { Land } from "../../model/land";
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { SelectorService } from '../../services/selector.service';
import { columnList } from '../report-column-list';
import { Firm } from '../../model/Firm';
import { Block } from '../../model/Block';
import { Project } from '../../model/Project';
@Component({
  selector: 'app-customer-installment-details',
  templateUrl: './customer-installment-details.component.html',
  styleUrls: ['./customer-installment-details.component.scss']
})
export class CustomerInstallmentDetailsComponent implements OnInit {
  
  constructor(public dialog: MatDialog, private landService : LandService , private fb: FormBuilder,
   private selectorService: SelectorService){
   this.reportForm = this.fb.group({
      'firmId': [null],
      'projectId':[null],
      'blockId':[null],
      'plotNumber':[null]
    });
   }

  customerInstallmentData : CustomerInstallmentDetails;
  firmList : Firm[];
  blockList : Block[];
  plotNumberList:any[];
  propertyList:any[];
  reportForm: FormGroup;

  reportData: any;
  columns=columnList["installmentDetails"];
  ngOnInit() {
        this.selectorService.getData("firm").subscribe(
        res => {
        console.log("dsdsds");

          this.firmList=res.result;
          console.dir(this.firmList);
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        });
  }

  onChange(event,type){
    // console.log(event)

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
    );
   
   }
  }
  openDialog(): void {
    this.customerInstallmentData = new CustomerInstallmentDetails();
    const dialogRef = this.dialog.open(CustomerInstallmentDetailsDialog, {
      width: '400px',
      data : this.customerInstallmentData,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 onFormSubmit(form) {
    console.log(form);
    if(form.firmId)
    {
       form.firmId = form.firmId.split("|")[0];
    }
    if(form.projectId)
    {
       form.projectId = form.projectId.split("|")[0];
    }
    if(form.blockId)
    {
       form.blockId = form.blockId.split("|")[0];
    }
    if(form.plotNumber)
    {
       form.plotNumber = form.plotNumber.split("|")[1];
    }
    this.selectorService.getReportDataByType(form,'customerInstallmentDetails').subscribe(
      res => {
        this.reportData = res;
        console.log("this.reportData.result.length--"+this.reportData.result.length);      
        var disableFlag = false;
       for (var i = 0 ; i < this.reportData.result.length;i++)
       {
         if(this.reportData.result[i].status == 'Completed' || disableFlag == true){ 
            this.reportData.result[i].isDisabled = true;
         }
         else{
          this.reportData.result[i].isDisabled = false;
          disableFlag = true;        
         }

       }
        
       
      },
      error => {
        console.log('There was an error while retrieving report data' + error);
      }
         )
// console.log(form)
    }
}
