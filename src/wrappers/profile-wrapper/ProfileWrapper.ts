import Block, { TBlockProps } from '../../components/common/block';

import Avatar from './components/avatar';
import tmpl from './tmpl.hbs';

interface ProfileProps extends TBlockProps {
  title?: string,
}

export default class ProfileWrapper extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }

  init() {
    this.children.avatar = new Avatar({ click: () => console.log('avatar clicked!!1') });
  }

  submit() {
    console.log(this.children.content.collect());
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
