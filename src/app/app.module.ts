import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AddFileComponent } from './add-file/add-file.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CashFlowEstimationComponent } from './cash-flow-estimation/cash-flow-estimation.component';
import { TestOnerousnessComponent } from './test-onerousness/test-onerousness.component';
import { AssignGroupsComponent } from './assign-groups/assign-groups.component';
import { GraphsComponent } from './graphs/graphs.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { RollfowardLrcComponent } from './rollfoward-lrc/rollfoward-lrc.component';
import { RollforwardLcComponent } from './rollforward-lc/rollforward-lc.component';
import { RollfowardLicComponent } from './rollfoward-lic/rollfoward-lic.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ViewfilesComponent } from './viewfiles/viewfiles.component';
import { ViewfilesLicComponent } from './viewfiles-lic/viewfiles-lic.component';
import { ViewfilesLcComponent } from './viewfiles-lc/viewfiles-lc.component';
import { FilenamesComponent } from './filenames/filenames.component';
import { FilenamesLicComponent } from './filenames-lic/filenames-lic.component';
import { FilenamesLcComponent } from './filenames-lc/filenames-lc.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ExecuteAllComponent } from './execute-all/execute-all.component';
import { DataChecksComponent } from './data-checks/data-checks.component';
import { NgbToastModule } from  'ngb-toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckIsActiveStatusComponent } from './check-is-active-status/check-is-active-status.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { TestingComponent } from './testing/testing.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AuthState } from './state/auth.state';
import { ProjectState } from './state/project.state';
import { ResultsComponent } from './results/results.component';
import { RollfowardArcComponent } from './rollfoward-arc/rollfoward-arc.component';
import { RollfowardAricComponent } from './rollfoward-aric/rollfoward-aric.component';
import { FilenamesArcComponent } from './filenames-arc/filenames-arc.component';
import { FilenamesAricComponent } from './filenames-aric/filenames-aric.component';
import { RollforwardCalculationsComponent } from './rollforward-calculations/rollforward-calculations.component';


// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    AllProjectsComponent,
    AddFileComponent,
    CreateProjectComponent,
    CashFlowEstimationComponent,
    TestOnerousnessComponent,
    AssignGroupsComponent,
    GraphsComponent,
    CalculationsComponent,
    RollfowardLrcComponent,
    RollforwardLcComponent,
    RollfowardLicComponent,
    LoginComponent,
    SignUpComponent,
    ProgressSpinnerComponent,
    EditUserComponent,
    ManageUsersComponent,
    UpdateProjectComponent,
    ViewfilesComponent,
    ViewfilesLicComponent,
    ViewfilesLcComponent,
    FilenamesComponent,
    FilenamesLicComponent,
    FilenamesLcComponent,
    ForgotPasswordComponent,
    ExecuteAllComponent,
    DataChecksComponent,
    ChangePasswordComponent,
    CheckIsActiveStatusComponent,
    ActivateUserComponent,
    TestingComponent,
    AuditTrailComponent,
    ResultsComponent,
    RollfowardArcComponent,
    RollfowardAricComponent,
    FilenamesArcComponent,
    FilenamesAricComponent,
    RollforwardCalculationsComponent

  ],
  imports: [
    

    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    
    NgxsModule.forRoot([AuthState]),
    NgxsModule.forRoot([ProjectState]),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
