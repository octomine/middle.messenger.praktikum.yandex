import Block from '../../components/common/block';

import Avatar from './components/avatar';
import tmpl from "./tmpl.hbs";

interface ProfileProps {
  title?: string,
  fields: [],
}

export default class profile_wrapper extends Block<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }

  init() {
    this.children.avatar = new Avatar({ click: () => console.log('avatar clicked!!1') });
  }

  check() {
    // TODO: придумать более правильное название и проверять можно ли так делать
    this.children.content.collect();
  }

  render() {
    const { title } = this.props;
    return this.compile(tmpl, { title });
  }
}
