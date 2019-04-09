import { Component, OnInit, ViewChild } from '@angular/core';
import { FarmerService } from '../../services/farmer.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Farmer } from '../../model/Farmer';
import { FarmerDialog } from './create-farmer.component';
import { DeleteFarmerConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'app-master-farmer',
  templateUrl: './master-farmer.component.html',
  styleUrls: ['./master-farmer.component.scss']
})
export class MasterFarmerComponent implements OnInit {

  constructor(private farmerService : FarmerService,
    public dialog: MatDialog) { }

    farmerList : Farmer[];
  farmerData : Farmer;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  farmerDataSource: any;

  displayedColumns = ['farmerName','pancardNumber','aadharNumber','bankName','branchName','ifscNumber','actions'];

  ngOnInit() {

    this.farmerService.getAllFarmers().subscribe(
      res => {  
        this.farmerList = res.result;

        this.farmerDataSource = new MatTableDataSource();  
        this.farmerDataSource.data = res.result;
        this.farmerDataSource.paginator = this.paginator;
        this.farmerDataSource.sort = this.sort;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
      }
    );
  }

  openDialog(): void {
    this.farmerData = new Farmer();
    const dialogRef = this.dialog.open(FarmerDialog, {
      width: '400px',
      data : this.farmerData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editCityDetails(farmerId : any) {

    console.log('City Id:'+farmerId);

    this.farmerService.getFarmerById(farmerId).subscribe(res => {  
      console.log("Result:"+res);
      this.farmerData =  res.result;
      const dialogRef = this.dialog.open(FarmerDialog, {
        width: '350px',
        data : this.farmerData
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
    const confirmDeleteFarmerDialog = this.dialog.open(DeleteFarmerConfirmBoxDialog, {
      width: '400px',
      data : farmerId
    });

    confirmDeleteFarmerDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}


