import Block from "../../../../../../components/base";
import Avatar from "../../../../../../components/avatar/Avatar";

import tmpl from './tmpl.hbs';

interface ChaHeaderProps {

}

export default class ChatHeader extends Block<ChaHeaderProps> {
  constructor(props: ChaHeaderProps) {
    super(props);
  }

  init() {
    this.children.avatar = new Avatar({ block: 'chat_header', modifiers: 's' })
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
