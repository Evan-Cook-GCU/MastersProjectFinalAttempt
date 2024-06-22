import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricListerComponent } from './metric-lister.component';

describe('MetricListerComponent', () => {
  let component: MetricListerComponent;
  let fixture: ComponentFixture<MetricListerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricListerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricListerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
