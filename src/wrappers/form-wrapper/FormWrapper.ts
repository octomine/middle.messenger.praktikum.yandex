import Block, { TBlockProps } from '../../components/common/block';
import Store, { Indexed } from '../../store/Store';

import Button from '../../components/button';
import '../../components/label';

import ListForm from './components/list-form';

import tmpl from './tmpl.hbs';
import Router from '../../router/Router';
import ListCollector from '../../components/list-collector';

export interface FormProps extends TBlockProps {
  title: string,
  block: string,
  button: string,
  link: string,
  errors?: Indexed,
  submit: () => void,
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
    } = this.props;

    this.children.list = new ListForm({ block, fields });
    this.children.button = new Button({
      label: button,
      events: {
        click: submit,
      },
    });
    this.children.link = new Button({
      label: link,
      modifiers: 'link',
      events: {
        click: () => Router.go(linkPath),
      },
    });
  }

  submit(): object {
    return this.list.collect();
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    console.log('CDU');
    const { errors } = newProps;
    if (errors) {
      this.list.update(errors as Indexed);
    }
    return true;
  }

  render() {
    const { title: txt, block } = this.props;

    return this.compile(tmpl, { title: { txt }, block });
  }
}
