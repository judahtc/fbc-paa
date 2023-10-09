import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
user:any;
table=true
is_admin: any;



  public page=1;
  public pageSize = 8;
  public AppointmentsModel:any;
  users:Array<any>;
  all_users:any;

  result: Object;
  number_of_projects: any;
  constructor(private modalService:NgbModal,
              private createProjectService:CreateProjectService,
              private fb:FormBuilder,
              private fb1:FormBuilder,
              private toastr:ToastrService) { }
  userfound=false;
  usernotfound=false;
    //@ts-ignore
    form:FormGroup;
  response:any;
  closeResult:any;
  email:any;
  first_name:any;
  last_name:any;
  phone_number:any;
  work_address:any;

  

  ngOnInit(): void {
    this.get_all_users()
    this.form =this.fb.group(
      {

        email:[''],
        first_name:[''],
        last_name:[''],
        phone_number:[''],
        work_address:['']

       
 
      }
    );



  }

  get_user_by_email(){
    const emailadress = document.getElementById('emails') as HTMLInputElement | null;
    this.createProjectService.get_user_by_email(emailadress.value).subscribe(result=>{

      if (result.response=='user does not exist '){
        console.log("result")
        console.log("result")
        console.log("result")
        console.log("result")
        console.log("result")
        console.log("result")
        console.log("result")
        this.response="user not found";
        // this.usernotfound=true;
        // this.userfound=false
        let details="user not found || user email:"+' '+emailadress.value
        this.manage_user_audit(details)
        this.toastr.error('user does not exist','', {progressBar:true,enableHtml:true})

      }
      else{
      this.table=false
      
      let details="navigated user || user email:"+' '+emailadress.value
      this.manage_user_audit(details)

      this.user=result
      console.log(this.user)
      this.email=result.email
      this.first_name=result.first_name
      this.last_name=result.last_name
      this.phone_number=result.phone_number
      this.work_address=result.work_address
      this.is_admin=result.is_admin


      this.userfound=true;
      this.usernotfound=false;
   } })
  }

  makeAdmin(){

    let body={
      "is_admin": true
    }

    this.createProjectService.makeAdmin(this.email,body).subscribe(result=>{
      let details="user successfully made admin || user email:"+' '+this.email
      this.toastr.success("user successfully made an admin")

      this.manage_user_audit(details)
      console.log(this.form.value)
    })

    console.log(this.form.value)
    console.log("trevor")


  }

  removeAdmin(){

    let body={
      "is_admin": false
    }

    this.createProjectService.makeAdmin(this.email,body).subscribe(result=>{
      let details="user successfully removed from the admin role || user email:"+' '+this.email
      this.toastr.success("user successfully removed from the admin role")
      this.manage_user_audit(details)
      console.log(this.form.value)
    })

    console.log(this.form.value)
    console.log("trevor")


  }

  
  get_user_by_email1(email:any){
    const emailadress = email
    this.createProjectService.get_user_by_email(emailadress).subscribe(result=>{

      if (result.response=='user does not exist '){
        
        let details="user not found || user email:"+' '+emailadress
        this.manage_user_audit(details)
        this.toastr.error('user does not exist','', {progressBar:true,enableHtml:true})
        console.log(result)
        this.response="user not found";
        this.usernotfound=true;
        this.userfound=false
        this.is_admin=result.is_admin



      }
      else{

        let details="navigated user || user email:"+' '+email
        this.manage_user_audit(details)

      this.table=false
      
      console.log(emailadress.value)
      this.user=result
      console.log(this.user)
      this.email=result.email
      this.first_name=result.first_name
      this.last_name=result.last_name
      this.phone_number=result.phone_number
      this.work_address=result.work_address
      this.userfound=true;
      this.usernotfound=false;
      this.is_admin=result.is_admin

   } })
  }

  manage_user_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'manage users','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }


  get_all_users(){
       
    this.createProjectService.all_users().subscribe({next:(result)=>{
      this.result=result
      this.all_users=result
      this.users=this.all_users
      this.number_of_projects=this.users.length

    },error:error=>{
      console.log(error)
    }})

  }


  editUser(){
    this.createProjectService.update_user_by_email(this.email,this.form.value).subscribe(result=>{
      let details="user successfully edited || user email:"+' '+this.email
      this.manage_user_audit(details)
      console.log(this.form.value)
    })

    console.log(this.form.value)
    console.log("trevor")


  }

  delete_user(){
    this.createProjectService.delete_user_by_email(this.email).subscribe(result=>{
      let details="user successfully deleted || user email:"+' '+this.email
      this.manage_user_audit(details)
      console.log(result)
    })

  }

  reloadme(){
    location.reload()
  }


  
  open(edituser:any) {
    this.modalService.open(edituser, {ariaLabelledBy: 'modal-basic-title',size: 'lg'}).result.then((result) => {
      
      
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
     
    });
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
}}
