import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AdditionalChargesService } from '../../services/additionalcharges.service';
import { AdditionalCharges } from '../../model/AdditionalCharges';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DeleteAdditionalChargesConfirmBoxDialog } from './master-delete-confirm-box.component';
import { SelectorService } from '../../services/selector.service';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create-additionalcharges.component.html',
  styleUrls: [ './create-additionalcharges.component.scss']
})
export class DialogOverviewAdditionalChargesDialog  implements OnInit {
  firmList : any[];
  propertyList: any[];
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewAdditionalChargesDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private selectorService: SelectorService,
    private additionalChargesService: AdditionalChargesService,

    private snackBar : MatSnackBar) {
      this.firmList = data.firmList,
        this.additionalChargesForm = this.fb.group({
        'firmId': [null , Validators.required ],
        'propertyId': [null , Validators.required ],
        'additionalCharges': [null , Validators.required ],
        'rate': [null , Validators.required ],
        'chargesType': [null , Validators.required ],
      });
    }

    additionalChargesForm: FormGroup;
    additionalCharges : AdditionalCharges;

    ngOnInit() {
      if(this.data.additionalCharges !=null || this.data.additionalCharges!==undefined)
      {
        this.additionalCharges = new AdditionalCharges();
        this.additionalCharges = this.data.additionalCharges;
      }
      else{
        this.additionalCharges = new AdditionalCharges();
      }

    }

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
      if(this.additionalCharges.id==undefined || this.additionalCharges.id==null) {
        // create new additionalCharges
        var code =  this.additionalCharges.firmId.split('|')[0];
         var value1 = this.additionalCharges.firmId.split('|')[1];
        this.additionalCharges.firmId = code;
        this.additionalCharges.firmName = value1;
         var code =  this.additionalCharges.propertyId.split('|')[0];
         var value1 = this.additionalCharges.propertyId.split('|')[1];
        this.additionalCharges.propertyId = code;
        this.additionalCharges.propertyName = value1;
        this.additionalChargesService.createAdditionalCharges(this.additionalCharges).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('AdditionalCharges Created Successfully','');
            this.closePopup();
            // this.refresh();

          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while creating additionalCharges, Please contact your adminstrator','');
          });
      }
      else {
         var code =  this.additionalCharges.firmId.split('|')[0];
         var value1 = this.additionalCharges.firmId.split('|')[1];
        this.additionalCharges.firmId = code;
        this.additionalCharges.firmName = value1;
         var code =  this.additionalCharges.propertyId.split('|')[0];
         var value1 = this.additionalCharges.propertyId.split('|')[1];
        this.additionalCharges.propertyId = code;
        this.additionalCharges.propertyName = value1;
        this.additionalChargesService.updateAdditionalCharges(this.additionalCharges).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('AdditionalCharges Updated Successfully','');
            this.closePopup();
        //      this.refresh();
          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while updating additionalCharges, Please contact your adminstrator','');
          });
      }
    }
}


@Component({
  selector: 'app-master-additionalcharges',
  templateUrl: './master-additionalcharges.component.html',
  styleUrls: ['./master-additionalcharges.component.scss']
})
export class MasterAdditionalChargesComponent implements OnInit {
  constructor(public dialog: MatDialog,public additionalChargesService : AdditionalChargesService,
      private selectorService: SelectorService,
    private changeDetectorRefs: ChangeDetectorRef) {}

  additionalChargesList : AdditionalCharges[];
  firmList:any[];
  property:any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  additionalChargesDataSource: any;
  additionalChargesData : AdditionalCharges;
  displayedColumns = ['firmName','propertyName','additionalCharges','rate','chargesType','actions'];

  openDialog(): void {
  console.log(" this.firmList -- "+ this.firmList);
    this.additionalChargesData = new AdditionalCharges();
    const dialogRef = this.dialog.open(DialogOverviewAdditionalChargesDialog, {
      width: '400px',
      data: {
            "firmList": this.firmList
           }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  ngOnInit() {
       this.selectorService.getData("firm").subscribe(
        res => {
        console.log("dsdsds");
          console.dir(res);

          this.firmList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        }
      )
      this.refresh();
  }

refresh() {
  this.additionalChargesDataSource = new MatTableDataSource();
    //this.additionalChargesService.get();

    console.log("Getting all additionalCharges");
 this.additionalChargesService.getAllAdditionalCharges().subscribe(
      res => {
        this.additionalChargesList = res.result;
        this.additionalChargesDataSource.data = this.additionalChargesList;
        this.additionalChargesDataSource.paginator = this.paginator;
        this.additionalChargesDataSource.sort = this.sort;
      },
      error => {
        console.log('There was an error while retrieving additionalCharges !!!' + error);
      });
}

  editAdditionalChargesDetails(additionalChargesId : any) {

      console.log('AdditionalCharges Id:'+additionalChargesId);
      this.additionalChargesService.getAdditionalChargesById(additionalChargesId).subscribe(res => {
      console.log("Result:"+res);
      this.additionalChargesData =  res.result;
      this.additionalChargesData.firmId = this.additionalChargesData.firmId+'|'+this.additionalChargesData.firmName;
      this.additionalChargesData.propertyId = this.additionalChargesData.propertyId+'|'+this.additionalChargesData.propertyName;
      const dialogRef = this.dialog.open(DialogOverviewAdditionalChargesDialog, {
      width: '350px',
      data: {
                "firmList": this.firmList,
                 "additionalCharges": this.additionalChargesData
            }
     });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });

    },
    error => {
      console.log('There was an error while retrieving Albums !!!' + error);
    });
  }

  openConfirmDeleteDialog(additionalChargesId : any): void {
    const confirmDeleteAdditionalChargesDialog = this.dialog.open(DeleteAdditionalChargesConfirmBoxDialog, {
      width: '400px',
      data : additionalChargesId
    });

    confirmDeleteAdditionalChargesDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
