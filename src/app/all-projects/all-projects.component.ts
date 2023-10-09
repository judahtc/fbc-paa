import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CreateProjectService } from '../create-project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrService } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SetAccessToken, ClearAccessToken } from '../state/auth.state';
import { SetProjectDetails, ClearProjectDetails } from '../state/project.state';
import { AuthStateModel } from '../state/auth.state';
import { ProjectStateModel } from '../state/project.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {
  closeResult = '';
  valuation_date:any;
  // projects:any;
  project_name:any;
  number_of_projects:any;
  myproject_name:any;

  id:any;
  iid:any;
  result:any;
  my_id:any;
  vd:any;
  access:any;

  user_id:any;
  admin:any;
  tenant_id:any;


 public page=1;
 public pageSize = 10;
 public AppointmentsModel:any;
 projects:Array<any>;
  myproject_names: any;
  valuation_dates: any;
  pm: any;
  order: any;
  showCell=false

  active_project: string;
  monthly: any;
  start: any;
  tenant__name: string;

  constructor(
    private modalService:NgbModal,
    private fb:FormBuilder,
    private createProjectService:CreateProjectService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    private store:Store
    ) { }
//@ts-ignore
 form:FormGroup;
  ngOnInit(): void {
    this.tenant__name=localStorage.getItem('tn')
    this.active_project=localStorage.getItem("project_name")

    this.form=this.fb.group({
      project_name: [''],
      valuation_date: [''],
      start_date: [''],
      monthly:[''],
      description:[''],

      created_at:"0",
      updated_at:"0",
      project_id:"0",
      tenant_id:"0",
      user_id:localStorage.getItem('user_id')

      
      
      })
    this.getUser()
   
    this.iid=this.route.snapshot.params['id']
 
 

    
    
  }


getUser(){
    this.createProjectService.getUser().subscribe({next:result=>{
      
      this.admin=result.is_admin

      this.getProjects();
 
    },
  
  
    error:error=>{
      // alert(error.detail)
      this.whenTokenExpires()
    }
  })
  }


  sortData(){

      let newarr = this.projects.sort((b:any,a:any)=>b.project_id-a.project_id);
      this.projects=newarr

  }

getProjects(){

  if(this.admin==true){

  this.createProjectService.getprojects().subscribe({next:(result)=>{
    this.projects=result
    this.projects=this.projects.sort((a:any,b:any)=>b.project_id-a.project_id);
    this.number_of_projects=result.length


  },

  error:error=>{
    // alert(error.detail)
    console.log(error)
    this.whenTokenExpires()
  }

})}

  else{
    this.createProjectService.getUserProjects().subscribe( {next:result=>{
      console.log(result)
      this.projects=result
      this.projects=this.projects.sort((a:any,b:any)=>b.project_id-a.project_id);
      this.number_of_projects=result.length

      if(result.response=='token expired'){
        this.whenTokenExpires()
      }
      

    },
  
  error:error=>{
    // alert(error.detail)
    this.whenTokenExpires()
  }
  })

  }



}



activate_project_audit(details:any){
  let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'activate project','details':details}
      this.createProjectService.audit_trail(body).subscribe((result:any)=>{
        console.log(result)

      })

      console.log(body)
}
create_project_audit(details:any){
  let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'create project','details':details}
      this.createProjectService.audit_trail(body).subscribe((result:any)=>{
        console.log(result)

      })


      console.log(body)
}

currentProject(id:any){

  this.createProjectService.getProject(id).subscribe(result=>{
    
    console.log(result)

    this.id=id
    this.myproject_name=result.project_name;
    this.valuation_date=result.valuation_date
    console.log(this.id)
    this.monthly=result.monthly
    localStorage.setItem('monthly',this.monthly)
    localStorage.setItem('vd',this.valuation_date)
    localStorage.setItem('id',this.id);
    localStorage.setItem('project_name',result.project_name);
    localStorage.setItem('sd',result.start_date);


    const project_name = result.project_name;
    const project_id = this.id
    const valuation_date = this.valuation_date
    const monthly = result.monthly
  
    this.store.dispatch(new SetProjectDetails(project_name,project_id,valuation_date,monthly));
    // this.router.navigate(['portal/projects'])
    
    this.toastr.success("Project"+" <b><i>"+this.myproject_name+"</i></b> successfully activated",'', {progressBar:true,enableHtml:true})
    
    let details='activated project || Project id:'+' '+localStorage.getItem('id')
    this.activate_project_audit(details)
  })
  
this.gotToPage()
  
}

gotToPage() : void {
  // something
    setTimeout(() => window.location.reload(),5200); 
}

activateProject(){

}

reloadme(){
  location.reload();
}

createProjectDB()
{
  if(this.form.value['monthly']==true){
    this.form.value['monthly']=true
  }

  else{
    this.form.value['monthly']=false
  }

  this.createProjectService.createProject(this.tenant__name,this.form.value).
  subscribe((result)=>
  {
    this.pm=result.project_name
    this.monthly=result.monthly
    localStorage.setItem('monthly',this.monthly)
    localStorage.setItem('vd',this.valuation_date)
    localStorage.setItem('id',this.my_id);
    localStorage.setItem('project_name',this.pm);
    localStorage.setItem('sd',this.form.value['start_date']);






    this.my_id=result.project_id
    console.log(result)
    this.vd=result.valuation_date
    console.log(this.form.value)  
    this.onSubmit()
  });

}
onSubmit()
    {
      var id=this.my_id;
      var body=this.form.value
      localStorage.setItem('id',id);
      localStorage.setItem('vd',this.vd);
      localStorage.setItem('project_name',this.pm);
      localStorage.setItem('sd',this.form.value['start_date']);
      this.createProjectService.upload(localStorage.getItem('tn'),id,this.form.value).
      subscribe({next:(result)=>
        {
          this.result="project successfully created";
          // this.router.navigate(['portal/projects'])
          this.toastr.success("Project"+" <b><i>"+"</i></b> successfully created",'', {progressBar:true,enableHtml:true})
          let details='created project || Project id:'+' '+localStorage.getItem('id')
          this.create_project_audit(details)
        },
      error:error=>{
      
        this.toastr.error("Project"+" <b><i>"+"</i></b> creation failed",'', {progressBar:true,enableHtml:true})
        let details='project creation failed || Project id:'+' '+localStorage.getItem('id')
        this.create_project_audit(details)
      }
      });

    }

    openUploadLink()
{

  this.router.navigate(['portal/addfiles'])
  
}

openProjectsLink(){
  this.router.navigate(['portal/projects'])
}

whenTokenExpires(){
  this.router.navigate(['/login'])
}


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     
    });
  }

// for the create project response
open2(content1:any) {
  this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => {
    
    
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
   
  });
}

  open1(activate:any) {
    this.modalService.open(activate, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => {
      
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
