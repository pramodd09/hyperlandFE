import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { LandService } from "../../services/land.service";

@Component({
    selector: 'dialog-delete-land',
    templateUrl: './delete-land.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteLandConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteLandConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private landService: LandService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.landService.deleteLand(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Land Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }