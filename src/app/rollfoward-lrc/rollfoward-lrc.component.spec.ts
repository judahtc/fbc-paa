import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollfowardLrcComponent } from './rollfoward-lrc.component';

describe('RollfowardLrcComponent', () => {
  let component: RollfowardLrcComponent;
  let fixture: ComponentFixture<RollfowardLrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollfowardLrcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RollfowardLrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
