import tmpl from "./tmpl.hbs";
import Block from "../../../../../../components/base";
import Button from "../../../../../../components/button";

interface LineLinkProps {
  label: string,
  modifiers: string,
}

export default class LineLink extends Block<LineLinkProps> {
  constructor(props: LineLinkProps) {
    super(props);
  }

  init() {
    const { modifiers: mods } = this.props;
    const modifiers = mods ? `${mods},link` : 'link';
    this.children.button = new Button({ ...this.props, modifiers });
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
