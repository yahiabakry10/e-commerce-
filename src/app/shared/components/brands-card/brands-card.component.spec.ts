import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsCardComponent } from './brands-card.component';

describe('BrandsCardComponent', () => {
  let component: BrandsCardComponent;
  let fixture: ComponentFixture<BrandsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
