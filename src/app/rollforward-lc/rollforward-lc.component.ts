import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CreateProjectService } from '../create-project.service';

@Component({
  selector: 'app-rollforward-lc',
  templateUrl: './rollforward-lc.component.html',
  styleUrls: ['./rollforward-lc.component.scss']
})
export class RollforwardLcComponent implements OnInit {
// lcgroups:any;
public page=1;
public pageSize = 10;
lcfilenames:any;
lcgroups:Array<any>;
  myerror: any=null;
  mylenghth:number=null;

  constructor(private createProjectService:CreateProjectService,
              private route:ActivatedRoute,
              private router: Router,
              private toastr:ToastrService        
    ) { }

  ngOnInit(): void {
    this.lc_groups()
  }
  
  done=false;

  showSpinner4(){
    this.done=true;
  }

  hideSpinner4(){
    this.done=false;
  }

  execute=true;
  executed=false;

  download=true;
  downloaded=false;




  done1=false;
  clicked = true;

  groups=true;
  files=false;

  showFileNames(){
    this.groups=false;
    this.files=true;
  }

  
lrc_downloaded(){
  this.download=false
  this.downloaded=true
}


lrc_executed(){
  this.execute=false
  this.executed=true
}





  showSpinner5(){
    this.done1=true;
  }



  hideSpinner5(){
    this.done1=false;
  }



  lc_groups(){
    let id=localStorage.getItem('id')
    this.createProjectService.lc_groups(id).subscribe({next:result=>{
      this.lcgroups=result.lc_groups;
      console.log(result)
      this.mylenghth=this.lcgroups.length
    },
  error:error=>{
    this.myerror=error
  }
  })


  }

  showfileNames(){
    this.router.navigate(['/portal/filenames_lc/'+localStorage.getItem('id')])
  }


  lc_filenames(){
    let id=localStorage.getItem('id')
    this.createProjectService.lc_groups_filenames(id).subscribe(result=>{
      this.lcfilenames=result.names;
      console.log(result)
    })
  }


  calculateAll_lc(){
    this.showSpinner5()
    let vd=localStorage.getItem('vd')
    let id=localStorage.getItem('id')
    let sd=localStorage.getItem('sd')

      this.createProjectService.lc_all_groups_execution(id,vd,sd).subscribe({next:result=>{
        console.log(result)
        this.hideSpinner5()
        this.lrc_executed()
        this.clicked=false
        this.showFileNames()
        this.done1=false;
        this.toastr.success("lrc calculated successfully",'', {progressBar:true,enableHtml:true})
        this.showfileNames()
        
        let details="lc successfully executed || Project id:"+' '+localStorage.getItem('id')
        this.lc_audit(details)
      },
    
    
      error:error=>{
        let details="lc execution failed || Project id:"+' '+localStorage.getItem('id')
        this.lc_audit(details)
        if(error){
        this.hideSpinner5()
  
  }      
  this.toastr.error('lic calculated failed, please check you valuation date and execute again','', {progressBar:true,enableHtml:true,disableTimeOut:true,progressAnimation:'increasing'})
      }})
      
}


lc_audit(details:any){
  let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'execute lc','details':details}
      this.createProjectService.audit_trail(body).subscribe((result:any)=>{
        console.log(result)

      })

      console.log(body)
}



lc_all_results_download(){
  this.showSpinner4()
  let id=localStorage.getItem('id')

  this.createProjectService.lc_all_results_download(id).subscribe(response=>{
    let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download='project_'+localStorage.getItem('id')+'_lc';
    console.log(filename)
    // console.log(response)
    a.href=window.URL.createObjectURL(blob);
    a.click();

    // console.log(result)
    this.lrc_downloaded()
    this.hideSpinner4()
  })
}

  calculateAll(){
    this.showSpinner4()
    let vd=localStorage.getItem('vd')
    let id=localStorage.getItem('id')

    for (let group of this.lcgroups) {
      this.createProjectService.lc_groups_execution(id,vd,group).subscribe(result=>{
        
      })

  }
      this.lc_jounal_entries()
}




lc_jounal_entries(){


  let id=localStorage.getItem('id')
  for (let group of this.lcgroups) {
    this.createProjectService.lc_jounal_entries(id,group).subscribe(result=>{
      
      console.log(result)
    })
}
this.lc_jounal_entries_download()
}

lc_jounal_entries_download(){
  let id=localStorage.getItem('id')

  this.createProjectService.lc_jounal_entries_download(id).subscribe(result=>{
    window.location.href=result.zipped_file;
    console.log(result)
    this.hideSpinner4()
  })
}

}
