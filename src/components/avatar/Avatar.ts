import Block from "../common/block";
import '../common/styles';

import tmpl from './tmpl.hbs';

interface AvatarProps {

}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
