import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Agent } from "../../model/Agent";
import { AgentService } from "../../services/agent.service";

@Component({
    selector: 'dialog-delete-agent',
    templateUrl: './delete-agent.component.html',
    //styleUrls: [ './create-agent.component.scss']
  })
  export class DeleteAgentConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteAgentConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private agentService: AgentService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.agentService.deleteAgent(this.data).subscribe(res => {
          console.log("Result:"+res);
          this.openSnackBar('Agent Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }
