import List, { ListProps } from "../../../../../../components/list";
import LineMessage from "../line-message";
import { TBlockProps } from "../../../../../../components/common/block";

export default class ListMessages extends List {
  constructor(props: ListProps) {
    super({ ...props, block: 'chat_sheet' });
  }

  line(field: TBlockProps): LineMessage {
    return new LineMessage(field);
  }
}
