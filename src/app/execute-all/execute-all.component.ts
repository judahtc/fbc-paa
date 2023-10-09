
import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-execute-all',
  templateUrl: './execute-all.component.html',
  styleUrls: ['./execute-all.component.scss']
})
export class ExecuteAllComponent implements OnInit {

  // idname:any;
results_profitable:any;
results_onerous:any;
// results_expenses:any;
// results_claims:any;
// results_premiums:any;
// results_risk_adjustment_amount:any;
table:any;
// key:any[];
// project_name:any;
// error: any=null;

  result:any;
  tick:any;
  tick1:any;
  tick2:any;
  tick3:any;
  tick4:any;
  result2:any;
  result_init2:any;
  result3:any;
  result_init3:any;
  result4:any;
  result_init4:any;
  result5:any;
  result_init5:any;
  idname:any;
  closeResult = '';
  my_id:any;
  project_name:any;
  error: any=null;
    cross5: string;

    // idname:any;





myprojectname:any;
premiums_table:any;
results:any;
results_expenses:any;
results_claims:any;
results_premiums:any;
// project_name:any;
results_risk_adjustment_amount:any;
key:any[];
value:any[];
// error:any=null;
  
    constructor(private createProjectService:CreateProjectService,
                private router:Router,

                private modalService:NgbModal,
                private toastr:ToastrService
      ) { }
  
    ngOnInit(): void {
      this.idname=localStorage.getItem('id')
      this.project_name=localStorage.getItem('project_name')
  
      
    }

    showme=false;


  
    // done=false;
  
    button=true;
  
    // showme=false;
    opts=false
    showme1=false;
    showme2=false;
    showme3=false;
    showme4=false;
    done=false;
    done1=false;
    done2=false;
    done3=false;
    done4=false;
    done5=false;
    clicked = false;
    showDiv(){
      this.showme=true;
  
    }
    showDiv1(){
      this.showme1=true;
    }
  
    showDiv2(){
      this.showme2=true;
    }
  
    showDiv3(){
      this.showme3=true;
    }
    showDiv4(){
      this.showme4=true;
    }
  
    showSpinner(){
      this.done=true;
    }
  
    showSpinner1(){
      this.done1=true;
    }
  
    hideSpinner(){
      this.done=false;
    }
  
    hideSpinner1(){
      this.done1=false;
    }
  
    showSpinner2(){
      this.done2=true;
    }
  
    hideSpinner2(){
      this.done2=false;
      this.opts=true
    }
  
    showSpinner3(){
      this.done3=true;
    }
  
    hideSpinner3(){
      this.done3=false;
    }
  
    showSpinner4(){
      this.done4=true;
    }
  
    hideSpinner4(){
      this.done4=false;
    }
  
    executed=false;
    execute=true
    cross=false
  
    Executed(){
      this.executed=true;
      this.execute=false
    }

    hideExecute(){
      this.execute=false;
    }
  
    hideButton(){
      this.button=false;
    }
  
  
  
  
    get_id(content:any){
  this.my_id=content
    }


    CashflowEstimation(){
      this.clicked = true;
      const el=document.createElement('div')
      let id=localStorage.getItem('id')
      let vd=localStorage.getItem('vd')
      this.showDiv()
      this.showSpinner()

      this.createProjectService.cashflowestimation(id).subscribe({next:(result)=>{
        

        
        this.results=result.summaries;
        this.results_claims=result.summaries.expected_claims;
        this.results_expenses=result.summaries.expected_expenses;
        this.results_premiums=result.summaries.expected_premiums;
        this.results_risk_adjustment_amount=result.summaries.risk_adjustment_amount;

        console.log(this.results)
        
        this.tick=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
        this.result=result.message+el.innerHTML;
  
        

        

        this.hideSpinner4()
        this.hideSpinner()

        this.testOnerousness()
      },
      error:error=>{
        this.error=error;
        this.toastr.error('calculations failed, please check you data uploads and try again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})

        let details="all cashflows execution failed|| Project id:"+' '+localStorage.getItem('id')
        this.all_cashflows_audit(details)
        if(this.error!=null){
          this.showme=false;
          this.done=false;
        }
      }
      
      })
      
    
    
    
    }


    

  testOnerousness(){
    this.showDiv1()
    this.showSpinner1()
    this.hideExecute()
    this.showSpinner4()

    this.clicked = true;
    const el=document.createElement('div')
    let id=localStorage.getItem('id')
    this.createProjectService.test_onerousness(id).subscribe({next:result=>{

    // this.hideSpinner4()
    // this.button=false

      console.log(result);
      this.results_profitable=result.summaries.profitable;
      this.results_onerous=result.summaries.onerous;
      this.table=result.result
      // this.key=Object.keys(this.table[0])

      this.tick1=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      // this.result=result.message+el.innerHTML;
      this.result2=result.message+el.innerHTML;
          this.hideSpinner1()
this.assign_groups()

    },
    error:error=>{
      this.toastr.error('calculations failed, please check you data uploads and try again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})

      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }



  assign_groups(){
    this.showDiv2()
    this.showSpinner2()
    const el=document.createElement('div')

    let id=localStorage.getItem('id')
    this.createProjectService.assign_groups(id).subscribe({next:(result)=>{
    this.button=false


    result.message="assigning groups successful"
      this.tick2=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      this.result3=result.message+el.innerHTML;
     
      let details='all cashflows successfully executed || Project id:'+' '+localStorage.getItem('id')
      this.all_cashflows_audit(details)
      this.executed_all()

      this.hideSpinner2()
      this.toastr.success("executed successfully",'', {progressBar:true,enableHtml:true})

    },
    error:error=>{
      this.error=error;


  
      if(this.error!=null){
        this.showme=false;
        this.done=false;
        this.toastr.error('calculations failed, please check you data uploads and try again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})

      }
    }})
  }

  all_cashflows_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'execute all cashflows','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }

toCalculations(){
  this.router.navigate(['/portal/calculations'])
}

toCashflows(){
  this.router.navigate(['/portal/cashflow'])
}


executed_all(){
  this.createProjectService.cashflow(localStorage.getItem('id')).subscribe(result=>{


    console.log("done")
  })
}





  
    
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => {
      
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
      
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  

}
