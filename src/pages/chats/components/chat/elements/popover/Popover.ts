import List from "../../../../../../components/list";
import LinePopover from "../line-popover/LinePopver";

interface PopoverProps {

}

export default class Popover extends List {
  constructor(props: PopoverProps) {
    const { modifiers: mods } = props;
    const modifiers = mods ? `${mods},popover` : 'popover';

    super({ ...props, modifiers });
  }

  line(field): LinePopover {
    return new LinePopover(field);
  }

  show(isShown: boolean = true) {
    this.setProps({ styles: isShown ? '' : 'hide' });
  }
}
