import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDataFormComponent } from './metric-data-form.component';

describe('MetricDataFormComponent', () => {
  let component: MetricDataFormComponent;
  let fixture: ComponentFixture<MetricDataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricDataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricDataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
