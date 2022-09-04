import { v4 as makeID } from 'uuid';
import { TemplateDelegate } from 'handlebars/runtime';
import EventBus from '../../../utils/event-bus';

export type TBlockProps = Record<string, unknown> & {
  block?: string,
  modifiers?: string,
  styles?: string,
  events?: Record<string, () => void>,
  children?: Record<string, Block<unknown>>
  setProps?: (newProps: object) => void,
};


export default class Block<P> {
  eventBus: () => EventBus;
  props: any;
  children: Record<string, Block<unknown> | Array<Record<string, Block<unknown>>>>;

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  }

  _element: HTMLElement | null = null;
  id: string | null = null;

  constructor(propsAndChildren: P & TBlockProps) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsAndChildren);
    this.children = children;

    this.id = makeID();

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  _getChildrenAndProps(childrenAndProps: P & TBlockProps) {
    const children = {};
    const props = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    })

    return { props, children }
  }

  _makePropsProxy(props: TBlockProps) {
    const self = this;

    return new Proxy(props, {
      get(target: object, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: object, prop: string, value: unknown) {
        const old = { ...target };
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, old, { ...target });
        return true;
      },
      deleteProperty() {
        throw 'Нет прав';
      }
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createDocumentElement(tagName: string): HTMLTemplateElement {
    const el = document.createElement(tagName) as HTMLTemplateElement;
    return el;
  }

  _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((evtName) => {
      this._element?.addEventListener(evtName, events[evtName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((evtName) => {
      this._element?.removeEventListener(evtName, events[evtName]);
    });
  }

  _componentDidMount() {
    this.componentDidMount();

    const dispatchCDMInner = (children: Block<unknown>[]): void => {
      children.forEach((child) => {
        if (Array.isArray(child)) {
          dispatchCDMInner(child);
        } else {
          child.dispatchComponentDidMount();
        }
      })
    }
    dispatchCDMInner(Object.values(this.children));
  }

  _componentDidUpdate(oldProps: object, newProps: object) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  _render() {
    const newElement: HTMLElement = this.render().firstElementChild;
    newElement.setAttribute('data-id', this.id);

    this._removeEvents();

    this._element?.replaceWith(newElement);
    this._element = newElement;

    this._addEvents();
  }

  setProps = (newProps: object) => {
    if (!newProps) {
      return;
    }
    Object.assign(this.props, newProps);
  }

  getContent() {
    return this.element;
  }

  init() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // переопределяется в наследниках
  componentDidMount() { }

  componentDidUpdate(oldProps: object, newProps: object) {
    return oldProps !== newProps;
  }

  compile(tmpl: TemplateDelegate, props: P) {
    const stub = (id: string | null): string => `<div data-id='${id}'></div>`;
    const replaceStub = (el: DocumentFragment, block: Block<unknown>): void => {
      const { id } = block;
      const stub = el.querySelector(`[data-id='${id}']`);
      if (stub) {
        stub.replaceWith(block.getContent());
      }
    }

    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        propsAndStubs[key] = value.map(({ id }) => stub(id));
      } else {
        propsAndStubs[key] = stub(value.id);
      }
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = tmpl(propsAndStubs);
    const el = fragment.content;
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((inner) => replaceStub(el, inner))
      }
      replaceStub(el, child);
    })

    return el;
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }
}
