import { Component , OnInit} from '@angular/core';
import { CreateProjectService } from '../create-project.service';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
export class TestingComponent implements OnInit {

  constructor(
    private createProjectService:CreateProjectService,

                      ) { }
  ngOnInit(): void {
this.test1()
  }

  test1(){
    this.createProjectService.test1().subscribe(result=>{
      console.log(result)
    })
  }

}
