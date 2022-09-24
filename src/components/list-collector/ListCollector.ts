import List, { ListProps } from '../list/List';
import InputWrapped, { InputWrappedProps } from '../input-wrapped';
import { InputErrors } from '../../consts';
import ControllerInput from '../../controllers/ControllerInput';

export default class ListCollector extends List {
  constructor(props: ListProps) {
    super(props);
  }

  // TODO: отнести как можно больше в контроллер
  collect(): object {
    let error = false;
    const { fields } = this.children;
    const result = fields.reduce((res: object, field: InputWrapped) => {
      field.setProps({ error: null });
      const { name, value } = field;
      const fieldProps = this.getFieldProps(name);
      const {
        isRequired, isEqual, validated, errorSpace,
      }: InputWrappedProps = fieldProps;
      if (!value && isRequired) {
        ControllerInput.setError(`${errorSpace}.${field.name}`, InputErrors.IsRequired);
        error = true;
      }
      if (value && validated) {
        ControllerInput.validate(fieldProps);
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
