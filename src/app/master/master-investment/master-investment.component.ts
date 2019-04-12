import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorService } from '../../services/selector.service';
import { InvestmentService } from '../../services/investment.service';
import { Investment } from '../../model/Investment';


@Component({
  selector: 'dialog-overview-investment-dialog',
  templateUrl: './create-investment.component.html',
  styleUrls: [ './create-investment.component.scss']
})
export class DialogOverviewInvestmentDialog implements OnInit{

  firmList : [];
  investorList : [];
  propertyList: [];

  investment : Investment;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewInvestmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar : MatSnackBar,
    private fb: FormBuilder,
    private selectorService: SelectorService,
    private investmentService : InvestmentService) {
      this.investmentForm = this.fb.group({
        'investorId' : [ ],
        'firmId': [ ],
        'propertyId': [ ],
        'investmentDate': [ ],
        'amount': [ ],
      });
    }

    investmentForm: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }

  closePopup() : void {
    this.dialogRef.close();
  }

  onFormSubmit(form: NgForm)
  {
    console.log(form);
  }

  ngOnInit() {
    if(this.data.investmentData.id !=null || this.data.investmentData.id!==undefined)
      {
        this.investment = new Investment();
        this.investment = this.data.investmentData;
      }
      else{
        this.investment = new Investment();
      }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  onChange(event,type){
  // console.log(event)
  var value = event;
  var code =  value.split('|')[0];
  var value1 = value.split('|')[1];
  console.log(value1+"  -- >"+code);
  this.selectorService.getDependentData(type,code).subscribe(
    res => {
       this.propertyList=res.result;
      console.dir(this.propertyList);
    },
    error => {
      console.log('There was an error while retrieving Albums !!!' + error);
    }
  )
}
  submitForm() {
    if(this.investment.id==undefined || this.investment.id==null) {
      // create new additionalCharges
      var code =  this.investment.firmId.split('|')[0];
       var value1 = this.investment.firmId.split('|')[1];
      this.investment.firmId = code;
      this.investment.firmName = value1;
       var code =  this.investment.propertyId.split('|')[0];
       var value1 = this.investment.propertyId.split('|')[1];
      this.investment.propertyId = code;
      this.investment.propertyName = value1;
      this.investmentService.createInvestment(this.investment).subscribe(
        res => {
          console.log(res);
          this.openSnackBar('Investment Created Successfully','');
          this.closePopup();
          // this.refresh();

        },
        error => {
          console.log('There was an error while retrieving investment !!!' + error);
          this.openSnackBar('Error while creating investment, Please contact your adminstrator','');
        });
    }
    else {
      var code =  this.investment.investorId.split('|')[0];
      var value1 = this.investment.investorId.split('|')[1];
      this.investment.investorId = code;
      this.investment.investorName = value1;

      var code =  this.investment.firmId.split('|')[0];
      var value1 = this.investment.firmId.split('|')[1];
      this.investment.firmId = code;
      this.investment.firmName = value1;

      var code =  this.investment.propertyId.split('|')[0];
      var value1 = this.investment.propertyId.split('|')[1];
      this.investment.propertyId = code;
      this.investment.propertyName = value1;
      this.investmentService.updateInvestment(this.investment).subscribe(
        res => {
          console.log(res);
          this.openSnackBar('Investment Updated Successfully','');
          this.closePopup();
      //      this.refresh();
        },
        error => {
          console.log('There was an error while retrieving investment !!!' + error);
          this.openSnackBar('Error while updating investment, Please contact your adminstrator','');
        });
    }
  }

}

@Component({
  selector: 'app-master-investment',
  templateUrl: './master-investment.component.html',
  styleUrls: ['./master-investment.component.scss']
})
export class MasterInvestmentComponent implements OnInit {

  firmList : [];
  investerList :[];
  investment : Investment;

  constructor(public dialog: MatDialog,private selectorService : SelectorService) { }

  displayedColumns = ['investorName','projectName','productName','amount', 'investmentDate'];

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewInvestmentDialog, {
      width: '350px',
      data : {
        "firmList": this.firmList,
        "investerList" :this.investerList,
        "investmentData" : this.investment
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {

    this.investment = new Investment();

    this.selectorService.getData("firm").subscribe(
      res => {
        console.dir(res);
        this.firmList=res.result;
      },
      error => {
        console.log('There was an error while retrieving firms !!!' + error);
      }
    );

    this.selectorService.getData("invester").subscribe(
      res => {
        console.dir(res);
        this.investerList=res.result;
      },
      error => { 
        console.log('There was an error while retrieving investor !!!' + error);
      }
    );

    
  }

}
