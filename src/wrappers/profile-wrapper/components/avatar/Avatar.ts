import Block from '../../../../components/common/block';
import { TBlockProps } from '../../../../components/base/types';

import tmpl from "./tmpl.hbs";

export default class Avatar extends Block<TBlockProps> {
  constructor(events: Record<string, () => void>) {
    super({ events });
  }

  render() {
    return this.compile(tmpl, {});
  }
}
