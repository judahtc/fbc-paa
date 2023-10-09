import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollfowardLicComponent } from './rollfoward-lic.component';

describe('RollfowardLicComponent', () => {
  let component: RollfowardLicComponent;
  let fixture: ComponentFixture<RollfowardLicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollfowardLicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollfowardLicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
