import Block, { TBlockProps } from '../../../../components/common/block';
import Avatar from '../../../../components/avatar';
import tmpl from './tmpl.hbs';
import { HTTPTransport } from '../../../../services/network';

export interface LieUserProps extends TBlockProps {
  id: string;
}

export default class LineUser extends Block<LieUserProps> {
  constructor(props: LieUserProps) {
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

  componentDidUpdate(oldProps: LieUserProps, newProps: LieUserProps): boolean {
    this.children.avatar.setProps({ img: `${HTTPTransport.API_URL}/resources/${newProps.avatar}` });
    return super.componentDidUpdate(oldProps, newProps);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
