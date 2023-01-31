import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChannelsDirective } from '../../../channel/directives/channel.directive';
import { TestChannelsConsumerComponent } from '../test-channels-consumer/test-channels-consumer.component';

import { TestChannelsMainComponent } from './test-channels-main.component';

describe('TestChannelsMainComponent', () => {
  let component: TestChannelsMainComponent;
  let fixture: ComponentFixture<TestChannelsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestChannelsMainComponent, TestChannelsConsumerComponent ],
      imports: [ ChannelsDirective ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestChannelsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
