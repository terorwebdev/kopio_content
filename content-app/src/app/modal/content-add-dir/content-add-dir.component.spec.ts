import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAddDirComponent } from './content-add-dir.component';

describe('ContentAddDirComponent', () => {
  let component: ContentAddDirComponent;
  let fixture: ComponentFixture<ContentAddDirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentAddDirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentAddDirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
