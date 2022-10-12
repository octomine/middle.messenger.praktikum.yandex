import { TBlockProps } from '../common/block';

export interface InputWrappedProps extends TBlockProps {
  name: string;
  title: string;
  value?: string;
  placeholder?: string;
  isRequired?: boolean;
  isPassword?: boolean;
  isEqual?: string;
  validated?: boolean;
  errorSpace?: string;
}
