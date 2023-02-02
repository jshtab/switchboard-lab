import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChannelsControlComponent } from './test-channels-control.component';

describe('TestChannelsControlComponent', () => {
  let component: TestChannelsControlComponent;
  let fixture: ComponentFixture<TestChannelsControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestChannelsControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChannelsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
