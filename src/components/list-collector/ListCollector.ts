import List, { ListProps } from '../list/List';
import InputWrapped from '../input-wrapped';
import { InputErrors } from '../../consts';
import ControllerInput from '../../controllers/ControllerInput';

export interface ListCollectorProps extends ListProps {
  errorSpace?: string;
}

export default class ListCollector extends List {
  constructor(props: ListCollectorProps) {
    super(props);
  }

  collect(): object {
    let error = false;
    const { fields } = this.children;
    const { errorSpace } = this.props;
    const result = fields.reduce((res: object, field: InputWrapped) => {
      field.setProps({ error: null });
      const {
        name, value, isRequired, isEqual, validated,
      } = field;
      if (!value && isRequired) {
        ControllerInput.setError(`${errorSpace}.${field.name}`, InputErrors.IsRequired);
        error = true;
      }
      if (value && validated) {
        error = true;
      }
      if (isEqual) {
        const contestee = this.getField(isEqual);
        if (contestee.value !== value) {
          ControllerInput.setError(`${errorSpace}.${contestee.name}`, InputErrors.NotEqual);
          ControllerInput.setError(`${errorSpace}.${field.name}`, InputErrors.NotEqual);
          error = true;
        }
      }
      return value ? { ...res, [name]: value } : res;
    }, {});
    return error ? {} : result;
  }
}
