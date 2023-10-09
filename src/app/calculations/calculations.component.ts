import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  styleUrls: ['./calculations.component.scss']
})

export class CalculationsComponent implements OnInit {
result:any;
donelossComponent=false;
resultb:any;
tick:any;
tickb:any;
tick1:any;
tick1b:any;
tick2:any;
tick2b:any;
tick3:any;
tick3b:any;
tick4:any;
result2:any;
result2b:any;
result_init2:any;
result_init2b:any;
result3:any;
result3b:any;
result_init3:any;
result4:any;
result4b:any;
result_init4:any;
result5:any;
result_init5:any;
idname:any;
closeResult = '';
my_id:any;
project_name:any;
error: any=null;
  cross5: string;

  constructor(private createProjectService:CreateProjectService,
              private modalService:NgbModal,
    ) { }

  ngOnInit(): void {
    this.idname=localStorage.getItem('id')
    this.project_name=localStorage.getItem('project_name')

    
  }

  showme=false;
  showmeb=false;
  showme1=false;
  showme1b=false;
  showme2=false;
  showme2b=false;
  showme3=false;
  showme3b=false;
  showme4=false;
  done=false;
  doneb=false;
  done1=false;
  done1b=false;
  done2=false;
  done2b=false;
  done3=false;
  done3b=false;
  done4=false;
  done5=false;
  clicked = false;
  showDiv(){
    this.showme=true;

  }
  showbDiv(){
    this.showmeb=true;

  }
  showDiv1(){
    this.showme1=true;
  }
  showDiv1b(){
    this.showme1b=true;
  }

  showDiv2(){
    this.showme2=true;
  }

  showDiv3(){
    this.showme3=true;
  }
  showDiv3b(){
    this.showme3b=true;
  }
  showDiv4(){
    this.donelossComponent=true;
  }

  showSpinner(){
    this.done=true;
  }
  showbSpinner(){
    this.doneb=true;
  }

  showSpinner1(){
    this.done1=true;
  }

  hideSpinner(){
    this.done=false;
  }
  hidebSpinner(){
    this.doneb=false;
  }

  hideSpinner1(){
    this.done1=false;
  }
  hideSpinner1b(){
    this.done1b=false;
  }

  showSpinner2(){
    this.done2=true;
  }
  showSpinner2b(){
    this.done2b=true;
  }

  hideSpinner2(){
    this.done2=false;
  }
  hideSpinner2b(){
    this.done2b=false;
  }

  showSpinner3(){
    this.done3=true;
  }

  hideSpinner3(){
    this.done3=false;
  }
  hideSpinner3b(){
    this.done3b=false;
  }

  showSpinner4(){
    this.done4=true;
  }

  hideSpinner4(){
    this.donelossComponent=false;
  }

  executed=false;
  execute=true
  cross=false

  Executed(){
    this.executed=true;
    this.execute=false
  }



  get_id(content:any){
this.my_id=content
  }
  
  expected_premiums(){
    this.clicked = true;
    const el=document.createElement('div')
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    this.showDiv()
    this.showSpinner()
    
    this.createProjectService.expected_premiums(id,vd,sd).subscribe({next:result=>{

      console.log(result)
      this.tick=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      this.result=result.message+el.innerHTML;

      
      this.expected_reinsurance_premiums()
      this.hideSpinner()
      this.showbSpinner()
    }    ,
    error:error=>{
      let details='calculations exucation failed || Project id:'+' '+localStorage.getItem('id')
      this.calculation_audit(details)

      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }
  expected_reinsurance_premiums(){

    // this.clicked = true;
    const el=document.createElement('div')
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    // this.showbSpinner()
    this.showbDiv()

    this.createProjectService.expected_reinsurance_premiums(id,vd,sd).subscribe({next:result=>{

      console.log(result)
      this.tickb=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      this.resultb=result.message+el.innerHTML;

      
      this.monthly_insurance_revenue()
      this.hidebSpinner()
      this.showSpinner1()
    }    ,
    error:error=>{
      let details='calculations exucation failed || Project id:'+' '+localStorage.getItem('id')
      this.calculation_audit(details)

      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }


  monthly_insurance_revenue(){
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    this.showDiv1()

    this.createProjectService.monthly_insurance_revenue(id,vd,sd).subscribe({next:result=>{
      console.log(result)
      this.result2=result.message;

      this.tick1=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      

      this.reinsurance_expense()
      this.hideSpinner1()
      // this.showSpinner2b()
    }    ,
    error:error=>{
      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }

  reinsurance_expense(){
    this.done1b=true
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    this.showDiv1b()
    this.createProjectService.reinsurance_expense(id,vd,sd).subscribe({next:result=>{
      console.log(result)
      this.result2b=result.message;

      this.tick1b=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      

      this.acquisition_costs()
      this.hideSpinner1b()
      this.showSpinner2()
    }    ,
    error:error=>{
      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }



  
  acquisition_costs(){
    // this.done2b=true

    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    this.showDiv2()
    this.createProjectService.acquisition_costs(id,vd,sd).subscribe({next:result=>{
      console.log(result)
      this.result3=result.message;



      this.tick2=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      this.reinsurance_commission()
      this.hideSpinner2()
      this.showSpinner2b()
    }
    ,
    error:error=>{
      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }
  reinsurance_commission(){
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    // this.showDiv2()
    this.showme2b=true
    this.createProjectService.reinsurance_commission(id,vd,sd).subscribe({next:result=>{
      console.log(result)
      this.result3b=result.message;



      this.tick2b=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      this.premiums_received()
      this.hideSpinner2b()
      this.showSpinner3()
    }
    ,
    error:error=>{
      this.error=error;
      console.log(this.error)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }

  premiums_received(){
    this.showDiv3()
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    this.createProjectService.premiums_received(id,vd,sd).subscribe({next:result=>{
      console.log(result)
      this.result4=result.message;
      
      this.tick3=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      // this.loss_component()

      this.done3=false
      this.reinsurance_premiums_paid()
      this.showSpinner4()
    }    ,
    error:error=>{
      this.error=error;
      console.log(this.error)
      let details='premiums recieved calculations failed || Project id:'+' '+localStorage.getItem('id')
      this.calculation_audit(details)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }


  reinsurance_premiums_paid(){
    this.showDiv3b()
    this.done3b=true
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    this.createProjectService.reinsurance_premiums_paid(id,vd,sd).subscribe({next:result=>{
      console.log(result)
      this.result4b=result.message;
      
      this.tick3b=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i>`
      this.done3b=false      
      this.loss_component()

      // this.hideSpinner3()
      this.showSpinner4()
    }    ,
    error:error=>{
      this.error=error;
      console.log(this.error)
      let details='premiums recieved calculations failed || Project id:'+' '+localStorage.getItem('id')
      this.calculation_audit(details)

      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }

  loss_component(){
    let id=localStorage.getItem('id')
    let vd=localStorage.getItem('vd')
    let sd=localStorage.getItem('sd')
    this.showDiv4()
    this.createProjectService.loss_component(id,vd,sd).subscribe({next:result=>{


      console.log(result)
      this.result5=result.message;
      this.Executed()
      this.open(this.my_id)
      this.tick4=`<i style="color: rgb(20, 105, 20);" class="fa fa-check" aria-hidden="true"></i><br><hr style="box-shadow:  2px 2px 1px lightblue;"></hr>`
      let details='all calculations successfully executed || Project id:'+' '+localStorage.getItem('id')
      this.calculation_audit(details)

      this.executed_all()
      this.hideSpinner4()


    }
    
    ,
    error:error=>{
      this.error=error;
      console.log(this.error)
      let details='loss component failed to execute || Project id:'+' '+localStorage.getItem('id')
      this.calculation_audit(details)
      if(this.error!=null){

        
        this.cross=true
        this.donelossComponent=false

        this.cross5 =`<i class="fa fa-close"></i><br><hr style="box-shadow:  2px 2px 1px lightblue;"></hr>`

      }
    }})
  }

  calculation_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'calculations','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }


  executed_all(){
    this.createProjectService.calculations(localStorage.getItem('id')).subscribe(result=>{
      
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
