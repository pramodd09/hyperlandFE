import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { AddUserService } from "../../services/add-user.service";

@Component({
    selector: 'dialog-delete-user',
    templateUrl: './delete-user.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteUserConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteUserConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private userService: AddUserService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.userService.deleteUser(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('User Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }