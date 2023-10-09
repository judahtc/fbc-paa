import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateProjectService } from '../create-project.service';
import { Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-viewfiles',
  templateUrl: './viewfiles.component.html',
  styleUrls: ['./viewfiles.component.scss']
})
export class ViewfilesComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private createProjectService:CreateProjectService,
              private router:Router,
              private location: Location
    ) { }

    filename:any;
    single_file:any;
    key:any;
    value:any;

    
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


  ngOnInit(): void {
     this.filename=this.route.snapshot.paramMap.get('id')+'.csv';
     this.viewFile()
  }

  viewFile(){

    this.createProjectService.viewfiles(localStorage.getItem('id'),this.filename).subscribe(result=>{
      this.groups=false;
      this.files=true;
      console.log(result)
      this.single_file=result
      this.key=Object.keys(this.single_file[0])
      this.value.push(Object.values(this.single_file[0]))
    })

  }

  allfiles(){
  this.viewFile()
  // this.router.navigate(['/portal/filenames/'+localStorage.getItem('id')])
  this.location.back()
  

  }

  single_file_download(){
    this.showSpinner4()
    let id=localStorage.getItem('id')
  
    this.createProjectService.downloadfiles(id,this.filename).subscribe(response=>{

      let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
      console.log(filename)
      let blob:Blob = response.body as Blob;
      let a = document.createElement('a');
      a.download=''+this.filename;
      console.log(filename)
      // console.log(response)
      a.href=window.URL.createObjectURL(blob);
      a.click();
  
      console.log(response)
      this.lrc_downloaded()
      this.hideSpinner4()
    })
  }

}
