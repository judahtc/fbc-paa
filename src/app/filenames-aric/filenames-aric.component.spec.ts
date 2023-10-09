import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilenamesAricComponent } from './filenames-aric.component';

describe('FilenamesAricComponent', () => {
  let component: FilenamesAricComponent;
  let fixture: ComponentFixture<FilenamesAricComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilenamesAricComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilenamesAricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
