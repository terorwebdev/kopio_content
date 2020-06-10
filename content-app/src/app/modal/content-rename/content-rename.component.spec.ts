import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentRenameComponent } from './content-rename.component';

describe('ContentRenameComponent', () => {
  let component: ContentRenameComponent;
  let fixture: ComponentFixture<ContentRenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentRenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
