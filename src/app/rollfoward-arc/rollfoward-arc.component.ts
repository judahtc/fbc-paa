import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { Router,ActivatedRoute } from '@angular/router';
import { ToastService } from '../toast.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rollfoward-arc',
  templateUrl: './rollfoward-arc.component.html',
  styleUrls: ['./rollfoward-arc.component.scss']
})
export class RollfowardArcComponent {
// lrcgroups:any;
public page=1;
public pageSize = 10;
lrcgroups:Array<any>;
lrcfilenames:Array<any>;
myerror: any=null;
me:any;


semantic: any=null;
semantic1: any=null;
showerror=false;
  outing: any;
  urebu: number=null;
  


  constructor(private createProjectService:CreateProjectService,
              private router:Router,
              private toastr:ToastrService


              ) { }

  ngOnInit(): void {
    this.me=this.myerror
    this.lrc_groups()

  }


  execute=true;
  executed=false;

  download=true;
  downloaded=false;



  done=false;
  done1=false;
  clicked = true;

  groups=true;
  files=false;


  
lrc_downloaded(){
  this.download=false
  this.downloaded=true
}


lrc_executed(){
  this.execute=false
  this.executed=true
}



  showSpinner4(){
    this.done=true;
  }

  showSpinner5(){
    this.done1=true;
  }

  hideSpinner4(){
    this.done=false;
  }

  hideSpinner5(){
    this.done1=false;
  }


  lrc_groups(){
    let id=localStorage.getItem('id')
    this.createProjectService.lrc_groups(id).subscribe({
      
      next:(result)=>{
      this.lrcgroups=result.lrc_groups;
      console.log(result)
      this.urebu=this.lrcgroups.length
      this.showerror=false;
        console.log(this.semantic)
    },

    error:error=>{
      this.semantic=error
      console.log(error)
      this.outing=error.error.detail
      
    } }
)
  }

  lrc_filenames(){
    let id=localStorage.getItem('id')
    this.createProjectService.arc_groups_filenames(id).subscribe(result=>{
      this.lrcfilenames=result.names;
      console.log(result)
    })
  }

  showFileNames(){
    this.router.navigate(['/portal/filenames-arc/'+localStorage.getItem('id')])
  }

  

  calculateAll_lrc(){
    this.showSpinner5()
    let vd=localStorage.getItem('vd')
    let id=localStorage.getItem('id')
    let sd=localStorage.getItem('sd')

      this.createProjectService.arc_all_groups_execution(id,vd,sd).subscribe({next:result=>{
        console.log(result)
        this.hideSpinner5()
        this.lrc_executed()
        this.clicked=false
        this.showFileNames()
        this.executed_all()
        this.toastr.success("arc calculated successfully",'', {progressBar:true,enableHtml:true})


        let details="lrc successfully executed || Project id:"+' '+localStorage.getItem('id')
        this.lrc_audit(details)
        // this.lrc_filenames()
      },
    
    
    error:error=>{
      let details="lrc execution failed || Project id:"+' '+localStorage.getItem('id')
      this.lrc_audit(details)
      if(error){
      this.hideSpinner5()

}     
console.log(error);
this.toastr.error('lrc calculated failed, please check you valuation date and execute again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})

    }
    })
      
}


lrc_audit(details:any){
  let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'execute lrc','details':details}
      this.createProjectService.audit_trail(body).subscribe((result:any)=>{
        console.log(result)

      })

      console.log(body)
}
showSuccess() {
  this.toastr.success('Hello world!', 'Toastr fun!');
}

executed_all(){
  this.createProjectService.rollforward(localStorage.getItem('id')).subscribe(result=>{
    
    console.log("done")
  })
}


lrc_all_results_download(){
  this.showSpinner4()
  let id=localStorage.getItem('id')

  this.createProjectService.lrc_all_results_download(localStorage.getItem('tn'),id).subscribe({next:(response)=>{
    let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download='project_'+localStorage.getItem('id')+'_lrc';
    console.log("filename")
    a.href=window.URL.createObjectURL(blob);
    a.click();
    this.lrc_downloaded()
    this.hideSpinner4()
  },

  error:(error)=>{
    this.semantic1=error
    console.log(error.error.error.detail)
    this.outing=error.error.detail
  }
  
  })
}

}
