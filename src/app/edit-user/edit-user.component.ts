import { Component, OnInit } from '@angular/core';
import { CreateProjectService } from '../create-project.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private createProjectService:CreateProjectService) { }

  ngOnInit(): void {
  }

  

}
