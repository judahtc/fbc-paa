import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollfowardArcComponent } from './rollfoward-arc.component';

describe('RollfowardArcComponent', () => {
  let component: RollfowardArcComponent;
  let fixture: ComponentFixture<RollfowardArcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollfowardArcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollfowardArcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
