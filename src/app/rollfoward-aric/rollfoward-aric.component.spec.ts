import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollfowardAricComponent } from './rollfoward-aric.component';

describe('RollfowardAricComponent', () => {
  let component: RollfowardAricComponent;
  let fixture: ComponentFixture<RollfowardAricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollfowardAricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollfowardAricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
