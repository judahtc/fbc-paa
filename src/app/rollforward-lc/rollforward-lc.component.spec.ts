import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollforwardLcComponent } from './rollforward-lc.component';

describe('RollforwardLcComponent', () => {
  let component: RollforwardLcComponent;
  let fixture: ComponentFixture<RollforwardLcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollforwardLcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollforwardLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
