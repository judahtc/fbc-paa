import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as CVS from 'csv';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProjectService } from '../create-project.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss'],
})
export class AddFileComponent implements OnInit {
  //@ts-ignore
  results: any;
  message = false;
  monthly: any;
  form: FormGroup;
  csvData: any;
  file: File = null;
  clicked = false;
  notClicked = true;
  dataChecks = false;
  name: any;
  result: any;
  closeResult = '';
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(localStorage.getItem('token')),
    }),
  };
  response: any;
  done: boolean;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private createProjectService: CreateProjectService,
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.done = true;

    this.form = this.fb.group({
      files: [''],
    });
  }
  onjulo() {
    const fd = new FormData();

    console.log(fd);
  }

  data_checks() {
    this.router.navigate(['portal/data-checks']);
  }

  onSubmit() {
    let headers = new HttpHeaders();
    headers.set('Accept', 'multipart/form-data');
    this.monthly = localStorage.getItem('monthly');
    console.log(this.monthly);
    const formData = new FormData();
    this.clicked = true;
    this.notClicked = false;

    for (let i = 0; i < this.name.length; i++) {
      formData.append('files', this.name[i]);
    }

    var id = localStorage.getItem('id');
    var tenant_name = localStorage.getItem('tn');

    this.http
      .post(
        `https://backend.claxon-ifrs17.com/uploadfiles/${tenant_name}/${id}`,
        formData,
        { headers }
      )
      .subscribe({
        next: (result) => {
          this.done = false;
          this.message = true;
          this.clicked = false;
          this.dataChecks = true;
          this.results = result;
          this.result = this.results.responses;
          console.log(this.results.responses);
          let details =
            'monthly project files successfully uploaded || Project id:' +
            ' ' +
            localStorage.getItem('id');
          this.add_files_audit(details);
          this.toastr.success(
            'Files' + ' <b><i>' + '</i></b> successfully uploaded',
            '',
            { progressBar: true, enableHtml: true }
          );
          this.files_added();
        },
        error: (error) => {
          let details =
            'incorrect filenames || Project id:' +
            ' ' +
            localStorage.getItem('id');
          this.add_files_audit(details);
          this.toastr.error(
            'Error uploading the files' +
              ' <b><i>' +
              '</i></b> ,please select all files and try again',
            '',
            { progressBar: true, enableHtml: true }
          );
          console.log(error);
        },
      });
  }
  add_files_audit(details: any) {
    let body = {
      id: '1',
      timestamp: '1',
      token: localStorage.getItem('token'),
      action: 'upload files',
      details: details,
    };
    this.createProjectService.audit_trail(body).subscribe((result: any) => {
      console.log(result);
    });

    console.log(body);
  }

  ReadExcel(event: any) {
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;
      this.csvData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      this.name = event.target.files;
    };
  }

  files_added() {
    this.createProjectService
      .added_files(localStorage.getItem('id'))
      .subscribe((result) => {
        // window.location.reload()
        console.log('done');
      });
  }
  gotToPage(): void {
    // something
    setTimeout(() => window.location.reload(), 5200);
  }

  reloadme() {
    location.reload();
  }
  openUploadLink() {
    this.router.navigate(['portal']);
    this.router.navigate(['portal/projects']);
  }
  // readme(){
  //   this.http.get('assets/Maze1.txt', { responseType: 'text' })
  //     .subscribe(data => console.log(data));
  // }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'xl' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  open1(content1: any) {
    this.modalService
      .open(content1, { ariaLabelledBy: 'modal-basic-title', size: 'sm' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
