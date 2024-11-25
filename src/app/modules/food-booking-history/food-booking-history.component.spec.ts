import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodBookingHistoryComponent } from './food-booking-history.component';

describe('FoodBookingHistoryComponent', () => {
  let component: FoodBookingHistoryComponent;
  let fixture: ComponentFixture<FoodBookingHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodBookingHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodBookingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
