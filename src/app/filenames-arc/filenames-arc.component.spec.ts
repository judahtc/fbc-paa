import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilenamesArcComponent } from './filenames-arc.component';

describe('FilenamesArcComponent', () => {
  let component: FilenamesArcComponent;
  let fixture: ComponentFixture<FilenamesArcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilenamesArcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilenamesArcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
