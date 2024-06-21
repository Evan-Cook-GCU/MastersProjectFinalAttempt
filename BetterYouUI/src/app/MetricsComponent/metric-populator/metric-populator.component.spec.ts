import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricPopulatorComponent } from './metric-populator.component';

describe('MetricPopulatorComponent', () => {
  let component: MetricPopulatorComponent;
  let fixture: ComponentFixture<MetricPopulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricPopulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricPopulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
