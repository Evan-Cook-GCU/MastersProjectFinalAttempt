import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimengTableCompleteComponent } from './primeng-table-complete.component';

describe('PrimengTableCompleteComponent', () => {
  let component: PrimengTableCompleteComponent;
  let fixture: ComponentFixture<PrimengTableCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimengTableCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimengTableCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
