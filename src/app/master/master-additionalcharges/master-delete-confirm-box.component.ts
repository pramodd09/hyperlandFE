import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { AdditionalCharges } from "../../model/AdditionalCharges";
import { AdditionalChargesService } from "../../services/additionalcharges.service";

@Component({
    selector: 'dialog-delete-additionalcharges',
    templateUrl: './delete-additionalcharges.component.html',
    //styleUrls: [ './create-additionalcharges.component.scss']
  })
  export class DeleteAdditionalChargesConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteAdditionalChargesConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private additionalChargesService: AdditionalChargesService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.additionalChargesService.deleteAdditionalCharges(this.data).subscribe(res => {
          console.log("Result:"+res);
          this.openSnackBar('Additional Charges Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }
