import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateProjectService } from '../create-project.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filenames-lc',
  templateUrl: './filenames-lc.component.html',
  styleUrls: ['./filenames-lc.component.scss']
})
export class FilenamesLcComponent implements OnInit {
  // lcfilenames:any;
  pro_id:any;
  constructor(private createProjectService: CreateProjectService,
              private router: Router,
              private route:ActivatedRoute,
              private location:Location
    ) { }

  ngOnInit(): void {
    this.lc_filenames()
    this.pro_id=localStorage.getItem('id')
  }

  public page=1;
public pageSize = 10;
lcfilenames:any;
lcgroups:Array<any>;

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


  
  lc_filenames(){
    let id=localStorage.getItem('id')
    this.createProjectService.lc_groups_filenames(id).subscribe(result=>{
      this.lcfilenames=result.names;
      console.log(result)
    })
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
      let details='zipped file successfully downloaded || Project id:'+' '+localStorage.getItem('id')
      this.lc_download_audit(details)
    })
  }

  
back(){
  this.location.back()
  
}
  single_file_download(file:any){
    console.log("Nhaimi...................")
      this.showSpinner4()
    let id=localStorage.getItem('id')
  
    this.createProjectService.downloadfiles_lc(id,file).subscribe(response=>{
      let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      
      let blob:Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download='lc_'+file;

      a.href=window.URL.createObjectURL(blob);
      a.click();
  


      let details='single file successfully downloaded || Project id:'+' '+localStorage.getItem('id')
      this.lc_download_audit(details)
    
      this.hideSpinner4()
    })
  }
  
  lc_download_audit(details:any){
    let body={'id':'1','timestamp':'1','token':localStorage.getItem('token'),'action':'download lc results','details':details}
        this.createProjectService.audit_trail(body).subscribe((result:any)=>{
          console.log(result)
  
        })
  
        console.log(body)
  }

}
