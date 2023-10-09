import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { end } from '@popperjs/core';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
})
export class PortalComponent implements OnInit {
  user_id: any;
  tenant_id: any;
  i: any;

  cash = true;
  projects = true;
  rollfoward = true;
  upload_files = false;

  tenant_name: string;
  response: any;
  data_checks = false;
  cashflow_estimation = false;
  calculations = false;
  rollforward = false;
  constructor(
    private router: Router,
    private createProjectsService: CreateProjectService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.projectStatus();
  }
  admin = false;

  getUser() {
    this.createProjectsService.getUser().subscribe({
      next: (result) => {
        if (result.response == 'token expired') {
          this.router.navigate(['/login']);
        } else {
          this.admin = result.is_admin;
          this.user_id = result.user_id;
          this.tenant_name = result.tenant_name;
          console.log(result);
          this.tenant_id = result.tenant_id;
          localStorage.setItem('tn', this.tenant_name);
          localStorage.setItem('tenant_id', this.tenant_id);
          localStorage.setItem('user_id', this.user_id);
        }
      },
      error: (error) => {
        this.router.navigate(['/login']);
        console.log(error);
      },
    });
  }

  projectStatus() {
    this.createProjectsService
      .getprojectstatus(localStorage.getItem('id'))
      .subscribe((result) => {
        console.log(result);
        this.response = result;

        if (this.response.upload_files == 'completed') {
          this.upload_files = true;
        } else {
          this.upload_files = false;
        }

        if (this.response.data_checks == 'completed') {
          this.data_checks = true;
        } else {
          this.data_checks = false;
        }

        if (this.response.cashflow_estimation == 'completed') {
          this.cashflow_estimation = true;
        } else {
          this.cashflow_estimation = false;
        }

        if (this.response.calculations == 'completed') {
          this.calculations = true;
        } else {
          this.calculations = false;
        }

        if (this.response.calculations == 'completed') {
          this.calculations = true;
        } else {
          this.calculations = false;
        }

        if (this.response.rollfoward == 'completed') {
          this.rollforward = true;
        } else {
          this.rollforward = false;
        }
      });
  }

  hideCashFlows() {
    this.cash = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  ShowProjects() {
    this.projects = true;
  }

  hideProjects() {
    this.projects = false;
  }

  showCashFlows() {
    this.cash = true;
  }

  showRF() {
    this.rollfoward = true;
  }
  hideRF() {
    this.rollfoward = false;
  }
}
