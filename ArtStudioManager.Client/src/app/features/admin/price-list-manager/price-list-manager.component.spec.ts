import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceListManagerComponent } from './price-list-manager.component';

describe('PriceListManagerComponent', () => {
  let component: PriceListManagerComponent;
  let fixture: ComponentFixture<PriceListManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceListManagerComponent]
    });
    fixture = TestBed.createComponent(PriceListManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
