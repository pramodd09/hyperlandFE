import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { LocationService } from "../../services/location.service";
import { ProjectService } from "../../services/project.service";

@Component({
    selector: 'dialog-delete-project',
    templateUrl: './delete-project.component.html'
  })
  export class DeleteProjectConfirmBoxDialog  implements OnInit {
  
    projectId : any;
    constructor(
      public dialogRef: MatDialogRef<DeleteProjectConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private projectService: ProjectService,
      private snackBar : MatSnackBar) {
        this.projectId = data;
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick() : void {
        console.log("Id is :"+this.projectId);
        this.projectService.deleteProjct(this.projectId).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Project Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }