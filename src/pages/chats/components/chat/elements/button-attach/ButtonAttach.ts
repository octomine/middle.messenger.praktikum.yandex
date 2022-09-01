import Block from "../../../../../../components/base";

import tmpl from './tmpl.hbs';

interface ButtonAttachProps {

}

export default class ButtonAttach extends Block<ButtonAttachProps> {
  constructor(props: ButtonAttachProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
