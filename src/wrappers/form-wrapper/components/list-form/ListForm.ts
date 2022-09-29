import ListCollector from '../../../../components/list-collector';
import { InputWrappedProps } from '../../../../components/input-wrapped';
import LineForm from './elements/line-form';
import { ListProps } from '../../../../components/list';

export default class ListForm extends ListCollector {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: InputWrappedProps): LineForm {
    const { title: placeholder } = field;
    return new LineForm({ ...field, placeholder });
  }
}
