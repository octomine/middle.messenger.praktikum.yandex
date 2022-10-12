import ControllerInput from '@controllers/ControllerInput';
import List, { ListProps } from '../list/List';
import InputWrapped, { InputWrappedProps } from '../input-wrapped';
import { InputErrors } from '../../consts';

export default class ListCollector extends List {
  constructor(props: ListProps) {
    super(props);
  }

  // TODO: отнести как можно больше в контроллер
  collect(): Record<string, string> | undefined {
    let error = false;
    const { fields } = this.children;
    const result = fields?.reduce((res, field) => {
      field.setProps({ error: null });
      const { name, value } = field as InputWrapped;
      const fieldProps = this.getFieldProps(name) as InputWrappedProps;
      const {
        isRequired, isEqual, validated, errorSpace,
      } = fieldProps;
      if (!value && isRequired) {
        ControllerInput.setError(`${errorSpace}.${name}`, InputErrors.IsRequired);
        error = true;
      }
      if (value && validated) {
        ControllerInput.validate(fieldProps);
      }
      if (isEqual) {
        const contestee = this.getField(isEqual) as InputWrapped;
        if (contestee.value !== value) {
          ControllerInput.setError(`${errorSpace}.${contestee.name}`, InputErrors.NotEqual);
          ControllerInput.setError(`${errorSpace}.${name}`, InputErrors.NotEqual);
          error = true;
        }
      }
      return value ? { ...res, [name]: value } : res;
    }, {} as Record<string, string>);
    return error ? {} : result;
  }
}
