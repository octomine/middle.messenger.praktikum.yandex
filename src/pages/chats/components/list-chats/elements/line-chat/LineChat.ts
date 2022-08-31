import Block from "../../../../../../components/base";
import tmpl from './tmpl.hbs';
import { getTime } from "../../../../../../utils/time";

interface LineChatProps {

}

export default class LineChat extends Block<LineChatProps> {
  constructor(props: LineChatProps) {
    super(props);
  }

  render() {
    const { title: txt, last_message: { content: msg, time }, unread_count: unread } = this.props;

    return this.compile(tmpl, { title: { txt }, msg, time: getTime(time), unread });
  }
}
