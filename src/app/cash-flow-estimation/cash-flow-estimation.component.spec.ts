import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowEstimationComponent } from './cash-flow-estimation.component';

describe('CashFlowEstimationComponent', () => {
  let component: CashFlowEstimationComponent;
  let fixture: ComponentFixture<CashFlowEstimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowEstimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashFlowEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
