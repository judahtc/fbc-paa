import { State, Action, StateContext } from '@ngxs/store';

export class SetProjectDetails 
{
  static readonly type = '[Project] Project Details';
  constructor(
    public project_name: string,
    public project_id: string,
    public valuation_date: string,
    public monthly: string
                
    ) {}
}

export class ClearProjectDetails 
{
  static readonly type = '[Project] Clear Project Details';
}


export interface ProjectStateModel {
    project_name: string | null;
    project_id: string | null;
    valuation_date: string | null;
    monthly: string | null;

  }
  
  @State<ProjectStateModel>({
    name: 'project',
    defaults: {
        project_name:  null,
        project_id:  null,
        valuation_date:  null,
        monthly:  null
    },
  })
  
  
  export class ProjectState {
    @Action(SetProjectDetails)
    SetProjectDetails(ctx1: StateContext<ProjectStateModel>, { project_name,project_id,valuation_date,monthly }: SetProjectDetails) {
      ctx1.patchState({ project_name,project_id,valuation_date,monthly });
    }
  
    @Action(ClearProjectDetails)
    ClearProjectDetails(ctx1: StateContext<ProjectStateModel>) {
      ctx1.patchState({ project_name:null,project_id:null,valuation_date:null,monthly:null });
    }
  }