import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteAllComponent } from './execute-all.component';

describe('ExecuteAllComponent', () => {
  let component: ExecuteAllComponent;
  let fixture: ComponentFixture<ExecuteAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecuteAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
