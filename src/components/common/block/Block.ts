import { v4 as makeID } from 'uuid';
import { TemplateDelegate } from 'handlebars/runtime';
import { EventBus } from '../../../utils';
import { merge } from '../../../utils/merge';
import { Indexed } from '../../../store/Store';
import { isEqual } from '../../../utils/is-equal';

export interface TBlockProps extends Record<string, any> {
  block?: string,
  modifiers?: string,
  events?: Record<string, (...args: any[]) => void>,
}

export type TChildren = Record<string, Block<any>> & {
  fields?: Block<any>[];
};

export default class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id: string | null = null;

  protected props: P;

  protected children: TChildren;

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  constructor(propsAndChildren: P) {
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

  private _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block> } {
    const children: Record<string, Block<any>> = {};
    const props: Record<string, unknown> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  private _makePropsProxy(props: P) {
    return new Proxy(props, {
      get: (target, prop: string) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop: string, value) => {
        const old = { ...target };
        target[prop as keyof P] = value;

        this.eventBus().emit(Block.EVENTS.FLOW_CDU, old, { ...target });
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет прав');
      },
    });
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createDocumentElement(tagName: string): HTMLTemplateElement {
    const el = document.createElement(tagName) as HTMLTemplateElement;
    return el;
  }

  private _init() {
    this.init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((evtName) => {
      this._element?.addEventListener(evtName, events[evtName]);
    });
  }

  private _removeEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((evtName) => {
      this._element?.removeEventListener(evtName, events[evtName]);
    });
  }

  private _componentDidMount() {
    this.componentDidMount();

    const dispatchCDMInner = (children: Block<any>[]): void => {
      children.forEach((child) => {
        if (Array.isArray(child)) {
          dispatchCDMInner(child);
        } else {
          child.dispatchComponentDidMount();
        }
      });
    };
    dispatchCDMInner(Object.values(this.children) as Block<any>[]);
  }

  private _componentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render() {
    const newElement = this.render().firstElementChild as HTMLElement;
    newElement?.setAttribute('data-id', this.id as string);

    this._removeEvents();

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }
    this._element = newElement;

    this._addEvents();
  }

  public setProps = (newProps: Indexed) => {
    if (!newProps) {
      return;
    }

    merge(this.props, newProps);
  };

  public getContent() {
    return this.element;
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  public show() {
    this.getContent()!.style.display = 'flex';
  }

  public hide() {
    this.getContent()!.style.display = 'none';
  }

  // переопределяется в наследниках
  protected init() { }

  protected componentDidMount() { }

  protected componentDidUpdate(oldProps: P, newProps: P) {
    return !isEqual(oldProps, newProps);
  }

  protected compile(tmpl: TemplateDelegate, props: any) {
    const stub = (id: string | null): string => `<div data-id='${id}'></div>`;
    const replaceStub = (el: DocumentFragment, block: Block<any>): void => {
      const { id } = block;
      const currentStub = el.querySelector(`[data-id='${id}']`);
      if (currentStub) {
        currentStub.replaceWith(block.getContent()!);
      }
    };

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
        child.forEach((inner) => replaceStub(el, inner));
      }
      replaceStub(el, child as Block<any>);
    });

    return el;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }
}
