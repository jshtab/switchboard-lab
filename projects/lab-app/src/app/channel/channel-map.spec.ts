import { ChannelMap } from './channel-map';
import type { Channel } from './channel';
import { of } from 'rxjs';

describe('ChannelMap', () => {
  it('should create an instance', () => {
    expect(new ChannelMap()).toBeTruthy();
  });

  it('should return default observable if channel is not in map', () => {
    const defaultContent = of();
    const dummyChannel = Symbol() as Channel<String>;
    const instance = new ChannelMap(defaultContent);
    const result = instance.get(dummyChannel);
    expect(result).toEqual(defaultContent)
  })

  it('should associate channel with observable', () => {
    const channelSymbol = Symbol() as Channel<String>;
    const channelContent = of("test")
    const instance = new ChannelMap();
    instance.set(channelSymbol, channelContent)
    const result = instance.get(channelSymbol)
    expect(result).toEqual(channelContent);
  })
});
