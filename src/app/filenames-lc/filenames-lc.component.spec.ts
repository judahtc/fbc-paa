import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilenamesLcComponent } from './filenames-lc.component';

describe('FilenamesLcComponent', () => {
  let component: FilenamesLcComponent;
  let fixture: ComponentFixture<FilenamesLcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilenamesLcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilenamesLcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
