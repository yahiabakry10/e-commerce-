import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownLanguageComponent } from './dropdown-language.component';

describe('DropdownLanguageComponent', () => {
  let component: DropdownLanguageComponent;
  let fixture: ComponentFixture<DropdownLanguageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownLanguageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownLanguageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
