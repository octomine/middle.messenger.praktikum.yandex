import Block, { TBlockProps } from '../../../../components/common/block';

import tmpl from './tmpl.hbs';

export interface UploadProps extends TBlockProps {
  formData: FormData;
}

export default class Upload extends Block<TBlockProps> {
  constructor(props: TBlockProps) {
    super(props);
  }

  get formData(): FormData | null {
    const input = this.element as HTMLInputElement;
    const fd = new FormData();
    fd.append('avatar', input.files![0]);
    return fd;
  }

  render() {
    return this.compile(tmpl, this.props);
  }
}
