import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePanaelComponent } from './update-panael.component';

describe('UpdatePanaelComponent', () => {
  let component: UpdatePanaelComponent;
  let fixture: ComponentFixture<UpdatePanaelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePanaelComponent]
    });
    fixture = TestBed.createComponent(UpdatePanaelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
