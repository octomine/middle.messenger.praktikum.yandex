import Block from "../../../../../../components/base";
import "../../../../../../components/label";

import tmpl from "./tmpl.hbs";

interface LineProps {
  name: string,
  key: string,
  value: string,
}

export default class Line extends Block<LineProps> {
  constructor(props: LineProps) {
    super(props);
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
