import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource, MatSnackBar ,MatDatepickerModule} from '@angular/material';
import { AgentService } from '../../services/agent.service';
import { Agent } from '../../model/Agent';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DeleteAgentConfirmBoxDialog } from './user-delete-confirm-box.component';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create-agent.component.html',
  styleUrls: [ './create-agent.component.scss']
})
export class DialogOverviewAgentDialog  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewAgentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Agent,
    private fb: FormBuilder,
    private agentService: AgentService,
    private snackBar : MatSnackBar) {
        this.agentForm = this.fb.group({
        'agentName':[null],
        'panNumber':[null],
        'adhaarNo':[null],
        'address':[null],
        'city':[null],
        'state':[null],
        'pinCode':[null],
        'emailId':[null],
        'phoneNo':[null],
        'dateOfJoining':[null],
        'dateOfBirth':[null],
        'occupation':[null],
        'sponsorId':[null],
        'sponsorName':[null],
        'bank':[null],
        'branch':[null],
        'accountNumber':[null],
        'ifscCode':[null],
        'status':[null],
        'loginId':[null],
        'designation':[null],
        'selfBusiness':[null],
        'chainBusiness':[null],
        'tds':[null],
        'serviceCharge':[null],
        'totalAmount':[null],
        'grandTotal':[null],
        'paidAmount':[null]
      });
    }
  step = 0;

    setStep(index: number) {
      this.step = index;
    }

    nextStep() {
      this.step++;
    }

    prevStep() {
      this.step--;
    }
    agentForm: FormGroup;
    agent : Agent;

    ngOnInit() {
     if(this.data !=null || this.data!==undefined)
      {
        this.agent = new Agent();
        this.agent = this.data;
      }
      else{
        this.agent = new Agent();
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

    submitForm() {
      if(this.agent.id==undefined || this.agent.id==null) {
        // create new agent
        this.agentService.createAgent(this.agent).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Agent Created Successfully','');
            this.closePopup();
          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while creating agent, Please contact your adminstrator','');
          });
      }
      else {

        this.agentService.updateAgent(this.agent).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Agent Updated Successfully','');
            this.closePopup();
          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while updating agent, Please contact your adminstrator','');
          });
      }
    }
}


@Component({
  selector: 'app-user-agent',
  templateUrl: './user-agent.component.html',
  styleUrls: ['./user-agent.component.scss']
})
export class MasterAgentComponent implements OnInit {
  constructor(public dialog: MatDialog,public agentService : AgentService,
    private changeDetectorRefs: ChangeDetectorRef) {}

  agentList : Agent[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  agentDataSource: any;
  agentData : Agent;
  displayedColumns = ['id','agentName','stage','sponsor','panNumber','phoneNo','actions'];

  openDialog(): void {

    this.agentData = new Agent();
    const dialogRef = this.dialog.open(DialogOverviewAgentDialog, {
      width: '600px',
      data: {

           }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  ngOnInit() {
       this.refresh();
  }

refresh() {
  this.agentDataSource = new MatTableDataSource();
    //this.agentService.get();

    console.log("Getting all agent");
 this.agentService.getAllAgent().subscribe(
      res => {
        this.agentList = res.result;
        this.agentDataSource.data = this.agentList;
        this.agentDataSource.paginator = this.paginator;
        this.agentDataSource.sort = this.sort;
      },
      error => {
        console.log('There was an error while retrieving agent !!!' + error);
      });
}

  editAgentDetails(id : any) {

      console.log('Agent Id:'+id);
      this.agentService.getAgentById(id).subscribe(res => {
      console.log("Result:"+res);
      this.agentData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewAgentDialog, {
      width: '600px',
      data: this.agentData
     });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });

    },
    error => {
      console.log('There was an error while retrieving Albums !!!' + error);
    });
  }

  openConfirmDeleteDialog(id : any): void {
    const confirmDeleteAgentDialog = this.dialog.open(DeleteAgentConfirmBoxDialog, {
      width: '400px',
      data : id
    });

    confirmDeleteAgentDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
