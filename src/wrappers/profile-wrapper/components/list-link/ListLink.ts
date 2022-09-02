import List, { ListProps } from "../../../../components/list";
import LineLink, { LineLinkProps } from './elements/line-link';

export default class ListLink extends List {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: LineLinkProps): LineLink {
    return new LineLink(field);
  }
}
