import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Firm } from '../../model/Firm';
import { FirmService } from '../../services/firm.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { PLCService } from '../../services/plc.service';
import { PLC } from '../../model/PLC';
import { DeletePLCConfirmBoxDialog } from './master-delete-confirm-box.component';
import { SelectorService } from '../../services/selector.service';

@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-plc.component.html',
  styleUrls: [ './create-plc.component.scss']
})
export class DialogOverviewPlcDialog implements OnInit {
  firmList : any;
  plcForm: FormGroup;
  chargingTypeList = ['Fixed','Percentage'];
  propertyList : any;
  plc : PLC;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewPlcDialog>,
    private fb : FormBuilder,
    public selectorService : SelectorService,
    public snackBar : MatSnackBar,
    public plcService : PLCService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.firmList = data.firmList;

      this.plcForm= this.fb.group({
        'firmName': [null , Validators.required ],
        'propertyName': [null , Validators.required ],
        'plcName': [null , Validators.required ],
        'chargingType': [null , Validators.required ],
        'plcCharge' : [null , Validators.required]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.plc = new PLC();
  }

  onFirmChange(event,type){
    console.log(event.value);
    var value = event;
    var code =  value.split('|')[0];
    var value1 = value.split('|')[1];
    console.log(value1+"  -- >"+code);
    this.selectorService.getDependentData(type,code).subscribe(
      res => {
         this.propertyList=res.result;
        console.log(this.propertyList);
      },
      error => {
        console.log('There was an error while retrieving Albums !!!' + error);
      }
    );
  }

  onFormSubmit(form: NgForm)  
  {  
    console.log(form);  
  }

  closePopup() : void {
    this.dialogRef.close();
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  submitForm() {
    
    var code =  this.plc.firmId.split('|')[0];
    var value1 = this.plc.firmId.split('|')[1];
    this.plc.firmId = code;
    this.plc.firmName = value1;
    

    var code =  this.plc.propertyId.split('|')[0];
    var value1 = this.plc.propertyId.split('|')[1];
    this.plc.propertyId = code;
    this.plc.propertyName = value1;

    if(this.plc.id==undefined || this.plc.id==null) {
      // create new firm
      this.plcService.createPLC(this.plc).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('PLC Created Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);
          this.openSnackBar('Error while creating project, Please contact your adminstrator','');
        });
    }
    else {
      this.plcService.updatePLC(this.plc).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('PLC Updated Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);  
          this.openSnackBar('Error while updating project, Please contact your adminstrator','');
        });
    }
  }


}

@Component({
  selector: 'app-master-plc',
  templateUrl: './master-plc.component.html',
  styleUrls: ['./master-plc.component.scss']
})
export class MasterPlcComponent implements OnInit {

  plcList : PLC[];
  plcDataSource: any;
  firmList : Firm[];

  constructor(public dialog: MatDialog,public plcService : PLCService,public selectorService : SelectorService) { }

  displayedColumns = ['firmName','propertyName','plcName','plcCharge','chargeType','actions'];

  loading : boolean = false;
  openDialog(): void {
    console.log(this.plcList);
    const dialogRef = this.dialog.open(DialogOverviewPlcDialog, {
      width: '350px',
      data: {
        'firmList': this.firmList,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {

    this.loading = true;
    this.plcService.getAllPLC().subscribe(  
      res => {  
        this.plcList = res.result;
        console.log(this.plcList);
        this.plcDataSource = new MatTableDataSource();  
        this.plcDataSource.data = res.result;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading = false;
      });

      this.selectorService.getData("firm").subscribe(
        res => {
        console.log("dsdsds");
          console.dir(res);

          this.firmList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        }
      );

  }

  openConfirmDeleteDialog(id : any): void {
    const confirmDeletePLCDialog = this.dialog.open(DeletePLCConfirmBoxDialog, {
      width: '400px',
      data : id
    });

    confirmDeletePLCDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
