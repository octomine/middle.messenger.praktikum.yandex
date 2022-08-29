import Block from '../../components/base';
import { TBlockProps } from '../../components/base/types';

import Avatar from '../../pages/profile/components/avatar';
import List from '../../components/list/List';
import tmpl from "./tmpl.hbs";

interface ProfileProps extends TBlockProps {
  title?: string,
  fields: [],
}

export default class ProfileWrapper extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }

  init() {
    const { content } = this.props;

    this.children.avatar = new Avatar({ click: () => console.log('avatar clicked!!1') });
    this.children.content = new List(content);
  }

  render() {
    const { title } = this.props;
    return this.compile(tmpl, { title });
  }
}
