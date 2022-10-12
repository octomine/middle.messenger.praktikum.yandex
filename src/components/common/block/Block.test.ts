import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

const { default: Block } = proxyquire('./Block', {
  '../../../utils': {
    EventBus: class {
      emit = eventBusMock.emit;

      on = eventBusMock.on;
    },
  },
}) as { default: typeof BlockType };

describe('Block', () => {
  class ComponentMock extends Block { }

  it('should fire init event on initialization', () => {
    new ComponentMock({});
    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('should fire componentDidMount on dispatchComponentDidMount()', () => {
    const block = new ComponentMock({});
    block.dispatchComponentDidMount();
    expect(eventBusMock.emit.calledWith('flow:component-did-mount')).to.eq(true);
  });

  it('should fire componentDidUpdate on setProps()', () => {
    const block = new ComponentMock({});
    block.setProps({ element: 'element' });
    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });
});
