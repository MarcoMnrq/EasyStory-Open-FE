import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListQualificationsComponent } from './list-qualification.component';

describe('ListQualificationsComponent', () => {
  let component: ListQualificationsComponent;
  let fixture: ComponentFixture<ListQualificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListQualificationsComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListQualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
