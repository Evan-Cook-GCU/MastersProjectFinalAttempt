import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupEditorComponent } from './admin-group-editor.component';

describe('AdminGroupEditorComponent', () => {
  let component: AdminGroupEditorComponent;
  let fixture: ComponentFixture<AdminGroupEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminGroupEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminGroupEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
