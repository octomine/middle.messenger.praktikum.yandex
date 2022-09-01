import List from "../../../../components/list";
import LineLink from './elements/line-link';

interface ListLinkProps {

}

export default class ListLink extends List {
  constructor(props: ListLinkProps) {
    super(props);
  }

  line(field): LineLink {
    return new LineLink(field);
  }
}
