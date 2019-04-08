import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { ReportModule } from '../report.module';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { columnList } from '../report-column-list';
@Component({
  selector: 'app-transaction-report',
  templateUrl: './transaction-report.component.html',
  styleUrls: ['./transaction-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TransactionReportComponent implements OnInit {
  property:any[];
  firms: any[];
  locations:any[];
  blocks:any[];
  plots:any[];
  products:any[];
  units:any[];
  loading : boolean=false;
  reportForm: FormGroup;
  reportData;
  columns=columnList["transaction"];
  constructor(
    private selectorService: SelectorService,
    private fb: FormBuilder
  ) { 
    this.reportForm= this.fb.group({
      'firmId':[null],
      'blockId':[null],
      'projectId':[null],
      'plotId':[null],
      'unitId':[null],
      'productId':[null],
      'bookingDateFrom':[null],
      'bookingDateTo':[null],
    });
  }
  ngOnInit() {
    this.selectorService.getData("firm").subscribe(
      res => {  
        this.firms=res.result;
      },  
      error => {  
        console.log('There was an error while retrieving firm' + error);
      }
    )
  }
  onChange(event,type){
    this.loading = true;    
    this.selectorService.getDependentData(type,event.value).subscribe(
      res => {  
        console.dir(res);
        this.loading = false;
        switch (type) {
          case 'project':
          this.property=res.result;        
          this.blocks=[];
          this.plots=[];
            break;
          case 'block':
          this.blocks=res.result;
          this.plots=[];
          break;
          case 'plot':
          this.plots=res.result;                    
          break;
       
          default:
            console.log('Sorry, we are out of ' + '.');
        }       
        
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);
      }
    )
  }
  onFormSubmit(form: NgForm){
    console.log(form);

    this.selectorService.getReportData(form).subscribe(
      res => {  
        console.log(res);  
        this.reportData=res;      
      },  
      error => {  
        console.log('There was an error while retrieving report data' + error);
      }
    )
    // console.log(form)    
  }
}
