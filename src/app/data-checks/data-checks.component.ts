import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';


@Component({
  selector: 'app-data-checks',
  templateUrl: './data-checks.component.html',
  styleUrls: ['./data-checks.component.scss']
})
export class DataChecksComponent implements OnInit {
  checks: any;
	result: any;
  computed=true;
  key: string[];
  value: any;

  constructor(private createProjectService: CreateProjectService) { }

  ngOnInit(): void {
	this.data_check()
  }

  data_check(){
	this.createProjectService.Data_Checks(localStorage.getItem('id')).subscribe({next:result=>{
    this.computed=false;
		this.checks=result
		this.result=this.checks.responses

    this.key=Object.keys(this.result[0])
    this.value.push(Object.values(this.result[0]))
		console.log(this.checks)
	}})
  }



}
