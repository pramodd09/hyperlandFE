import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AddUser } from '../../model/AddUser';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AddUserService } from '../../services/add-user.service';
import { DeleteUserConfirmBoxDialog } from './master-delete-confirm-box.component';
import { DialogOverviewExampleDialog } from '../../master/master-firm/master-firm.component';
import { SelectorService } from '../../services/selector.service';


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create-user.component.html',
  styleUrls: [ './create-user.component.scss']
})
export class DialogOverviewUserDialog  implements OnInit {

  roleList : any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddUser,
    private fb: FormBuilder,
    private selectorService: SelectorService,
    private addUserService: AddUserService,
    private snackBar : MatSnackBar) {

      this.userForm= this.fb.group({
        'userName': [null , Validators.required ],
        'userRole' : [null , Validators.required ]
      });
    }
    
    userForm: FormGroup;
    user : AddUser;
    loading : boolean = false;

    ngOnInit() {
      this.selectorService.getData("role").subscribe(
        res => {
          this.roleList=res.result;
        },
        error => {
          console.log('There was an error while retrieving firms !!!' + error);
        }
      );

      if(this.data!=null || this.data!==undefined)
      {
        this.user = new AddUser();
        this.user = this.data;
      }
      else{
        this.user = new AddUser();
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
      if(this.user.id==undefined || this.user.id==null) {
        // create new user
        this.loading = true;
        this.addUserService.createUser(this.user).subscribe(  
          res => {  
            console.log(res);
            this.loading = false;
            this.openSnackBar('User Created Successfully','');
            this.closePopup();
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while creating user, Please contact your adminstrator','');
            this.loading = false;
          });
      }
      else {
        this.addUserService.updateUser(this.user).subscribe(  
          res => {  
            console.log(res);
            this.openSnackBar('User Updated Successfully','');
            this.closePopup();
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);  
            this.openSnackBar('Error while updating user, Please contact your adminstrator','');
          });
      }
    }
}




@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  constructor(public dialog: MatDialog,public addUserService : AddUserService) {}
  
  userList : AddUser[];
  loading : boolean=false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  userDataSource: any;

  userData : AddUser; 

  displayedColumns = ['id', 'userName','userRole','actions']; 

  openDialog(): void {
    this.userData = new AddUser();
    const dialogRef = this.dialog.open(DialogOverviewUserDialog, {
      width: '400px',
      data : this.userData,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.refresh();
    });
  }

  ngOnInit() {
    this.refresh();
  }
 
  refresh() {
    this.userDataSource = new MatTableDataSource();
    this.loading = true;
    this.addUserService.getAllUsers().subscribe(  
      res => {  
        this.userList = res.result;
        this.userDataSource.data = this.userList;
        this.userDataSource.paginator = this.paginator;
        this.userDataSource.sort = this.sort;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
        this.loading= false;
      });
  } 

   editUserDetails(firmId : any) {

    console.log('Firm Id:'+firmId);

    this.addUserService.getUserById(firmId).subscribe(res => {  
      console.log("Result:"+res);
      this.userData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewUserDialog, {
        width: '350px',
        data : this.userData
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  } 

 openConfirmDeleteDialog(userId : any): void {
    const confirmDeleteFirmDialog = this.dialog.open(DeleteUserConfirmBoxDialog, {
      width: '400px',
      data : userId
    });

    confirmDeleteFirmDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  } 

}
