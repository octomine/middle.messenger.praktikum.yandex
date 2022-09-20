import Block, { TBlockProps } from '../../../../components/common/block';
import Avatar from '../../../../components/avatar';
import tmpl from './tmpl.hbs';

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
    this.children.avatar = new Avatar({ block: 'chat', modifiers: 's' });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
