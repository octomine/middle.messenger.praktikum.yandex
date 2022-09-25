import Block, { TBlockProps } from '../../../../components/common/block';

import tmpl from './tmpl.hbs';

export default class Upload extends Block<TBlockProps> {
  constructor(props: TBlockProps) {
    super(props);
  }

  get formData(): FormData {
    const fd = new FormData();
    fd.append('avatar', this.element?.files[0]);
    return fd;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
