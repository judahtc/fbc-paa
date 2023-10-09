import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CreateProjectService } from '../create-project.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    //@ts-ignore
    form:FormGroup;
  position:any = null;
  closeResult:any;
  content:any;
  response: any;
  not_found=false;
  notfound:any;
  user_exist=false;
  tenantpassword=false;
  userexist: any;
  user_added=false;
  added: string;
  add=false
  password_response: any;
  passwordnotmatchin: string;
  pnm=false;

  constructor(private modalService:NgbModal,
    private createProjectService:CreateProjectService,
                      private fb:FormBuilder,
                      private toastr:ToastrService
                      ) { }

  ngOnInit(): void {
    this.form =this.fb.group(
      {
        email:[''],
        password:[''],
        confirm_password:[''],
        first_name:[''],
        last_name:[''],
        tenant_id:[''],
        work_address:[''],
        phone_number:[''],
        tenant_password:['']


        
      }
    );

  }

  add_user_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'add user','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }


  isValidInput(input: string): boolean {
    return /^\+263\d{9}$/.test(input);
  }
  
  


  onsubmit(){
    const isValidInput: boolean = this.isValidInput(this.form.value['phone_number']);
    if(isValidInput){
    this.add=true
    console.log(this.form.value)
    let inputs=this.form.value
    let inputs1=this.form.value
    
    inputs1['token']=localStorage.getItem('token')
    inputs1['url']='claxonactuaries-ifrs17.com'
    console.log(inputs1)

    this.createProjectService.signup(inputs1).subscribe({next:result=>{
      this.add=false
      console.log(this.form.value)
      this.response=result.response
      let text="tenant does not exist"
      let text1="user already exist"
      let text3="Incorrect tenant password"
      let text4="New user's email domain does not match with the registrar's domain."
      console.log(result)
      if(this.response==text){
        this.not_found=true

        this.notfound=this.response
        this.toastr.error(text,'', {progressBar:true,enableHtml:true})
        // console.log(result.response)
      }

      else if(this.response==text1){
        let details="user aleady exist || user email:"+' '+this.form.value['email']
        this.add_user_audit(details)
        this.user_exist=true
        this.not_found=false;
        this.tenantpassword=false
        this.userexist=this.response
        this.toastr.error(text1,'', {progressBar:true,enableHtml:true})

        // console.log(result.response)
      }

      else if(this.response==text3){
        this.tenantpassword=true
        this.not_found=false;
        this.user_exist=false

        this.password_response=text3
        // console.log(result.response)
      }

      else if(this.response==text4){
        this.tenantpassword=false
        this.not_found=false;
        this.user_exist=false

        this.toastr.error(text4,'', {progressBar:true,enableHtml:true})
        // console.log(result.response)
      }




      else{
          this.user_added=true;
          this.user_exist=false;
          this.tenantpassword=false;
          let details="user successfully added || user email:"+' '+this.form.value['email']
          this.add_user_audit(details)
          this.not_found=false;
          this.toastr.success("user"+" <b><i>"+"</i></b> successfully added",'', {progressBar:true,enableHtml:true})

          this.added="user successfully registered"
      }

      

    },error:error=>{
      this.user_added=true;
      this.toastr.error("invalid input",'', {progressBar:true,enableHtml:true})
      this.add=false

    }
  
  
  })

}else{
  this.toastr.error("please follow the phone number format required",'', {progressBar:true,enableHtml:true})
}
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',size: 'sm'}).result.then((result) => {
      
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     
    });
  }


  open1(notfound1:any) {
    this.modalService.open(notfound1, {ariaLabelledBy: 'modal-basic-title',size: 'md'}).result.then((result) => {
      
      
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
