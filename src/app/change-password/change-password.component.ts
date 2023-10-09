import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CreateProjectService } from '../create-project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  tkn: any;
  validate=true
  validaterror=false


  constructor(private createProjectService:CreateProjectService,
    private router:Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastrService,

    
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

  validate_error(){
    this.validaterror=true
    this.validate=false
  }
  redirect(){
    this.router.navigate(['/portal/projects'])
  }
  validated(){
    this.validaterror=false
    this.validate=true
  }




  reset(){
  

    // let email="string"
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
    // const password = "#@MySecurePassword123!";
    let password=this.form.value.password
    if(this.form.value.password==this.form.value.confirm_password)
    {
      if (passwordRegex.test(password))
  
{      this.createProjectService.reset_password(localStorage.getItem("token"),this.form.value).subscribe(result=>{
      // this.toastr.success("lrc calculated successfully",'', {progressBar:true,enableHtml:true})
      let details='password successfully changed||'+localStorage.getItem('user_id')
      this.change_password_audit(details)
      this.toastr.success("password successfully changed",'', {progressBar:true,enableHtml:true})


    })}
  else {
    console.log(passwordRegex.test(password))
    console.log(passwordRegex.test(password))
    console.log(passwordRegex.test(password))
    console.log(passwordRegex.test(password))
    console.log(passwordRegex.test(password))
    
    this.toastr.error("password length should not be less than 8, should include at least one lowercase character, one uppercase character, a number and a special character",'', {progressBar:true,enableHtml:true})


  }
  }

    else{
      this.toastr.error("password Password do not match",'', {progressBar:true,enableHtml:true})

    }

  }

  change_password_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'change password','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }


}



