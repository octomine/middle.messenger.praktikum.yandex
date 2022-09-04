import ListCollector from '../../../../components/list-collector';
import { ListProps } from '../../../../components/list';
import { InputWrappedProps } from '../../../../components/input-wrapped';
import LineForm from './elements/line-form';

export default class ListForm extends ListCollector {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: InputWrappedProps): LineForm {
    const { title: placeholder } = field;
    return new LineForm({ ...field, placeholder });
  }
}
