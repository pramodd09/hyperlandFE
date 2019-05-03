import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';
import { SelectorService } from '../../services/selector.service';
import { ReportModule } from '../report.module';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { columnList } from '../report-column-list';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerReportComponent {
  firms: any[];
  property: any[];
  cities: any[];
  locations: any[];
  blocks: any[];
  plots: any[];
  clients:any[];
  loading: boolean = false;
  reportForm: FormGroup;
  reportData;
 
  columns=columnList["customer"];

  constructor(
    private selectorService: SelectorService,
    private fb: FormBuilder
  ) {
    this.reportForm= this.fb.group({
      'firmId': [null],
      'projectId':[null],
      'blockId':[null],
      'plotId':[null],
      'clientId':[null],
      'bookingDateFrom':[null]
    });
  }

  ngOnInit() {
    this.selectorService.getData("firm").subscribe(
      res => {  
        // console.dir(res);
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
        // console.dir(res);
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
          case 'client':
          this.clients=res.result;                    
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
    this.selectorService.getReportData(form,"booking").subscribe(
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
