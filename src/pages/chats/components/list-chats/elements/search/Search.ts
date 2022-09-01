import Block from "../../../../../../components/base";

import tmpl from "./tmpl.hbs";

interface SearchProps {

}

export default class Search extends Block<SearchProps> {
  constructor(props: SearchProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}