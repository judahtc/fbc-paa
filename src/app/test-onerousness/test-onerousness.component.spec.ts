import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOnerousnessComponent } from './test-onerousness.component';

describe('TestOnerousnessComponent', () => {
  let component: TestOnerousnessComponent;
  let fixture: ComponentFixture<TestOnerousnessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestOnerousnessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestOnerousnessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
