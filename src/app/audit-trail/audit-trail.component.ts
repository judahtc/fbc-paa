
import { CreateProjectService } from '../create-project.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms'
// import { AppointmentsService } from '../appointments.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CreateProjectService } from '../create-project.service';
import {  } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: ['./audit-trail.component.scss']
})
export class AuditTrailComponent {
 body={
  'start_date':'2023-03-16T00:00:00.000000',
  'end_date':'2023-06-16T00:00:00.000000'
 }


  constructor(

    private createProjectService:CreateProjectService,
    private fb:FormBuilder,

    
    ) { }
//@ts-ignore
 form:FormGroup;
  ngOnInit(): void {

    this.form =this.fb.group(
      {
        start_date:[''],
        end_date:[''],
      }
    );
  }
  

  // audit(){
  //   this.createProjectService.extract_logs(this.body).subscribe(result=>{
  //     console.log(result)

  //   })
  // }

  // audit1(){
  //   this.createProjectService.extract_logs1().subscribe(result=>{
  //     console.log(result)

  //   })
  // }



  audit(){

    console.log(this.form.value)
    // this.showSpinner4()
    let id=localStorage.getItem('id')

    let body=this.form.value
    body['token']=localStorage.getItem('token')
  
    this.createProjectService.extract_logs(body).subscribe({next:(response)=>{
      console.log(body)
      let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      let blob:Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download='audit_trail_'+this.form.value['start_date']+'_to_'+this.form.value['end_date'];
      console.log("filename")
      a.href=window.URL.createObjectURL(blob);
      a.click();

    },
  
    error:(error)=>{
      // this.semantic1=error
            console.log(error)
      // this.outing=error.error.detail
    }
    
    })
  }
}
