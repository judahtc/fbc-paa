import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfilesLicComponent } from './viewfiles-lic.component';

describe('ViewfilesLicComponent', () => {
  let component: ViewfilesLicComponent;
  let fixture: ComponentFixture<ViewfilesLicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfilesLicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewfilesLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
