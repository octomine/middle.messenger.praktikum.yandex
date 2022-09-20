import { TBlockProps } from '../../../../../../components/common/block';
import List, { ListProps } from '../../../../../../components/list';
import LinePopover from '../line-popover';
import { Indexed } from '../../../../../../store';

interface PopoverProps extends ListProps, TBlockProps {
  show?: () => void,
}

export default class Popover extends List {
  constructor(props: PopoverProps) {
    const { modifiers: mods } = props;
    const modifiers = mods ? `${mods},popover` : 'popover';

    super({ ...props, modifiers });
  }

  line(field: TBlockProps): LinePopover {
    return new LinePopover(field);
  }

  show(isShown: boolean = true) {
    this.setProps({ styles: isShown ? '' : 'hide' });
  }

  componentDidUpdate(oldProps: Indexed, newProps: Indexed): boolean {
    super.componentDidUpdate(oldProps, newProps);
    return true;
  }
}
