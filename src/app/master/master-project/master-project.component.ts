import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { FirmService } from '../../services/firm.service';
import { Firm } from '../../model/Firm';
import { Project } from '../../model/Project';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { City } from '../../model/City';
import { CityService } from '../../services/city.service';
import { LocationService } from '../../services/location.service';
import { ProjectService } from '../../services/project.service';
import { DeleteProjectConfirmBoxDialog } from './master-delete-confirm-box.component';
import { SelectorService } from '../../services/selector.service';
import { PropertyType } from '../../model/PropertyType';
import { PropertytypeService } from '../../services/propertytype.service';

@Component({
  selector: 'dialog-overview-project-dialog',
  templateUrl: './create-project.component.html',
  styleUrls: [ './create-project.component.scss']
})
export class DialogOverviewEProjectDialog implements OnInit{
  firmList : any;
  cityList : any;
  locationList : any;
  propertyList: any;
  propertyTypeList : any;
  project : Project;
  projectForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewEProjectDialog>,private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar : MatSnackBar,
    private selectorService : SelectorService,
    private projectService : ProjectService) {

      this.firmList = data.firmList;
      this.cityList = data.cityList;
      this.propertyTypeList=data.propertyTypeList;
      //this.locationList = data.locationList;
      console.log("Firm List:",this.firmList);
      console.log("City List:",this.cityList);
      this.projectForm= this.fb.group({
        'firmName': [null , Validators.required ],
        'address' : [null ,Validators.required ],
        'projectName': [null ,Validators.required ],
        'cityName' : [null, Validators.required ],
        'location' : [null, Validators.required ],
        'businessValue' : [null, Validators.required ],
        'propertyId' : [null , Validators.required],
        'propertyTypeId' : [null , Validators.required]
      });
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setFirmId(firm : any) : void {
    console.log("Firm:",firm);
    this.project.firmId = firm.id; 
  }

  onFirmChange(event,type){
    console.log(event.value);
    var value = event;
    var code =  value.split('|')[0];
    var value1 = value.split('|')[1];
    console.log(value1+"  -- >"+code);
    this.selectorService.getDependentData(type,code).subscribe(
      res => {
         this.propertyList=res.result;
        console.log(this.propertyList);
      },
      error => {
        console.log('There was an error while retrieving Albums !!!' + error);
      }
    );
  }

  onChange(event,type){
    // console.log(event)
    var value = event;
    var code =  value.split('|')[0];
    var value1 = value.split('|')[1];
    console.log(value1+"  -- >"+code);
    this.selectorService.getDependentData(type,code).subscribe(
      res => {
         this.locationList=res.result;
        console.dir(this.locationList);
      },
      error => {
        console.log('There was an error while retrieving Albums !!!' + error);
      }
    )
  }

  setLocation(location : any)  : void {
    console.log("Location:",location);
    this.project.locationId = location.id; 
  }

  ngOnInit() {
    if(this.data.projectData!=null || this.data.projectData!==undefined)
    {
      this.project = new Project();
      this.project = this.data.projectData;
    }
    else{
      this.project = new Project();
    }

    
  }
  
  onFormSubmit(form: NgForm)  
  {  
    console.log(form);  
  }

  closePopup() : void {
    this.dialogRef.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  submitForm() {
    
    var code =  this.project.firmId.split('|')[0];
    var value1 = this.project.firmId.split('|')[1];
    this.project.firmId = code;
    this.project.firmName = value1;
    
    console.log()
    var code =  this.project.cityId.split('|')[0];
    var value1 = this.project.cityId.split('|')[1];
    this.project.cityId = code;
    this.project.cityName = value1;

    var code =  this.project.locationId.split('|')[0];
    var value1 = this.project.locationId.split('|')[1];
    this.project.locationId = code;
    this.project.location = value1;

    var code =  this.project.propertyId.split('|')[0];
    var value1 = this.project.propertyId.split('|')[1];
    this.project.propertyId = code;
    this.project.propertyName = value1;

    var code =  this.project.propertyTypeId.split('|')[0];
    var value1 = this.project.propertyTypeId.split('|')[1];
    this.project.propertyTypeId = code;
    this.project.PropertyType = value1;


    if(this.project.id==undefined || this.project.id==null) {
      // create new firm
      this.projectService.createProject(this.project).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Project Created Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);
          this.openSnackBar('Error while creating project, Please contact your adminstrator','');
        });
    }
    else {
      this.projectService.updateProject(this.project).subscribe(  
        res => {  
          console.log(res);
          this.openSnackBar('Project Updated Successfully','');
          this.closePopup();
        },  
        error => {  
          console.log('There was an error while retrieving Albums !!!' + error);  
          this.openSnackBar('Error while updating project, Please contact your adminstrator','');
        });
    }
  }

}

@Component({
  selector: 'app-master-project',
  templateUrl: './master-project.component.html',
  styleUrls: ['./master-project.component.scss']
})
export class MasterProjectComponent implements OnInit {

  firmList : Firm[];
  cityList : City[];
  locationList : Location[];
  projectList : Project[];
  propertyTypeList : PropertyType[];
  projectDataSource: any;
  loading : boolean =false;
  projectData : Project;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(public dialog: MatDialog,public firmService : FirmService,
    public cityService : CityService,public locationService : LocationService,
    public projectService : ProjectService,public propertyTypeService : PropertytypeService) { }

  displayedColumns = ['firmName','projectName','PropertyType','cityName','location','address','businessValue','actions']; 

  openDialog(projectid): void {
    console.log(this.firmList);
    const dialogRef = this.dialog.open(DialogOverviewEProjectDialog, {
      width: '450px',
      disableClose: true ,
      data: {
       "projectData" : this.projectData,
       "projectId": projectid,
       "firmList": this.firmList,
       "locationList": this.locationList,
       "cityList": this.cityList,
       "propertyTypeList": this.propertyTypeList
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  ngOnInit() {
    
    this.refresh();

    this.firmService.getAllFirms().subscribe(
      res => {  
        this.firmList = res.result;
        console.log("firmList List:",this.firmList);
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);  
    });
      
    this.locationService.getAllLocations().subscribe(  
      res => {  
        this.locationList = res.result;
        console.log("Location List:",this.locationList);
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);  
    });

    this.cityService.getAllCities().subscribe(  
      res => {  
        this.cityList = res.result;
        console.log("City List:",this.cityList);
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);  
    });

    this.propertyTypeService.getAllProperties().subscribe(
      res => {  
        this.propertyTypeList = res.result;
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);
    });

  }

  editprojectDetails(projectId) {

    this.projectService.getProjectById(projectId).subscribe(res => {  
      console.log("Result:"+res);
      this.projectData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewEProjectDialog, {
        width: '350px',
        data : {
          "projectData": this.projectData,
          "firmList": this.firmList,
          "locationList": this.locationList,
          "cityList": this.cityList,
          "propertyTypeList": this.propertyTypeList
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

  refresh() {
    this.loading = true;
    this.projectService.getAllProjects().subscribe(
      res => {  
        this.loading = false;
        this.projectList = res.result;
        console.log(this.projectList);
        this.projectDataSource = new MatTableDataSource();  
        this.projectDataSource.data = res.result;
      },  
      error => {  
        this.loading =false;
        console.log('There was an error while retrieving !!!' + error);
    });
  }
  openConfirmDeleteDialog(projectId : any): void {
    console.log("ProjectId:",projectId);
    const confirmDeleteProjectDialog = this.dialog.open(DeleteProjectConfirmBoxDialog, {
      width: '400px',
      data : projectId
    });

    confirmDeleteProjectDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
