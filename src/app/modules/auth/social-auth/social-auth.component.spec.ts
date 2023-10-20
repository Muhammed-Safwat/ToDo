import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialAuthComponent } from './social-auth.component';

describe('SocialAuthComponent', () => {
  let component: SocialAuthComponent;
  let fixture: ComponentFixture<SocialAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SocialAuthComponent]
    });
    fixture = TestBed.createComponent(SocialAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
