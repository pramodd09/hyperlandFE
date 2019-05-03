import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectorService } from '../../services/selector.service';
import { InvestmentService } from '../../services/investment.service';
import { Investment } from '../../model/Investment';
import { DeleteInvestmentMasterConfirmBoxDialog } from './master-investment-delete-confirm-box.component';


@Component({
  selector: 'dialog-overview-investment-dialog',
  templateUrl: './create-investment.component.html',
  styleUrls: [ './create-investment.component.scss']
})
export class DialogOverviewInvestmentDialog implements OnInit{

  firmList : any;
  investorList : any;
  propertyList: any;
  loading: boolean = false;
  investment : Investment;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewInvestmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar : MatSnackBar,
    private fb: FormBuilder,
    private selectorService: SelectorService,
    private investmentService : InvestmentService) {
      this.investmentForm = this.fb.group({
        'investorId' : [ null , Validators.required],
        'firmId': [ null , Validators.required ],
        'propertyId': [  , Validators.required ],
        'investmentDate': [ null , Validators.required],
        'amount': [ null , Validators.required ],
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

    this.selectorService.getData("firm").subscribe(
      res => {
        this.firmList=res.result;
      },
      error => {
        console.log('There was an error while retrieving firms !!!' + error);
      }
    );

    this.selectorService.getData("investor").subscribe(
      res => {
        console.dir(res);
        this.investorList=res.result;
      },
      error => { 
        console.log('There was an error while retrieving investor !!!' + error);
      }
    );


    if(this.data.id !=null || this.data.id!==undefined)
      {
        this.investment = new Investment();
        this.investment = this.data;
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
  if(event!=undefined)
  {
    this.loading = true;
  var value = event;
  var code =  value.split('|')[0];
  var value1 = value.split('|')[1];
  this.selectorService.getDependentData(type,code).subscribe(
    res => {
      this.loading = false;
       this.propertyList=res.result;
    },
    error => {
      console.log('There was an error while retrieving Albums !!!' + error);
      this.loading = false;
    }
  )
 }
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

      var code =  this.investment.investorId.split('|')[0];
      var value1 = this.investment.investorId.split('|')[1];
      this.investment.investorId = code;
      this.investment.investorName = value1;

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

  firmList : any;
  investerList :any;
  investmentData : Investment;

  investmentList : Investment[];
  loading : boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  investmentmDataSource: any;

  constructor(
    public dialog: MatDialog,
    private selectorService : SelectorService,
    private investmentService : InvestmentService) { }

  displayedColumns = ['firmName','propertyName','investorName','amount','actions'];

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewInvestmentDialog, {
      width: '350px',
      data : {
       
        "investmentData" : this.investmentData
      },
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {

    this.investmentData = new Investment();
    this.refresh();
  }

  refresh() {
    this.investmentmDataSource = new MatTableDataSource();
    this.loading = true;
    this.investmentService.getAllInvestment().subscribe(  
      res => {  
        this.investerList = res.result;
        this.investmentmDataSource.data = this.investerList;
        this.investmentmDataSource.paginator = this.paginator;
        this.investmentmDataSource.sort = this.sort;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving investments !!!' + error);  
        this.loading= false;
      });
  }

  editInvestmentDetail(investmentId : any) {

    console.log('investment Id:'+investmentId);

    this.investmentService.getInvestmentById(investmentId).subscribe(res => {  
      console.log("Result:"+res);
      this.investmentData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewInvestmentDialog, {
        width: '350px',
        data : this.investmentData
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  }

  openConfirmDeleteDialog(investmentId : any): void {
    const confirmDeleteFirmDialog = this.dialog.open(DeleteInvestmentMasterConfirmBoxDialog, {
      width: '400px',
      data : investmentId
    });

    confirmDeleteFirmDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
