import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';

import { Chart, registerables } from 'chart.js'
import { ToastrService } from 'ngx-toastr';
CreateProjectService
@Component({
  selector: 'app-cash-flow-estimation',
  templateUrl: './cash-flow-estimation.component.html',
  styleUrls: ['./cash-flow-estimation.component.scss']
})
export class CashFlowEstimationComponent implements OnInit {


idname:any;
myprojectname:any;
premiums_table:any;
results:any;
results_expenses:any;
results_claims:any;
results_premiums:any;
project_name:any;
results_risk_adjustment_amount:any;
key:any[];
value:any[];
error:any=null;
  constructor(private createProjectService:CreateProjectService,
              private toastr:ToastrService
    ) { }

  ngOnInit(): void {
    this.idname=localStorage.getItem('id')
    this.project_name=localStorage.getItem('project_name')

  }
  showme=false;

  showDiv(){
    this.showme=true;

  }

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


onSubmit(){
  this.hideExecute()
  this.showSpinner4()
  let id=localStorage.getItem('id')
  this.createProjectService.cashflowestimation(id).subscribe({next:(result)=>{
    let details="cashflow estimation succesfully executed || Project id:"+' '+localStorage.getItem('id')
    this.cashflows_audit(details)
    this.hideSpinner4()
    this.button=false
    this.results=result.summaries;
    this.results_claims=result.summaries.expected_claims;
    this.results_expenses=result.summaries.expected_expenses;
    this.results_premiums=result.summaries.expected_premiums;
    this.results_risk_adjustment_amount=result.summaries.risk_adjustment_amount;
    this.premiums_table=result.policy_schedule1
    this.key=Object.keys(this.premiums_table[0])
    this.value.push(Object.values(this.premiums_table[0]))


  },
  error:error=>{
    let details="cashflow estimation execution failed || Project id:'+' '+localStorage.getItem('id')"
    this.cashflows_audit(details)
    this.error=error;
    this.toastr.error('calculations failed, please check you data uploads and try again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})


    if(this.error!=null){
      this.showme=false;
      this.done=false;
    }
  }
  
  })
  



}

cashflows_audit(details:any){
  let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'cashflow_stimation','details':details}
      this.createProjectService.audit_trail(body).subscribe((result:any)=>{
        console.log(result)

      })

      console.log(body)
}




}
