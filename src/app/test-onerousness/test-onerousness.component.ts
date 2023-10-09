import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CreateProjectService } from '../create-project.service';

@Component({
  selector: 'app-test-onerousness',
  templateUrl: './test-onerousness.component.html',
  styleUrls: ['./test-onerousness.component.scss']
})
export class TestOnerousnessComponent implements OnInit {
idname:any;
results_profitable:any;
results_onerous:any;
results_expenses:any;
results_claims:any;
results_premiums:any;
results_risk_adjustment_amount:any;
table:any;
key:any[];
project_name:any;
error: any=null;
  constructor(private createProjectService:CreateProjectService,
              private toastr:ToastrService
    ) { }

  ngOnInit(): void {

    this.idname=localStorage.getItem('id')
    
    this.project_name=localStorage.getItem('project_name')

  }

  
  showme=false;
  done=false;

  button=true;


  showSpinner4(){
    this.done=true;
  }


  hideSpinner4(){
    this.done=false;
  }

  execute=true;


  hideExecute(){
    this.execute=false;
  }

  hideButton(){
    this.button=false;
  }

  showDiv(){
    this.showme=true;
  }


  onSubmit(){

    this.hideExecute()
    this.showSpinner4()

    let id=localStorage.getItem('id')
    this.createProjectService.test_onerousness(id).subscribe({next:result=>{

    this.hideSpinner4()
    this.button=false

      console.log(result);
      this.results_profitable=result.summaries.profitable;
      this.results_onerous=result.summaries.onerous;
      this.table=result.result
      this.key=Object.keys(this.table[0])
      let details='onerousity successfully tested || Project id:'+' '+localStorage.getItem('id')
      this.cashflows_audit(details)

    },
    error:error=>{
      this.toastr.error('calculations failed, please check you data uploads and try again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})
      let details='onerousity execution failed'

      this.cashflows_audit(details)
      
      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }

  cashflows_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'testing for onerousity','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }

}
