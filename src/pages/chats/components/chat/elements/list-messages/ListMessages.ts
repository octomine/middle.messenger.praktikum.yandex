import List from "../../../../../../components/list";
import LineMessage from "../line-message/LineMessage";

export default class ListMessages extends List {
  constructor(props) {
    super({ ...props, block: 'chat_sheet' });
  }

  line(field): LineMessage {
    return new LineMessage(field);
  }
}
