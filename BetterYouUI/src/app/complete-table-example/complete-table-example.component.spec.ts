import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTableExampleComponent } from './complete-table-example.component';

describe('CompleteTableExampleComponent', () => {
  let component: CompleteTableExampleComponent;
  let fixture: ComponentFixture<CompleteTableExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteTableExampleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteTableExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
