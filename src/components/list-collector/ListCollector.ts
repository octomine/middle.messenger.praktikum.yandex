import List, { ListProps } from '../list/List';
import InputWrapped from '../input-wrapped';
import { InputErrors } from '../../consts';

export default class ListCollector extends List {
  constructor(props: ListProps) {
    super(props);
  }

  collect(): object {
    let error = false;
    const { fields } = this.children;
    const result = fields.reduce((res: object, field: InputWrapped) => {
      field.setProps({ error: null });
      const {
        name, value, isRequired, isEqual, validate,
      } = field;
      if (!value && isRequired) {
        field.setProps({ error: InputErrors.IsRequired });
        error = true;
      }
      if (value && !validate.bind(field)(value)) {
        error = true;
      }
      if (isEqual) {
        const contestee = this.getField(isEqual);
        if (contestee.value !== value) {
          contestee.setProps({ error: InputErrors.NotEqual });
          field.setProps({ error: InputErrors.NotEqual });
          error = true;
        }
      }
      return value ? { ...res, [name]: value } : res;
    }, {});
    return error ? {} : result;
  }
}
