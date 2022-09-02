import Block, { TBlockProps } from '../../../../components/common/block';

import tmpl from "./tmpl.hbs";

export default class Avatar extends Block<TBlockProps> {
  constructor(events: Record<string, () => void>) {
    super({ events });
  }

  render() {
    return this.compile(tmpl, {});
  }
}
