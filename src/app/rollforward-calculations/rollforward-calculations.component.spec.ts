import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollforwardCalculationsComponent } from './rollforward-calculations.component';

describe('RollforwardCalculationsComponent', () => {
  let component: RollforwardCalculationsComponent;
  let fixture: ComponentFixture<RollforwardCalculationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollforwardCalculationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollforwardCalculationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
