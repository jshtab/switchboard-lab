import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChannelsConsumerComponent } from './test-channels-consumer.component';

xdescribe('TestChannelsConsumerComponent', () => {
  let component: TestChannelsConsumerComponent;
  let fixture: ComponentFixture<TestChannelsConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestChannelsConsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChannelsConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
