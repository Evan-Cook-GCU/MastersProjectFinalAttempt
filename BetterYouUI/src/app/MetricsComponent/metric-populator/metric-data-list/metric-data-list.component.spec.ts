import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDataListComponent } from './metric-data-list.component';

describe('MetricDataListComponent', () => {
  let component: MetricDataListComponent;
  let fixture: ComponentFixture<MetricDataListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricDataListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
