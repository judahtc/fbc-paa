import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilenamesComponent } from './filenames.component';

describe('FilenamesComponent', () => {
  let component: FilenamesComponent;
  let fixture: ComponentFixture<FilenamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilenamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilenamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
