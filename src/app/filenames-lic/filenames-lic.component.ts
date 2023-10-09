import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';

@Component({
  selector: 'app-filenames-lic',
  templateUrl: './filenames-lic.component.html',
  styleUrls: ['./filenames-lic.component.scss'],
})
export class FilenamesLicComponent implements OnInit {
  public page = 1;
  public pageSize = 10;
  lrcfilenames: Array<any>;
  pro_id: any;
  eb = false;
  constructor(
    private createProjectService: CreateProjectService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.lic_filenames();
    this.pro_id = localStorage.getItem('id');
  }

  licgroups: any;
  done = false;
  done1 = false;
  groups = true;
  files = false;
  lrcfilename: any;
  showFileNames() {
    this.groups = false;
    this.files = true;
  }

  showSpinner4() {
    this.done = true;
  }

  showSpinner5() {
    this.done1 = true;
  }

  hideSpinner4() {
    this.done = false;
  }

  hideSpinner5() {
    this.done1 = false;
  }
  back() {
    this.location.back();
  }

  lic_filenames() {
    let id = localStorage.getItem('id');
    this.createProjectService.lic_groupsnames(id).subscribe((result) => {
      this.licgroups = result.names;
      this.lrcfilename = result.names;
      // this.licgroupss=result.lic_groups;

      console.log(result);
    });
  }

  export_balances() {
    let id = localStorage.getItem('id');
    this.eb = true;
    this.createProjectService
      .export_lic_balance1(
        localStorage.getItem('tn'),
        localStorage.getItem('vd')
      )
      .subscribe((response) => {
        this.eb = false;

        console.log(response);
        // console.log("response")
        // this.lic_downloaded()
        let details =
          'lic opening balances successfully downloaded || Project id:' +
          ' ' +
          localStorage.getItem('id');
        this.lic_download_audit(details);

        this.hideSpinner4();
      });
  }

  lic_all_results_download() {
    this.showSpinner4();
    let id = localStorage.getItem('id');

    this.createProjectService
      .lic_all_results_download(id)
      .subscribe((response) => {
        let filename = response.headers
          .get('content-disposition')
          ?.split(';')[1]
          .split('=')[1];
        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = 'project_' + localStorage.getItem('id') + '_lic';
        console.log(filename);
        // console.log(response)
        a.href = window.URL.createObjectURL(blob);
        a.click();

        let details =
          'zipped file successfully downloaded || Project id:' +
          ' ' +
          localStorage.getItem('id');
        this.lic_download_audit(details);
        // console.log(result)
        this.hideSpinner4();
      });
  }

  single_file_download(file: any) {
    console.log('Nhaimi...................');
    this.showSpinner4();
    let id = localStorage.getItem('id');

    this.createProjectService
      .downloadfiles_lic(id, file)
      .subscribe((response) => {
        let filename = response.headers
          .get('content-disposition')
          ?.split(';')[1]
          .split('=')[1];

        let blob: Blob = response.body as Blob;
        let a = document.createElement('a');
        a.download = 'lic_' + file;
        // console.log(filename)
        // console.log(response)
        a.href = window.URL.createObjectURL(blob);
        a.click();

        // console.log("response")

        let details =
          'single file successfully downloaded || Project id:' +
          ' ' +
          localStorage.getItem('id');
        this.lic_download_audit(details);

        this.hideSpinner4();
      });
  }

  lic_download_audit(details: any) {
    let body = {
      id: '1',
      timestamp: '1',
      token: localStorage.getItem('token'),
      action: 'download lic results',
      details: details,
    };
    this.createProjectService.audit_trail(body).subscribe((result: any) => {
      console.log(result);
    });

    console.log(body);
  }
}
