import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultGroupViewerComponent } from './default-group-viewer.component';

describe('DefaultGroupViewerComponent', () => {
  let component: DefaultGroupViewerComponent;
  let fixture: ComponentFixture<DefaultGroupViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultGroupViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DefaultGroupViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
