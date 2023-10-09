import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CreateProjectService } from '../create-project.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  tkn: any;

  constructor(private createProjectService:CreateProjectService,
    private router:Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    
    
    private modalService:NgbModal) { }
 //@ts-ignore
 form:FormGroup;
//  value:any=null
  ngOnInit(): void {
    this.tkn=this.router.url
  

    this.tkn=this.tkn.split("___").pop()
    console.log(this.tkn)
    this.form =this.fb.group(
      {
        password:[''],
        confirm_password:[''],
      }
    );


  }

  forgot_password_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'reset password','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }

  reset(){
  

    // let email="string"
    if(this.form.value.password==this.form.value.confirm_password)
    {this.createProjectService.reset_password(this.tkn,this.form.value).subscribe(result=>{
      let details='password successfully reset'
      this.reset_password_audit(details)
      alert(result.response)

    })}

    else{
      alert("passwords do not match")
    }

  }



  reset_password_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'password reset','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }
  
}
