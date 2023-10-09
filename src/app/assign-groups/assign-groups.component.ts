import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Data } from 'popper.js';
import { CreateProjectService } from '../create-project.service';

@Component({
  selector: 'app-assign-groups',
  templateUrl: './assign-groups.component.html',
  styleUrls: ['./assign-groups.component.scss']
})
export class AssignGroupsComponent implements OnInit {
  result:any;
  project_name:any;
  table:any;
  key:any[];
  error: any=null;
  constructor(private createProjectService:CreateProjectService,
              private toastr:ToastrService
    ) { }
  idname:any;
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
    this.createProjectService.assign_groups(id).subscribe({next:(result)=>{
    this.hideSpinner4()
    this.button=false

      this.result="location: "+ '"'+result.policy_schedule+'"'
      this.table=result.result
      this.key=Object.keys(this.table[0])
      let details='groups successfully assigned || Project id:'+' '+localStorage.getItem('id')
      this.groups_audit(details)

    },
    error:error=>{
      this.error=error;
      this.toastr.error('calculations failed, please check you data uploads and try again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})
      let details='groups assignment failed || Project id:'+' '+localStorage.getItem('id')
      this.groups_audit(details)
      if(this.error!=null){
        this.showme=false;
        this.done=false;
      }
    }})
  }

  groups_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'assigning groups','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }


}
