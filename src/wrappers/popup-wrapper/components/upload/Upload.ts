import Block, { TBlockProps } from '../../../../components/common/block';

import tmpl from './tmpl.hbs';

export default class Upload extends Block<TBlockProps> {
  constructor(props: TBlockProps) {
    super(props);
  }

  get formData(): FormData | null {
    const input = this.element as HTMLInputElement;
    if (input) {
      const fd = new FormData();
      fd.append('avatar', input.files[0]);
      return fd;
    }
    return null;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
HTMLInputElement
