import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostHashtagsComponent } from './post-hashtags.component';

describe('PostHashtagsComponent', () => {
  let component: PostHashtagsComponent;
  let fixture: ComponentFixture<PostHashtagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostHashtagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostHashtagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
