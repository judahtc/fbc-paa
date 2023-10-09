import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfilesLcComponent } from './viewfiles-lc.component';

describe('ViewfilesLcComponent', () => {
  let component: ViewfilesLcComponent;
  let fixture: ComponentFixture<ViewfilesLcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfilesLcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewfilesLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
