import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { LocationService } from "../../services/location.service";
import { BlockService } from "../../services/block.service";

@Component({
    selector: 'dialog-delete-block',
    templateUrl: './delete-block.component.html'
  })
  export class DeleteBlockConfirmBoxDialog  implements OnInit {
  
    blockId : any

    constructor(
      public dialogRef: MatDialogRef<DeleteBlockConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private blockService : BlockService,
      private snackBar : MatSnackBar) {
        this.blockId = data;
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(data : any) : void {
        this.blockService.deleteBlock(this.blockId).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Block Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }