import { ListProps } from '../../../../components/list';
import ListCollector from '../../../../components/list-collector';
import { InputWrappedProps } from '../../../../components/input-wrapped';
import LineInput from './elements/line-input';

export default class ListInput extends ListCollector {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: InputWrappedProps): LineInput {
    return new LineInput(field);
  }
}
