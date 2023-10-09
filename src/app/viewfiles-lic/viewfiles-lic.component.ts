import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-viewfiles-lic',
  templateUrl: './viewfiles-lic.component.html',
  styleUrls: ['./viewfiles-lic.component.scss']
})
export class ViewfilesLicComponent implements OnInit {

  constructor(private createProjectService:CreateProjectService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.filename=this.route.snapshot.paramMap.get('id')+'.csv';
    this.viewFile()
  }

  
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

allfiles(){
  this.viewFile()
  this.router.navigate(['/portal/filenames_lic/'+localStorage.getItem('id')])
  

  }

viewFile(){

  this.createProjectService.viewfiles(localStorage.getItem('id'),this.filename).subscribe(result=>{
    console.log(result)
    this.single_file=result
    this.key=Object.keys(this.single_file[0])
    this.value.push(Object.values(this.single_file[0]))
  })

}

single_file_download(){
  this.showSpinner4()
  let id=localStorage.getItem('id')

  this.createProjectService.downloadfiles(id,this.filename).subscribe(response=>{
    let filename=response.headers.get('content-disposition')?.split(';')[1].split('=')[1];
    console.log(filename)
    let blob:Blob = response.body as Blob;
    let a = document.createElement('a');
    a.download='lic_'+this.filename;
    console.log(filename)
    // console.log(response)
    a.href=window.URL.createObjectURL(blob);
    a.click();

    console.log("response")
    this.lrc_downloaded()
    this.hideSpinner4()
  })
}


}
