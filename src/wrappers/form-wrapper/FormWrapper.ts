import Block, { TBlockProps } from '../../components/common/block';
import { Indexed } from '../../store/Store';

import Button from '../../components/button';

import ListForm from './components/list-form';

import tmpl from './tmpl.hbs';
import Router from '../../router/Router';
import ListCollector from '../../components/list-collector';
import { isEqual } from '../../utils/is-equal';

export interface FormProps extends TBlockProps {
  title: string;
  block: string;
  button: string;
  link: string;
  errors?: Indexed;
  submit: () => void;
  linkPath: string;
  fields: Record<string, any>[];
}

export default class FormWrapper extends Block<FormProps> {
  constructor(props: FormProps) {
    super(props);
  }

  get list(): ListCollector {
    return this.children.list as ListCollector;
  }

  init() {
    const {
      block, button, link, submit, linkPath, fields,
    }: FormProps = this.props;

    this.children.list = new ListForm({ block, fields });
    this.children.button = new Button({
      title: button,
      events: {
        click: submit,
      },
    });
    this.children.link = new Button({
      title: link,
      modifiers: 'link',
      events: {
        click: () => Router.go(linkPath),
      },
    });
  }

  submit(): Record<string, string> | undefined {
    return this.list.collect();
  }

  componentDidUpdate(oldProps: FormProps, newProps: FormProps): boolean {
    const { fields: oldFields } = oldProps;
    const { fields } = newProps;
    if (!isEqual(oldFields as Indexed, fields as Indexed)) {
      this.list.setProps({ fields });
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
