import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMyPasswordComponent } from './change-my-password.component';

describe('ChangeMyPasswordComponent', () => {
  let component: ChangeMyPasswordComponent;
  let fixture: ComponentFixture<ChangeMyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeMyPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMyPasswordComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
