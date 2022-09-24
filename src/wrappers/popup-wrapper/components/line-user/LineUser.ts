import Block, { TBlockProps } from '../../../../components/common/block';
import Avatar from '../../../../components/avatar';
import tmpl from './tmpl.hbs';
import { HTTPTransport } from '../../../../services/network';
import { Indexed } from '../../../../store';

export interface LineUserProps extends TBlockProps {

}

export default class LineUser extends Block<LineUserProps> {
  constructor(props: LineUserProps) {
    super(props);
  }

  get userId(): string {
    return this.props.id;
  }

  init() {
    this.children.avatar = new Avatar({
      block: 'chat',
      modifiers: 's',
      img: `${HTTPTransport.API_URL}/resources/${this.props.avatar}`,
    });
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    this.children.avatar.setProps({ img: `${HTTPTransport.API_URL}/resources/${newProps.avatar}` });
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
