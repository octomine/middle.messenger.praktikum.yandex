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

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  }

  _element = null;
  _meta = null;

  constructor(tagName: string = "div", props: object = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    }

    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  get element() {
    return this._element;
  }

  _makePropsProxy(props) {
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

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  _createDocumentElement(tagName: string) {
    const el = document.createElement(tagName);
    console.log(el);
    return el;
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((evtName) => {
      this._element.addEventListener(evtName, events[evtName]);
    })
  }

  _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((evtName) => {
      this._element.removeEventListener(evtName, events[evtName]);
    })
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  _componentDidUpdate(newProps: object, oldProps: object) {
    if (this.componentDidUpdate(newProps, oldProps)) {
      this._render();
    }
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element.innerHTML = block;
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
    this._createResources();
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

  render() { }
}
