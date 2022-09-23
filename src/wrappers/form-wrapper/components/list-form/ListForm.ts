import ListCollector, { ListCollectorProps } from '../../../../components/list-collector';
import { InputWrappedProps } from '../../../../components/input-wrapped';
import LineForm from './elements/line-form';
import ControllerInput from '../../../../controllers/ControllerInput';

export default class ListForm extends ListCollector {
  constructor(props: ListCollectorProps) {
    super(props);
  }

  line(field: InputWrappedProps): LineForm {
    const { title: placeholder } = field;
    return new LineForm({ ...field, placeholder, resetError: this.resetError.bind(this) });
  }

  resetError(name: string) {
    const { errorSpace } = this.props;
    ControllerInput.setError(`${errorSpace}.${name}`, null);
  }
}
