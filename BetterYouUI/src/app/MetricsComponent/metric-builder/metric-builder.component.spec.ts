import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricBuilderComponent } from './metric-builder.component';

describe('MetricBuilderComponent', () => {
  let component: MetricBuilderComponent;
  let fixture: ComponentFixture<MetricBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
