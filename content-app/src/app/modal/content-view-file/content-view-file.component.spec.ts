import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentViewFileComponent } from './content-view-file.component';

describe('ContentViewFileComponent', () => {
  let component: ContentViewFileComponent;
  let fixture: ComponentFixture<ContentViewFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentViewFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentViewFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
