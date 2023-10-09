import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CreateProjectService } from '../create-project.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit{

  tkn: any;
  validaterror=false;
  validate=true


  constructor(private createProjectService:CreateProjectService,
    private router:Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private toastr:ToastrService,
    
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
  
  validated(){
    this.validaterror=false
    this.validate=true
  }


  reset(){
  
        // let email="string"
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
        // const password = "#@MySecurePassword123!";
        let password=this.form.value.password
    // let email="string"
    if(this.form.value.password==this.form.value.confirm_password)


    {
      
      
      if (passwordRegex.test(password))
  
      {this.createProjectService.reset_password(localStorage.getItem("token"),this.form.value).subscribe(result=>{
      this.activate_user1()
      this.validated()
      this.toastr.success("password successfully changed",'', {progressBar:true,enableHtml:true})
    })}
  
  else{
    this.validate_error()
    this.toastr.error("password length should not be less than 8, should include at least one lowercase character, one uppercase character, a number and a special character",'', {progressBar:true,enableHtml:true})

  }
  
  
  }


    else{
      alert("passwords do not match")
    }

  }

  activate_user1(){
    this.createProjectService.activate_user1(localStorage.getItem('token'),"body").subscribe(result=>{
      this.router.navigate(['/portal/projects'])
    })
  }
}




