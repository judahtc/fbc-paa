import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataChecksComponent } from './data-checks.component';

describe('DataChecksComponent', () => {
  let component: DataChecksComponent;
  let fixture: ComponentFixture<DataChecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataChecksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataChecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
