import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Firm } from '../../model/Firm';
import { FirmService } from '../../services/firm.service';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Block } from '../../model/Block';
import { BlockService } from '../../services/block.service';
import { DeleteBlockConfirmBoxDialog } from './master-delete-confirm-box.component';
import { Project } from '../../model/Project';
import { ProjectService } from '../../services/project.service';
import { PropertytypeService } from '../../services/propertytype.service';
import { PropertyType } from '../../model/PropertyType';
import { SelectorService } from '../../services/selector.service';

@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-block.component.html',
  styleUrls: [ './create-block.component.scss']
})
export class DialogOverviewBlockDialog implements OnInit {
  firmList : any;
  projectList : any;
  propertyTypeList : any;
  blockForm: FormGroup;
  block : Block;
  option : any;
  propertyList : any;
  loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewBlockDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder,
    public blockService : BlockService,
    public selectorService : SelectorService,
    private snackBar : MatSnackBar) {

      this.blockForm= this.fb.group({
        'firmId': [null , Validators.required ],
        'propertyId': [null , Validators.required ],
        'propertyTypeId': [null , Validators.required ],
        //'projectId': [null , Validators.required ],
        'blockName': [null , Validators.required ],
        //'address' : [null ,Validators.required ]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closePopup() : void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  setPropertyType(type :any) {
    console.log("Type:"+type);
    this.block.propertyType= type;
  } 

  submitForm() {

        var code =  this.block.firmId.split('|')[0];
        var value1 = this.block.firmId.split('|')[1];
        this.block.firmId = code;
        this.block.firmName = value1;

        var code =  this.block.propertyTypeId.split('|')[0];
        var value1 = this.block.propertyTypeId.split('|')[1];
        this.block.propertyTypeId = code;
        this.block.propertyType = value1;

        var code =  this.block.propertyId.split('|')[0];
        var value1 = this.block.propertyId.split('|')[1];
        this.block.propertyId = code;
        this.block.propertyName = value1;


    if(this.block.id==undefined || this.block.id==null) {
      // create new block
      this.blockService.createBlock(this.block).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Block Created Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);
          this.openSnackBar('Error while creating firm, Please contact your adminstrator','');
        });
    }
    else {
      this.blockService.updateBlock(this.block).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Block Updated Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);  
          this.openSnackBar('Error while updating firm, Please contact your adminstrator','');
        });
    }
  }

  onChange(event,type){
    if(event!=undefined)
    {
      this.loading = true;
    var value = event;
    var code =  value.split('|')[0];
    var value1 = value.split('|')[1];
    this.selectorService.getDependentData(type,code).subscribe(
      res => {
         this.propertyList=res.result;
        this.loading = false;
      },
      error => {
        console.log('There was an error while retrieving Albums !!!' + error);
        this.loading = false;
      }
    );
    }
  }

  ngOnInit() {
    
    
    this.firmList = this.data.firmList;
    this.projectList = this.data.projectList;
    this.propertyTypeList = this.data.propertyTypeList;
    console.log("Property type List:",this.propertyTypeList);
    console.log("Firm List:",this.firmList);
    console.log("ProjectList List:",this.projectList);
    //this.block = new Block();
    //this.block = this.data.blockData;
    if(this.data.blockData !=null || this.data.blockData!==undefined)
    {
      this.block = new Block();
      this.block = this.data.blockData;
    }
    else{
      this.block = new Block();
    }

  }
}


@Component({
  selector: 'app-master-block',
  templateUrl: './master-block.component.html',
  styleUrls: ['./master-block.component.scss']
})
export class MasterBlockComponent implements OnInit {

  blockList : Block[];
  firmList : Firm[];
  projectList : Project[];
  propertyTypeList : PropertyType[];
  blockDataSource: any;
  loading : boolean = false;
  blockData : Block;

  constructor(public dialog: MatDialog,
              public blockService : BlockService,
              public selectorService : SelectorService,
              public typeService: PropertytypeService,
              public firmService : FirmService,
              public projectService : ProjectService,
              public snackBar : MatSnackBar) { }

  displayedColumns = ['firmName','propertyName','propertyType','block','actions']; 

  openDialog(): void {
    console.log(this.blockList);
    const dialogRef = this.dialog.open(DialogOverviewBlockDialog, {
      width: '350px',
      data: {
        'blockData' : this.blockData,
        'firmList': this.firmList,
        'projectList':this.projectList,
        'propertyTypeList': this.propertyTypeList
      },
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  ngOnInit() {
    
      this.refresh();
      
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

      this.selectorService.getData("project").subscribe(
        res => {
        console.log("dsdsds");
          console.dir(res);

          this.projectList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        }
      )

      this.selectorService.getData("propertyType").subscribe(
        res => {
        console.log("dsdsds");
          console.dir(res);

          this.propertyTypeList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        });
    }

    refresh() {
      this.loading = true;
      this.blockData = new Block();
      this.blockService.getAllBlocks().subscribe(  
        res => {  
          this.loading = false;
          this.blockList = res.result;
          console.log(this.blockList);
          this.blockDataSource = new MatTableDataSource();  
          this.blockDataSource.data = res.result;
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);  
          this.loading = false;
        });
    }

    openConfirmDeleteDialog(blockId : any): void {
      console.log("blockId:",blockId);
      const confirmDeleteBlockDialog = this.dialog.open(DeleteBlockConfirmBoxDialog, {
        width: '400px',
        data : blockId,
        disableClose: true 
      });
  
      confirmDeleteBlockDialog.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

    editBlockDetails(blockId) {
      console.log('block Id:'+blockId);

    this.blockService.getBlockById(blockId).subscribe(res => {  
      console.log("Result:"+res);
      this.blockData =  res.result;
      console.log("block data:",this.blockData);

      const dialogRef = this.dialog.open(DialogOverviewBlockDialog, {
        width: '350px',
        disableClose: true ,
        data: {
          'blockData' : this.blockData,
          'firmList': this.firmList,
          'projectList':this.projectList,
          'propertyTypeList': this.propertyTypeList
        }
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

    onFormSubmit(form: NgForm)  
    {  
      console.log(form);  
    }
  }

