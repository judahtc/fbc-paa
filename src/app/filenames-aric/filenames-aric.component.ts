


import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateProjectService } from '../create-project.service';
@Component({
  selector: 'app-filenames-aric',
  templateUrl: './filenames-aric.component.html',
  styleUrls: ['./filenames-aric.component.scss']
})
export class FilenamesAricComponent {
  error: any=null;
  mylength:number=null;
  // lrcfilenames:any;
  constructor(private createProjectService:CreateProjectService,
              private router:Router,
              private location:Location ) { }
  ngOnInit(): void {
    this.pro_id=localStorage.getItem('id')
    this.aric_filenames()
  }
  filename:any;
  single_file:any;
  key:any;
  value:any;
  pro_id:any;


public page=1;
public pageSize = 10;
lrcgroups:Array<any>;
lrcfilenames:Array<any>;

  
execute=true;
executed=false;

download=true;
downloaded=false;



done=false;
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
back(){
  this.location.back()
  
}


  aric_filenames(){
    let id=localStorage.getItem('id')
    this.createProjectService.aric_groups_filenames(id).subscribe(result=>{
      this.lrcfilenames=result.names;
      this.mylength=this.lrcfilenames.length
      console.log(result)
    })
  }


  
aric_all_results_download(){
  this.showSpinner4()
  let id=localStorage.getItem('id')

  this.createProjectService.aric_all_results_download(localStorage.getItem('tn'),id).subscribe({next:response=>{
    let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download='project_'+localStorage.getItem('id')+'_aric';
    console.log(filename)
    // console.log(response)
    a.href=window.URL.createObjectURL(blob);
    a.click();

    let details='zipped file successfully downloaded || Project id:'+' '+localStorage.getItem('id')
    this.lrc_download_audit(details)
    // console.log(result)
    this.lrc_downloaded()
    this.hideSpinner4()

  },error:error=>{
    let details='error downloading zip || Project id:'+' '+localStorage.getItem('id')
    this.lrc_download_audit(details)
      this.error=error
      this.hideSpinner4()
  }})
}

lrc_download_audit(details:any){
  let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'download lrc results','details':details}
      this.createProjectService.audit_trail(body).subscribe((result:any)=>{
        console.log(result)

      })

      console.log(body)
}

single_file_download(file:any){
  console.log("Nhaimi...................")
    this.showSpinner4()
  let id=localStorage.getItem('id')

  this.createProjectService.downloadfiles(id,file).subscribe(response=>{
    let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download='lrc_'+file;
    // console.log(filename)
    // console.log(response)
    a.href=window.URL.createObjectURL(blob);
    a.click();

    // console.log("response")
    this.lrc_downloaded()
    let details='single file successfully downloaded || Project id:'+' '+localStorage.getItem('id')
    this.lrc_download_audit(details)
  
    this.hideSpinner4()
  })
}

export_balances(){

  let id=localStorage.getItem('id')

  this.createProjectService.export_lrc_balance(localStorage.getItem('tn'),'1',localStorage.getItem('vd')).subscribe(response=>{
    let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download='lrc_opening_balances_project'+'_'+localStorage.getItem('id')+'.csv';
    // console.log(filename)
    // console.log(response)
    a.href=window.URL.createObjectURL(blob);
    a.click();

    // console.log("response")
    this.lrc_downloaded()
    let details='opening balances successfully uploaded || Project id:'+' '+localStorage.getItem('id')
    this.lrc_download_audit(details)
  
    this.hideSpinner4()
  })
}




}

