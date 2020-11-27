import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHashtagsComponent } from './list-hashtags.component';

describe('ListHashtagsComponent', () => {
  let component: ListHashtagsComponent;
  let fixture: ComponentFixture<ListHashtagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListHashtagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHashtagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
