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
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // baseurl1 = 'http://localhost:8000/customers/login';
  closeResult = '';

  response: any;
  response1: any;
  response2: any;
  add = false;
  auth = true;
  delayTime: number = 3000; // 5000 milliseconds = 5 seconds
  //@ts-ignore
  form: FormGroup;

  modalReference: any = null;

  @ViewChild('content', { static: false }) private content: any;
  counter: number;
  phone: any;
  is_active: any;
  timeLeft: number;

  constructor(
    public createProjectService: CreateProjectService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private encryptionService: EncryptionService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('inittkn', '');
    this.retrieveData();
    this.auth = true;
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  respo = false;
  showdiv() {
    this.respo = true;
  }

  saveData(dataToEncrypt: any) {
    // const dataToEncrypt = 'Sensitive information';
    const encryptedData = this.encryptionService.encrypt(dataToEncrypt);
    localStorage.setItem('inittkn', encryptedData);

    let decrypted = this.retrieveData();
    this.retrieveData();
  }

  retrieveData(): string | null {
    const encryptedData = localStorage.getItem('inittkn');
    if (encryptedData) {
      const decryptedData = this.encryptionService.decrypt(encryptedData);
      return decryptedData;
    } else {
      return null; // Return null if there's no encrypted data to retrieve
    }
  }

  forgotPassword() {
    const emailadress = document.getElementById(
      'email'
    ) as HTMLInputElement | null;

    const body = {
      email: [emailadress.value],
    };
    this.createProjectService.forgotPassword(body).subscribe((result) => {
      let details = 'password reset request||' + emailadress.value;
      this.reset_password_audit(details);
      if (
        result.response == 'password reset link successfully sent to your email'
      ) {
        this.toastr.success(result.response, '', {
          progressBar: true,
          enableHtml: true,
        });
      } else {
        this.toastr.error(result.response, '', {
          progressBar: true,
          enableHtml: true,
        });
      }
    });
  }

  // get_id(content1:any){
  // this.content1 = document.getElementById('otp') as HTMLInputElement | null;
  // this.otp=content1
  //   }

  onSubmit() {
    this.retrieveData();
    this.add = true;
    this.createProjectService.login(this.form.value).subscribe({
      next: (res) => {
        this.response = res.response;
        this.saveData(res.access_token);

        // localStorage.setItem('token', res.access_token);

        if (res.response == 'User not found') {
          this.response1 = 'User not found';
          this.add = false;

          this.showdiv();
        } else if (res.response == 'Incorrect password') {
          this.response1 = 'Incorrect password';
          let email = this.form.value['email'];
          this.add = false;

          this.audit_login1(email);
          this.showdiv();
        } else if (
          res.response == 'Engine can only be accessed between 8am and 5pm.'
        ) {
          let email = this.form.value['email'];
          this.add = false;

          this.audit_login1(email);

          this.toastr.error(
            'Engine can only be accessed between 8am and 5pm.',
            '',
            { progressBar: true, enableHtml: true }
          );
        } else if (res.response == 'successfully logged in') {
          // comment here to use sms based otp
          this.send_otp();

          // comment the following to use sms based otp
          // this.phone = res.phone;
          // this.is_active = res;
          // this.phone = this.phone.slice(-4);
          // console.log(res);
          // this.modalService.open(this.content);

          this.respo = false;

          this.startTimer();
          this.audit_login();
          // this.router.navigate(['/check_is_active'])
        }
      },
      error: (error) => {
        this.add = false;
        this.response1 = 'Network error';
      },
    });

    this.redirect();
  }

  send_otp() {
    setTimeout(() => {
      this.getOTP();
      this.modalService.open(this.content);
      this.add = false;
    }, this.delayTime);
  }

  audit_login1(email: any) {
    let body = {
      id: '1',
      timestamp: '1',
      email_address: email,
      action: 'login',
      details: 'login_failed',
      token: this.retrieveData(),
    };
    this.createProjectService
      .audit_trail_before_login(body)
      .subscribe((result: any) => {});
  }

  audit_login() {
    let body = {
      id: '1',
      timestamp: '1',
      token: this.retrieveData(),
      action: 'login',
      details: 'login_successful',
    };
    this.createProjectService.audit_trail(body).subscribe((result: any) => {});
  }

  startTimer() {
    this.timeLeft = 30;
    setInterval(() => {
      if (this.timeLeft > 1) {
        this.timeLeft--;

        // console.log(this.timeLeft);
      } else {
        this.timeLeft = 0;
      }
    }, 1000);
  }

  reset_password_audit(details: any) {
    const emailadress1 = document.getElementById(
      'email'
    ) as HTMLInputElement | null;
    let body = {
      id: '1',
      timestamp: '1',
      email_address: emailadress1.value,
      action: 'reset password',
      details: details,
    };
    this.createProjectService
      .audit_trail_before_login(body)
      .subscribe((result: any) => {});
  }

  check_otp() {
    this.timeLeft = 0;
    let otp = document.getElementById('otp') as HTMLInputElement | null;
    this.createProjectService.check_otp(otp.value).subscribe({
      next: (result) => {
        this.retrieveData();
        if (result.response == 'Authenticated') {
          this.retrieveData();
          localStorage.setItem('token', result.token);
          console.log(result);
          console.log(result);
          console.log(result);
          console.log(result);
          console.log(result);
          console.log(result);
          console.log(result);
          this.router.navigate(['/check_is_active']);
          this.modalService.dismissAll();
        } else {
          alert(result.response);
        }
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  getOTP() {
    this.createProjectService.multifactorauth().subscribe((result) => {});
  }

  // getUser() {
  //   this.createProjectService.getUser_login().subscribe({
  //     next: (result) => {
  //       this.phone = result.phone_number;
  //       this.is_active = result;
  //       this.phone = this.phone.slice(-4);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     },
  //   });
  // }

  getUser1() {
    this.createProjectService.getUser().subscribe((result) => {
      this.phone = result.phone_number;
      this.is_active = result;
      this.phone = this.phone.slice(-4);

      this.getOTP();
    });
  }
  redirect() {}

  open1(content1: any) {
    this.modalService
      .open(content1, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
