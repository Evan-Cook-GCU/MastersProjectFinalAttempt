import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupViewComponent } from './user-group-view.component';

describe('UserGroupViewComponent', () => {
  let component: UserGroupViewComponent;
  let fixture: ComponentFixture<UserGroupViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGroupViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
