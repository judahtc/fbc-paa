import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
})
export class CreateProjectComponent implements OnInit {
  closeResult = '';
  result: any;
  my_id: any;
  vd: any;
  user_id: any;
  myproject_name: any;
  valuation_date: any;
  monthly: string;
  tenant__name: string;
  start_date: string;
  sd: any;
  admin: boolean;
  projects: any;
  number_of_projects: any;
  prev_project_id: any;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private createProjectService: CreateProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}
  //@ts-ignore
  form: FormGroup;

  ngOnInit(): void {
    this.getProjects();
    this.user_id = localStorage.getItem('user_id');
    this.tenant__name = localStorage.getItem('tn');
    this.form = this.fb.group({
      project_name: [''],
      valuation_date: [''],
      start_date: [''],
      description: [''],
      prev_project: [''],
      monthly: [''],
      created_at: '0',
      updated_at: '0',
      project_id: '0',
      tenant_id: '0',
      user_id: localStorage.getItem('user_id'),
      closing_balances: false,
      closing_balances_lic: false,
    });
  }

  done = false;

  showSpinner4() {
    this.done = true;
  }

  hideSpinner4() {
    this.done = false;
  }

  createProjectDB() {
    if (this.form.value['monthly'] == true) {
      this.form.value['monthly'] = true;
    } else {
      this.form.value['monthly'] = false;
    }

    this.showSpinner4();
    this.createProjectService
      .createProject(this.tenant__name, this.form.value)
      .subscribe({
        next: (result) => {
          console.log(result);
          console.log(result);
          console.log(result);
          this.myproject_name = result.project_name;
          this.valuation_date = result.valuation_date;
          this.my_id = result.project_id;
          this.vd = result.valuation_date;
          this.sd = result.start_date;
          this.monthly = result.monthly;
          this.prev_project_id = result.prev_project;
          localStorage.setItem('pp_id', this.prev_project_id);
          localStorage.setItem('vd', this.valuation_date);
          localStorage.setItem('sd', this.start_date);
          localStorage.setItem('monthly', this.monthly);
          localStorage.setItem('id', this.my_id);
          localStorage.setItem('project_name', this.myproject_name);

          this.onSubmit();
        },
      });
  }

  onSubmit() {
    var id = this.my_id;
    var body = this.form.value;
    localStorage.setItem('id', id);
    localStorage.setItem('vd', this.vd);
    localStorage.setItem('sd', this.form.value['start_date']);
    console.log(this.form.value);
    this.createProjectService
      .upload(this.tenant__name, id, this.form.value)
      .subscribe((result) => {
        this.gotToPage();
        this.result = result.message;
        this.audit_create_project();
        console.log(body);
        this.hideSpinner4();
        // this.toastr.success("Files"+" <b><i>"+"</i></b> successfully uploaded",'', {progressBar:true,enableHtml:true})
      });
  }

  gotToPage(): void {
    // something
    setTimeout(() => window.location.reload(), 3200);
  }

  audit_create_project() {
    let body = {
      id: '1',
      timestamp: '1',
      token: localStorage.getItem('token'),
      action: 'create project',
      details:
        'project_successfully created || Project id:' +
        ' ' +
        localStorage.getItem('id'),
    };
    this.createProjectService.audit_trail(body).subscribe((result: any) => {
      console.log(result);
    });

    console.log(body);
  }

  getProjects() {
    if (this.admin == true) {
      this.createProjectService.getprojects_with_cb().subscribe({
        next: (result) => {
          this.projects = result;
          this.projects = this.projects.sort(
            (a: any, b: any) => b.project_id - a.project_id
          );
          this.number_of_projects = result.length;
        },

        error: (error) => {
          // alert(error.detail)
          console.log(error);
        },
      });
    } else {
      this.createProjectService.getprojects_with_cb().subscribe({
        next: (result) => {
          this.projects = result;
          this.projects = this.projects.sort(
            (a: any, b: any) => b.project_id - a.project_id
          );
          this.number_of_projects = result.length;
        },

        error: (error) => {
          // alert(error.detail)
          console.log(error);
        },
      });
    }
  }

  openUploadLink() {
    this.router.navigate(['portal/addfiles']);
  }

  openProjectsLink() {
    this.router.navigate(['portal/projects']);
  }

  reloadme() {
    location.reload();
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', size: 'md' })
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
