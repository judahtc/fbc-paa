import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectService } from '../create-project.service';
import { CreateProjectComponent } from '../create-project/create-project.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {
results:any;
project_name:any;
valuation_date:any;
start_date:any;
user_id:any;
projects_id:any;
closeResult:any;
description:any;
  constructor(
    private modalService:NgbModal,
    private createProjectService:CreateProjectService,
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private toastr:ToastrService
    ) { }
//@ts-ignore
form:FormGroup;
  ngOnInit(): void {
    this.getProjectById();
    this.form=this.fb.group({
      project_name: [''],
      valuation_date: [''],
      start_date: [''],
      description: [''],
      created_at:"0",
      updated_at:"0",
      project_id:"0",
      user_id:localStorage.getItem('user_id')
      
      })
  }



  getProjectById(){
    this.projects_id=this.route.snapshot.params['id']
    this.createProjectService.getProjectById(this.route.snapshot.params['id']).subscribe(result=>{
      this.results=result
      this.project_name=this.results.project_name
      console.log(this.results)

      console.log(this.project_name)
      this.valuation_date=this.results.valuation_date
      this.description=this.results.description
      this.start_date=this.results.start_date
      this.user_id=this.results.user_id
    })
    

  }


  updateProject(){
    this.createProjectService.updateProject(this.projects_id,this.form.value).subscribe(result=>{
      this.toastr.success("project updated successfully",'', {progressBar:true,enableHtml:true,timeOut:5000})

      localStorage.setItem('vd',this.form.value.valuation_date)
      let details='updated the project || Project id:'+' '+localStorage.getItem('id')
      this.update_project_audit(details)




    })
  }

  update_project_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'update project','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }
  



  deleteProject(){

    this.createProjectService.delete_project_by_id(this.projects_id).subscribe(result=>{
      console.log(result)
    })
  }

  reloadme(){
    location.reload()
  }

  redirect(){
    this.router.navigate(['/portal/projects'])
  }


  open1(confirmdelete:any) {
    this.modalService.open(confirmdelete, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     
    });
  }

  open2(deletedone:any) {
    this.modalService.open(deletedone, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     
    });
  }


  open3(doneupdate:any) {
    this.modalService.open(doneupdate, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      
      
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
