import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilenamesLicComponent } from './filenames-lic.component';

describe('FilenamesLicComponent', () => {
  let component: FilenamesLicComponent;
  let fixture: ComponentFixture<FilenamesLicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilenamesLicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilenamesLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
