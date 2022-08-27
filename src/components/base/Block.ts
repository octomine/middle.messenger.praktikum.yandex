import { v4 as makeID } from 'uuid'

import EventBus from './event-bus';
import { TBlockProps } from './types';

const ERROR_NO_RIGHTS = new Error('Нет прав');
const checkPrivate = (prp: string): void => {
  if (prp.indexOf('_') === 0) {
    throw ERROR_NO_RIGHTS;
  };
}

export default class Block {
  eventBus: () => EventBus;
  props: TBlockProps;
  children: Record<string, Block>;

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  }

  _element = null;
  _meta = null;
  _id = null;

  constructor(propsAndChildren: TBlockProps = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsAndChildren);
    this.children = children;
    this._meta = {
      props,
    }
    this._id = makeID();

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  _getChildrenAndProps(childrenAndProps: TBlockProps) {
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
        checkPrivate(prop);

        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: object, prop: string, value) {
        checkPrivate(prop);

        target[prop] = value;
        // TODO: вот ОЧ прям внимательно подумать, как лучше передавать новые и старые пропсы
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw ERROR_NO_RIGHTS;
      }
    })
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createDocumentElement(tagName: string): HTMLElement {
    const el = document.createElement(tagName);
    return el;
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((evtName) => {
      this._element.addEventListener(evtName, events[evtName]);
    })
  }

  _removeEvents() {
    if (this._element) {
      const { events = {} } = this.props;
      Object.keys(events).forEach((evtName) => {
        this._element.removeEventListener(evtName, events[evtName]);
      });
    }
  }

  _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child: Block) => child.dispatchComponentDidMount());
  }

  _componentDidUpdate(newProps: object, oldProps: object) {
    if (this.componentDidUpdate(newProps, oldProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element = block.firstChild;
    this._element.setAttribute('data-id', this._id);
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

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  // переопределяется в наследниках
  componentDidMount() { }

  componentDidUpdate(newProps: object, oldProps: object) {
    // TODO: вот тут ОЧ прям внимательно подумать, как сравнивать
    return newProps !== oldProps;
  }

  compile(tmpl, props: TBlockProps) {
    const propsAndStubs = { ...props };
    Object.entries(this.children).forEach(([key, value]) => {
      propsAndStubs[key] = `<div data-id="${value._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template');
    fragment.innerHTML = tmpl(propsAndStubs);
    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub.replaceWith(child.getContent());
    })

    return fragment.content;
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }
}
