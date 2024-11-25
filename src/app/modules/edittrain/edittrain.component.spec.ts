import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittrainComponent } from './edittrain.component';

describe('EdittrainComponent', () => {
  let component: EdittrainComponent;
  let fixture: ComponentFixture<EdittrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdittrainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdittrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
