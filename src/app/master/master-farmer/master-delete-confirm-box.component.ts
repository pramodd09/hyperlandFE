import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FarmerService } from './../../services/farmer.service';

@Component({
    selector: 'dialog-delete-farmer',
    templateUrl: './delete-farmer.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteFarmerConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteFarmerConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private farmerService: FarmerService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.farmerService.deleteFarmer(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Farmer Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }