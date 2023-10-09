import { Injectable, TemplateRef } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../environments/environment';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class CreateProjectService {
  mydata: any;

  base_url = 'https://backend.claxon-ifrs17.com';
  // base_url = 'http://localhost:8000';
  // base_url = environment.apiUrl;

  URL = this.base_url + '/create_project/';
  URL1 = this.base_url + '/uploadfiles/';
  URL2 = this.base_url + '/calculations/cashflow_estimation/';
  URL3 = this.base_url + '/calculations/test_onerousness/';
  URL4 = this.base_url + '/calculations/group_contracts/';
  URL5 = this.base_url + '/projects/';
  URL5C = this.base_url + '/projects_with_cb/';
  URL5B = this.base_url + '/project/';
  URL6 = this.base_url + '/calculations/expected-premium/';
  URL6b = this.base_url + '/calculations/expected-reinsurance-premium/';

  URL7 = this.base_url + '/calculations/insurance-revenue/';
  URL7b = this.base_url + '/calculations/reinsurance-expense/';
  URL8 = this.base_url + '/calculations/insurance-commission/';
  URL8b = this.base_url + '/calculations/reinsurance-commission/';
  URL9 = this.base_url + '/calculations/premiums-received/';
  URL9b = this.base_url + '/calculations/reinsurance-premiums-paid/';
  URL10 = this.base_url + '/calculations/loss-component/';
  URL11B = this.base_url + '/rollforward/results-filenames/';
  URL11 = this.base_url + '/rollforward/lrc-groups/';
  URL12 = this.base_url + '/rollforward/lrc_rollforward/';
  URL13 = this.base_url + '/rollforward/lrc_journal_entries/';
  URL14 = this.base_url + '/rollforward/lrc_journal_entries_d/';
  URL15B = this.base_url + '/rollforward/lc_results_filenames/';
  URL15 = this.base_url + '/rollforward/lc-groups/';
  URL16 = this.base_url + '/rollforward/lc_rollforward/';
  URL17 = this.base_url + '/rollforward/lc_journal_entries/';
  URL18 = this.base_url + '/rollforward/lc_journal_entries_d/';
  URL19 = this.base_url + '/rollforward/lc_journal_entries/';
  URL20 = this.base_url + '/users/';
  URL21 = this.base_url + '/projects/user/';

  // Lic URLS

  URL22 = this.base_url + '/rollforward/lic-groups/';
  URL22B = this.base_url + '/rollforward/lic-results-filenames/';
  URL23 = this.base_url + '/rollforward/lic-rollforward/';
  URL24 = this.base_url + '/rollforward/ra-rollforward/';

  URL25 = this.base_url + '/rollforward/lic-journal-entries/';
  URL26 = this.base_url + '/rollforward/lic-journal-entries_d/';
  baseurl1 = this.base_url + '/user/login';

  // please later on revert to an online endpoint (recently updated)

  baseurl2 = this.base_url + '/user/signup/';
  baseurl3 = this.base_url + '/user/';
  baseurl4 = this.base_url + '/userD/';
  baseurl5 = this.base_url + '/user/update/';
  path = this.base_url + '/rollforward/lrc/';
  arc_path = this.base_url + '/rollforward/arc/';
  path_monthly = this.base_url + '/rollforward/run_monthly_lrc_for_all_groups/';
  path1 = this.base_url + '/rollforward/download-all-results/';
  path3 = this.base_url + '/rollforward/lic/';
  aric_path3 = this.base_url + '/rollforwardaric/';
  path3_monthly =
    this.base_url + '/rollforward/run_monthly_lic_for_all_groups/';
  path4 = this.base_url + '/rollforward/download_all_results_lic/';
  path5 = this.base_url + '/rollforward/lc/';
  path5_monthly = this.base_url + '/rollforward/run_monthly_lc_for_all_groups/';
  path6 = this.base_url + '/rollforward/download_all_results_lc/';

  project1 = this.base_url + '/project/';
  project2 = this.base_url + '/projects/';
  project3 = this.base_url + '/projects/';
  viewfile = this.base_url + '/rollforward/view-result/';
  viewfile_lic = this.base_url + '/rollforward/view_lic_results/';
  viewfile_lc = this.base_url + '/rollforward/view_lc_results/';

  download_file = this.base_url + '/rollforward/download-result/';
  download_file_lic = this.base_url + '/rollforward/download_lic_results/';
  download_file_lc = this.base_url + '/rollforward/download_lc_results/';
  URL_reset = this.base_url + '/user_password_reset/';
  reset_link = this.base_url + '/send_mail/';
  onetime = this.base_url + '/mfa/';
  checkotp = this.base_url + '/chech_otp/';

  get_project_status = this.base_url + '/project/project_status/';

  files_Added = this.base_url + '/project/project_status/';
  dcu = this.base_url + '/project/project_status_data_checks/';
  cashflow_updates = this.base_url + '/project/project_status_cashflows/';
  calcs_updates = this.base_url + '/project/project_status_calcs/';
  rollforward_updates = this.base_url + '/project/project_status_rolfoward/';
  data_checks = this.base_url + '/data-checks/';
  // calcs_update=this.base_url+'/data-checks/'
  users = this.base_url + '/users/';
  activate_user_1 = this.base_url + '/activate_users/user/';
  audit = this.base_url + '/audit_trail';
  audit_before_login = this.base_url + '/audit_trail/before_login';
  export_lrc_balances = this.base_url + '/rollforward/export-lrc-balances/';
  export_lic_balances = this.base_url + '/rollforward/export-lic-balances/';
  security_test = this.base_url + '/secure-endpoint';
  logs = this.base_url + '/audit/trail/';
  // logs="http://localhost:8000/audit/";
  logs1 = this.base_url + '/audit/';
  make_admin = this.base_url + '/user/make_admin/';

  constructor(
    private http: HttpClient,
    private encryptionService: EncryptionService
  ) {}
  outer_token = this.retrieveData();
  inner_token = this.getoken();

  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.getoken()),
    }),
  };
  header_login = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.outer_token),
    }),
  };
  header1 = {
    observe: new HttpHeaders({ media_type: 'application/x-zip-compressed' }),
  };

  tenant_name = localStorage.getItem('tn');
  monthly: any = localStorage.getItem('monthly');
  email_url = '';

  retrieveData(): string {
    const encryptedData = localStorage.getItem('inittkn');
    if (encryptedData) {
      const decryptedData = this.encryptionService.decrypt(encryptedData);
      return decryptedData;
    } else {
      return null; // Return null if there's no encrypted data to retrieve
    }
  }

  extract_logs(body: any) {
    return this.http.post(this.logs, body, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  extract_logs1() {
    return this.http.get(this.logs1, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  test1() {
    return this.http.get<any>(this.security_test, this.header);
  }

  export_lrc_balance(tn: any, id1: any, vd: any) {
    let id = localStorage.getItem('id');
    return this.http.get(this.export_lrc_balances + tn + '/' + id + '/' + vd, {
      observe: 'response',
      responseType: 'blob',
    });
  }

  export_lrc_balance1(tn: any, vd: any) {
    let id = localStorage.getItem('id');
    return this.http.get(this.export_lrc_balances + tn + '/' + id + '/' + vd);
  }

  export_lic_balance(tn: any, id: any, vd: any) {
    return this.http.get(this.export_lic_balances + tn + '/' + id + '/' + vd, {
      observe: 'response',
      responseType: 'blob',
    });
  }
  export_lic_balance1(tn: any, vd: any) {
    let id = localStorage.getItem('id');
    return this.http.get(this.export_lic_balances + tn + '/' + id + '/' + vd);
  }

  makeAdmin(email: any, body: any) {
    return this.http.put<any>(this.make_admin + email, body, this.header);
  }

  audit_trail(body: any) {
    return this.http.post<any>(this.audit, body);
  }

  audit_trail_before_login(body: any) {
    return this.http.post<any>(this.audit_before_login, body);
  }

  all_users() {
    return this.http.get(this.users, this.header);
  }

  Data_Checks(id: any) {
    return this.http.get(this.data_checks + this.tenant_name + '/' + id);
  }

  check_otp(otp: any) {
    // let token = { token: localStorage.getItem('token') };

    let header_check_otp = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(this.retrieveData()),
      }),
    };

    let token = { token: this.retrieveData() };

    return this.http.post<any>(this.checkotp + otp, token, header_check_otp);
  }

  multifactorauth() {
    return this.http.get<any>(this.onetime + this.retrieveData(), this.header);
  }
  forgotPassword(body: any) {
    let email_url1 = 'claxonactuaries-ifrs17.com';
    return this.http.post<any>(this.reset_link + email_url1, body);
  }

  activate_user1(token: any, body: any) {
    return this.http.put<any>(this.activate_user_1 + token, body, this.header);
  }

  reset_password(token: any, body: any) {
    return this.http.put<any>(this.URL_reset + token, body, this.header);
  }

  added_files(project_id: any) {
    let body = 'nothing';
    return this.http.put<any>(this.files_Added + project_id, body, this.header);
  }

  Data_Checks_update(project_id: any) {
    let body = 'nothing';
    return this.http.put<any>(this.dcu + project_id, body, this.header);
  }

  cashflow(project_id: any) {
    let body = 'nothing';
    return this.http.put<any>(
      this.cashflow_updates + project_id,
      body,
      this.header
    );
  }

  calculations(project_id: any) {
    let body = 'nothing';
    return this.http.put<any>(
      this.calcs_updates + project_id,
      body,
      this.header
    );
  }

  rollforward(project_id: any) {
    let body = 'nothing';
    return this.http.put<any>(
      this.rollforward_updates + project_id,
      body,
      this.header
    );
  }

  downloadfiles(id: any, files: any) {
    return this.http.get(
      this.download_file + this.tenant_name + '/' + id + '/' + files,
      { observe: 'response', responseType: 'blob' }
    );
  }

  downloadfiles_lic(id: any, files: any) {
    return this.http.get(
      this.download_file + this.tenant_name + '/' + id + '/' + files,
      { observe: 'response', responseType: 'blob' }
    );
  }

  downloadfiles_lc(id: any, files: any) {
    return this.http.get(
      this.download_file_lc + this.tenant_name + '/' + id + '/' + files,
      { observe: 'response', responseType: 'blob' }
    );
  }

  getprojectstatus(id: any) {
    return this.http.get<any>(this.get_project_status + id, this.header);
  }

  viewfiles(id: any, files: any) {
    return this.http.get<any>(
      this.viewfile + this.tenant_name + '/' + id + '/' + files,
      this.header
    );
  }

  viewfiles_lic(id: any, files: any) {
    return this.http.get<any>(
      this.viewfile_lic + this.tenant_name + '/' + id + '/' + files,
      this.header
    );
  }

  viewfiles_lc(id: any, files: any) {
    return this.http.get<any>(
      this.viewfile_lc + this.tenant_name + '/' + id + '/' + files,
      this.header
    );
  }

  updateProject(id: any, body: any) {
    return this.http.put<any>(this.project3 + id, body, this.header);
  }

  delete_project_by_id(id: any) {
    return this.http.delete<any>(this.project2 + id, this.header);
  }

  public getProjectById(id: any) {
    return this.http.get(this.project1 + id, this.header);
  }

  public lic_all_results_download(id: any) {
    return this.http.get(this.path1 + this.tenant_name + '/' + id + '/lic', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  lic_all_groups_execution(id: any, vd: any, sd: any) {
    const ppId = localStorage.getItem('pp_id');

    let params = new HttpParams();

    if (ppId !== null && ppId !== '0' && ppId !== '') {
      params = params.set('prev_project_id', ppId);
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.getoken()),
    });

    const options = {
      headers: headers,
      params: params,
    };

    return this.http.get<any>(
      this.path3 + this.tenant_name + '/' + id + '/' + vd + '/' + sd + '/',
      options
    );
  }

  aric_all_groups_execution(id: any, vd: any, sd: any) {
    const ppId = localStorage.getItem('pp_id');

    let params = new HttpParams();

    if (ppId !== null && ppId !== '0' && ppId !== '') {
      params = params.set('prev_project_id', ppId);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.getoken()),
    });

    const options = {
      headers: headers,
      params: params,
    };
    return this.http.get<any>(
      this.aric_path3 + this.tenant_name + '/' + id + '/' + vd + '/' + sd + '/',
      options
    );
  }

  public lrc_all_results_download(tenant_name: any, id: any) {
    return this.http.get(this.path1 + tenant_name + '/' + id + '/lrc', {
      observe: 'response',
      responseType: 'blob',
    });
  }
  public arc_all_results_download(tenant_name: any, id: any) {
    return this.http.get(this.path1 + tenant_name + '/' + id + '/arc', {
      observe: 'response',
      responseType: 'blob',
    });
  }
  public aric_all_results_download(tenant_name: any, id: any) {
    return this.http.get(this.path1 + tenant_name + '/' + id + '/aric', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  public lc_all_results_download(id: any) {
    return this.http.get(this.path6 + this.tenant_name + '/' + id + '/lc', {
      observe: 'response',
      responseType: 'blob',
    });
  }

  lrc_all_groups_execution(id: any, vd: any, sd: any) {
    const ppId = localStorage.getItem('pp_id');

    let params = new HttpParams();

    if (ppId !== null && ppId !== '0' && ppId !== '') {
      params = params.set('prev_project_id', ppId);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.getoken()),
    });

    const options = {
      headers: headers,
      params: params,
    };

    return this.http.get<any>(
      this.path + this.tenant_name + '/' + id + '/' + vd + '/' + sd + '/',
      options
    );
  }

  arc_all_groups_execution(id: any, vd: any, sd: any) {
    const ppId = localStorage.getItem('pp_id');

    let params = new HttpParams();

    if (ppId !== null && ppId !== '0' && ppId !== '') {
      params = params.set('prev_project_id', ppId);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.getoken()),
    });

    const options = {
      headers: headers,
      params: params,
    };

    return this.http.get<any>(
      this.arc_path + this.tenant_name + '/' + id + '/' + vd + '/' + sd + '/',
      options
    );
  }

  lc_all_groups_execution(id: any, vd: any, sd: any) {
    const ppId = localStorage.getItem('pp_id');

    let params = new HttpParams();

    if (ppId !== null && ppId !== '0' && ppId !== '') {
      params = params.set('prev_project_id', ppId);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.getoken()),
    });

    const options = {
      headers: headers,
      params: params,
    };
    return this.http.get<any>(
      this.path5 + this.tenant_name + '/' + id + '/' + vd + '/' + sd + '/',
      options
    );
  }

  update_user_by_email(email: any, body: any) {
    return this.http.put<any>(this.baseurl5 + email, body, this.header);
  }

  get_user_by_email(email: any) {
    return this.http.get<any>(this.baseurl3 + email, this.header);
  }

  delete_user_by_email(email: any) {
    return this.http.delete<any>(this.baseurl4 + email, this.header);
  }

  login(data: any) {
    return this.http.post<any>(this.baseurl1, data, this.header);
    //       // @ts-ignore
    // console.log("env :", environment.production)
  }

  signup(data: any) {
    return this.http.post<any>(
      this.baseurl2 + this.email_url,
      data,
      this.header
    );
  }

  lic_jounal_entries_download(id: any) {
    return this.http.get<any>(
      this.URL26 + this.tenant_name + '/' + id,
      this.header
    );
  }

  lic_jounal_entries(id: any, selected_portfolio: any) {
    return this.http.get<any>(
      this.URL25 + this.tenant_name + '/' + id + '/' + selected_portfolio,
      this.header
    );
  }

  ra_groups_execution(id: any, vd: any, selected_group: any) {
    return this.http.get<any>(
      this.URL24 +
        this.tenant_name +
        '/' +
        id +
        '/' +
        vd +
        '/' +
        selected_group,
      this.header
    );
  }

  lic_groups_execution(id: any, vd: any, selected_group: any) {
    return this.http.get<any>(
      this.URL23 +
        this.tenant_name +
        '/' +
        id +
        '/' +
        vd +
        '/' +
        selected_group,
      this.header
    );
  }

  lic_groups(id: any) {
    return this.http.get<any>(
      this.URL22 + this.tenant_name + '/' + id,
      this.header
    );
  }

  lic_groupsnames(id: any) {
    return this.http.get<any>(
      this.URL11B + this.tenant_name + '/' + id + '/lic',
      this.header
    );
  }

  getUserProjects() {
    let token = localStorage.getItem('token');
    return this.http.get<any>(this.URL21 + token, this.header);
  }
  getUser() {
    let header_checkUserActivated = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(localStorage.getItem('token')),
      }),
    };
    let token = localStorage.getItem('token');
    return this.http.get<any>(this.URL20 + token, header_checkUserActivated);
  }
  getUser_login() {
    let token = this.retrieveData();
    return this.http.get<any>(this.URL20 + token, this.header_login);
  }

  lc_jounal_entries_download(id: any) {
    return this.http.get<any>(
      this.URL18 + this.tenant_name + '/' + id,
      this.header
    );
  }

  lc_jounal_entries(id: any, selected_group: any) {
    return this.http.get<any>(
      this.URL19 + this.tenant_name + '/' + id + '/' + selected_group,
      this.header
    );
  }
  lc_groups_execution(id: any, vd: any, selected_group: any) {
    return this.http.get<any>(
      this.URL16 +
        this.tenant_name +
        '/' +
        id +
        '/' +
        vd +
        '/' +
        selected_group,
      this.header
    );
  }

  lc_groups(id: any) {
    return this.http.get<any>(
      this.URL15 + this.tenant_name + '/' + id,
      this.header
    );
  }

  lc_groups_filenames(id: any) {
    return this.http.get<any>(
      this.URL11B + this.tenant_name + '/' + id + '/lc',
      this.header
    );
  }

  lrc_jounal_entries_download(id: any) {
    return this.http.get<any>(
      this.URL14 + this.tenant_name + '/' + id,
      this.header
    );
  }

  lrc_jounal_entries(id: any, selected_group: any) {
    return this.http.get<any>(
      this.URL13 + this.tenant_name + '/' + id + '/' + selected_group,
      this.header
    );
  }
  lrc_groups_execution(id: any, vd: any, selected_group: any) {
    return this.http.get<any>(
      this.URL12 +
        this.tenant_name +
        '/' +
        id +
        '/' +
        vd +
        '/' +
        selected_group,
      this.header
    );
  }

  lrc_groups(id: any) {
    return this.http.get<any>(
      this.URL11 + this.tenant_name + '/' + id,
      this.header
    );
  }

  lrc_groups_filenames(id: any) {
    return this.http.get<any>(
      this.URL11B + this.tenant_name + '/' + id + '/lrc',
      this.header
    );
  }

  arc_groups_filenames(id: any) {
    return this.http.get<any>(
      this.URL11B + this.tenant_name + '/' + id + '/arc',
      this.header
    );
  }

  aric_groups_filenames(id: any) {
    return this.http.get<any>(
      this.URL11B + this.tenant_name + '/' + id + '/aric',
      this.header
    );
  }

  loss_component(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL10 + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }

  premiums_received(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL9 + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }
  reinsurance_premiums_paid(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL9b + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }

  acquisition_costs(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL8 + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }
  reinsurance_commission(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL8b + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }

  monthly_insurance_revenue(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL7 + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }
  reinsurance_expense(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL7b + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }

  expected_premiums(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL6 + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }
  expected_reinsurance_premiums(id: any, vd: any, sd: any) {
    return this.http.get<any>(
      this.URL6b + this.tenant_name + '/' + id + '/' + vd + '/' + sd,
      this.header
    );
  }

  upload(tenant_name: any, id: any, body: any) {
    return this.http.post<any>(
      this.URL + tenant_name + '/' + id,
      body,
      this.header
    );
  }

  createProject(tn: any, body: any) {
    let token = localStorage.getItem('token');

    return this.http.post<any>(this.URL5 + token, body, this.header);
  }

  getProject(id: any) {
    return this.http.get<any>(this.URL5B + id, this.header);
  }

  cashflowestimation(id: any) {
    const ppId = localStorage.getItem('pp_id');

    let params = new HttpParams();

    if (ppId !== null && ppId !== '0' && ppId !== '') {
      params = params.set('prev_project_id', ppId);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + String(this.getoken()),
    });

    const options = {
      headers: headers,
      params: params,
    };

    return this.http.get<any>(this.URL2 + this.tenant_name + '/' + id, options);
  }

  test_onerousness(id: any) {
    return this.http.get<any>(
      this.URL3 + this.tenant_name + '/' + id,
      this.header
    );
  }

  assign_groups(id: any) {
    return this.http.get<any>(
      this.URL4 + this.tenant_name + '/' + id,
      this.header
    );
  }

  getprojects() {
    let token = localStorage.getItem('token');
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(this.getoken()),
      }),
    };

    return this.http.get<any>(this.URL5 + token, header);
  }
  getprojects_with_cb() {
    let token = localStorage.getItem('token');
    let header = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + String(this.getoken()),
      }),
    };

    return this.http.get<any>(this.URL5C + token, header);
  }

  getInfo() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
  }

  getoken() {
    return localStorage.getItem('token');
  }
}
