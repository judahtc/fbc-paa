import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivateUserComponent } from './activate-user/activate-user.component';
import { AddFileComponent } from './add-file/add-file.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AssignGroupsComponent } from './assign-groups/assign-groups.component';
import { AuditTrailComponent } from './audit-trail/audit-trail.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { CashFlowEstimationComponent } from './cash-flow-estimation/cash-flow-estimation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { CheckIsActiveStatusComponent } from './check-is-active-status/check-is-active-status.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { DataChecksComponent } from './data-checks/data-checks.component';
import { ExecuteAllComponent } from './execute-all/execute-all.component';
import { FilenamesArcComponent } from './filenames-arc/filenames-arc.component';
import { FilenamesAricComponent } from './filenames-aric/filenames-aric.component';
import { FilenamesLcComponent } from './filenames-lc/filenames-lc.component';
import { FilenamesLicComponent } from './filenames-lic/filenames-lic.component';
import { FilenamesComponent } from './filenames/filenames.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GraphsComponent } from './graphs/graphs.component';
import { LoginComponent } from './login/login.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { PortalGuardGuard } from './portal-guard.guard';
import { PortalComponent } from './portal/portal.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { ResultsComponent } from './results/results.component';
import { RollforwardCalculationsComponent } from './rollforward-calculations/rollforward-calculations.component';
import { RollforwardLcComponent } from './rollforward-lc/rollforward-lc.component';
import { RollfowardArcComponent } from './rollfoward-arc/rollfoward-arc.component';
import { RollfowardAricComponent } from './rollfoward-aric/rollfoward-aric.component';
import { RollfowardLicComponent } from './rollfoward-lic/rollfoward-lic.component';
import { RollfowardLrcComponent } from './rollfoward-lrc/rollfoward-lrc.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TestOnerousnessComponent } from './test-onerousness/test-onerousness.component';
import { TestingComponent } from './testing/testing.component';
import { UpdateProjectComponent } from './update-project/update-project.component';
import { ViewfilesLcComponent } from './viewfiles-lc/viewfiles-lc.component';
import { ViewfilesLicComponent } from './viewfiles-lic/viewfiles-lic.component';
import { ViewfilesComponent } from './viewfiles/viewfiles.component';


const routes: Routes = [

  {path:'',component:LoginComponent},
  {path:'testing',component:TestingComponent},
  {path:'audit',component:AuditTrailComponent,canActivate:[PortalGuardGuard]},

  {path:'check_is_active',component:CheckIsActiveStatusComponent},
  {path:'activate',component:ActivateUserComponent},
  {path:'login',component:LoginComponent,children: [

  {path:'resetpassword/:id',component:ForgotPasswordComponent}]},
  {path:'resetpassword/:id',component:ForgotPasswordComponent},
  {path:'portal',component:PortalComponent,canActivate:[PortalGuardGuard], children: [    
    {path:'change-pass',component:ChangePasswordComponent},  
    {path:'results',component:ResultsComponent},  
  {path:'projects',component:AllProjectsComponent},
  {path:'execute-all',component:ExecuteAllComponent},
  {path:'data-checks',component:DataChecksComponent},
  {path:'rollforward-calcs',component:RollforwardCalculationsComponent},

  // {path:'projects/:id',component:AllProjectsComponent},
  {path:'graphs',component:GraphsComponent},
  {path:'addfiles',component:AddFileComponent},
  {path:'create',component:CreateProjectComponent},
  {path:'cashflow',component:CashFlowEstimationComponent},
  {path:'onerous',component:TestOnerousnessComponent},
  {path:'assign_groups',component:AssignGroupsComponent},
  {path:'calculations',component:CalculationsComponent},
  {path:'rollfoward_lrc',component:RollfowardLrcComponent},
  {path:'rollfoward_arc',component:RollfowardArcComponent},
  {path:'rollfoward_lc',component:RollforwardLcComponent},
  {path:'rollfoward_lic',component:RollfowardLicComponent},
  {path:'rollfoward_aric',component:RollfowardAricComponent},
  {path:'signup',component:SignUpComponent},
  {path:'spinner',component:ProgressSpinnerComponent},
  {path:'manage-users',component:ManageUsersComponent},
  {path:'projects/:id',component:UpdateProjectComponent},
  {path:'viewfiles/:id',component:ViewfilesComponent},
  {path:'viewfiles_lic/:id',component:ViewfilesLicComponent},
  {path:'viewfiles_lc/:id',component:ViewfilesLcComponent},
  {path:'filenames/:id',component:FilenamesComponent},
  {path:'filenames-arc/:id',component:FilenamesArcComponent},
  {path:'filenames-aric/:id',component:FilenamesAricComponent},
  {path:'filenames_lic/:id',component:FilenamesLicComponent},
  {path:'filenames_lc/:id',component:FilenamesLcComponent},
  {path:'audit',component:AuditTrailComponent},


]},
{path:'projects/:id',component:AllProjectsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routeComponents=[
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
  TestingComponent

]