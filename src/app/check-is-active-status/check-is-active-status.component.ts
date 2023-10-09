import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { AppointmentsService } from '../appointments.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CreateProjectService } from '../create-project.service';
import {} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-check-is-active-status',
  templateUrl: './check-is-active-status.component.html',
  styleUrls: ['./check-is-active-status.component.scss'],
})
export class CheckIsActiveStatusComponent implements OnInit {
  constructor(
    public createProjectService: CreateProjectService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal
  ) {}
  phone: any;
  is_active: any;
  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.createProjectService.getUser().subscribe((result) => {
      this.phone = result.phone_number;
      this.is_active = result.is_active;
      this.router.navigate(['/portal/projects']);

      if (this.is_active == true) {
        this.router.navigate(['/portal/projects']);
      } else {
        this.router.navigate(['/activate']);
      }
    });
  }
}
