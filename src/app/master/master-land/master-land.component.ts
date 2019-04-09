import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Land } from '../../model/land';
import { LandService } from '../../services/land.service';
import { LandDialog } from './create-land.component';
import { DeleteLandConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'app-master-land',
  templateUrl: './master-land.component.html',
  styleUrls: ['./master-land.component.scss']
})
export class MasterLandComponent implements OnInit {

  constructor(private landService : LandService,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  
  landList : Land[];
  landData : Land;

  landDataSource: any;

  displayedColumns = ['khasraNumber','landAmount','farmerName','actions'];


  ngOnInit() {

    this.landService.getAllLands().subscribe(
      res => {  
        this.landList = res.result;
        this.landDataSource = new MatTableDataSource();  
        this.landDataSource.data = res.result;
        this.landDataSource.paginator = this.paginator;
        this.landDataSource.sort = this.sort;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
      }
    );


  }


  openDialog(): void {
    this.landData = new Land();
    const dialogRef = this.dialog.open(LandDialog, {
      width: '400px',
      data : this.landData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editCityDetails(farmerId : any) {

    console.log('City Id:'+farmerId);

    this.landService.getLandById(farmerId).subscribe(res => {  
      console.log("Result:"+res);
      this.landData =  res.result;
      const dialogRef = this.dialog.open(LandDialog, {
        width: '350px',
        data : this.landData
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  }

  openConfirmDeleteDialog(farmerId : any): void {
    const confirmDeleteLandDialog = this.dialog.open(DeleteLandConfirmBoxDialog, {
      width: '400px',
      data : farmerId
    });

    confirmDeleteLandDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
