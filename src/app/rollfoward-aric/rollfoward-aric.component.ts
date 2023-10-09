import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { Router, ParamMap,ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rollfoward-aric',
  templateUrl: './rollfoward-aric.component.html',
  styleUrls: ['./rollfoward-aric.component.scss']
})
export class RollfowardAricComponent implements OnInit {
public page=1;
public pageSize = 10;
licgroups:Array<any>;
  error: any=null;
  mylength: number=null;
 
  // licgroupss:any;
  constructor(private createProjectService:CreateProjectService,
              private router:Router,
              private route: ActivatedRoute,
              private toastr:ToastrService

    ) { }

  ngOnInit(): void {
    this.lic_groups()
  }
  done=false;
  done1=false;
  groups=true;
  files=false;
  lrcfilename:any;
  showFileNames(){
    this.groups=false;
    this.files=true;
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

  lic_groups(){
    
    let id=localStorage.getItem('id')
    this.createProjectService.lic_groups(id).subscribe({next:result=>{
      this.licgroups=result.lic_groups;
      // this.licgroupss=result.lic_groups;
      this.mylength=this.licgroups.length
      console.log(result)
    },
  
  error:error=>{
    this.error=error
  }
  })

  }

  showfileNames(){
    this.router.navigate(['/portal/filenames-aric/'+localStorage.getItem('id')])
  }


  lic_filenames(){
    
    let id=localStorage.getItem('id')
    this.createProjectService.lic_groupsnames(id).subscribe(result=>{
      this.licgroups=result.names;
      this.lrcfilename=result.names;
      // this.licgroupss=result.lic_groups;
      
      console.log(result)
    })

  }




  
  calculateAll_lic(){
    this.showSpinner5()
    let vd=localStorage.getItem('vd')
    let id=localStorage.getItem('id')
    let sd=localStorage.getItem('sd')

      this.createProjectService.aric_all_groups_execution(id,vd,sd).subscribe({next:result=>{
        console.log(result)
        this.hideSpinner5()
        // this.lic_filenames()
        let details ='lic successfully executed || Project id:'+' '+localStorage.getItem('id')
        this.lic_audit(details)
        this.toastr.success("lic calculated successfully",'', {progressBar:true,enableHtml:true})
        this.showfileNames()
  
      },
    
    
      error:error=>{
        if(error){
          console.log(error)
        this.hideSpinner5()
  
  }      
  let details ='lic execution failed || Project id:'+' '+localStorage.getItem('id')
  this.lic_audit(details)
  this.toastr.error('lic calculated failed, please check you valuation date and execute again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})

      }})
      
}

lic_audit(details:any){
  let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'execute lic','details':details}
      this.createProjectService.audit_trail(body).subscribe((result:any)=>{
        console.log(result)

      })

      console.log(body)
}



lic_all_results_download(){
  this.showSpinner4()
  let id=localStorage.getItem('id')

  this.createProjectService.lic_all_results_download(id).subscribe(response=>{
    let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download='project_'+localStorage.getItem('id')+'_lic';
    console.log(filename)
    // console.log(response)
    a.href=window.URL.createObjectURL(blob);
    a.click();

    // console.log(result)
    this.hideSpinner4()
  })
}


 calculateAll(){
    this.showSpinner4()
    let vd=localStorage.getItem('vd')
    let id=localStorage.getItem('id')
    for (let group of this.licgroups) {
      this.createProjectService.lic_groups_execution(id,vd,group).subscribe(result=>{
        console.log(result)
      })

  }

this.lic_jounal_entries()
      
}



//  ra(){

//   let vd=localStorage.getItem('vd')
//   let id=localStorage.getItem('id')
//   let grouplist=this.licgroupss
  
//   for (let groups of grouplist) {
//     this.createProjectService.ra_groups_execution(id,vd,groups).subscribe(result=>{
      
//       console.log(result)
      
//     })

// }

// this.lic_jounal_entries()
    
// }



lic_jounal_entries(){


  let id=localStorage.getItem('id')
  for (let group of this.licgroups) {
    this.createProjectService.lic_jounal_entries(id,group).subscribe(result=>{
      
      console.log(result)
    })
}
 this.lic_jounal_entries_download()
}

lic_jounal_entries_download(){
  let id=localStorage.getItem('id')

  this.createProjectService.lic_jounal_entries_download(id).subscribe(result=>{
    window.location.href=result.zipped_file;
    console.log(result)
    this.hideSpinner4()
  })
}


}
