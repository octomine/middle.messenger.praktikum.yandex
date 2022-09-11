import List, { ListProps } from '../list/List';
import InputWrapped from '../input-wrapped';
import { INPUT_ERRORS } from '../../utils/input-errors';

export default class ListCollector extends List {
  constructor(props: ListProps) {
    super(props);
  }

  getField(fieldName: string): InputWrapped {
    const { fields } = this.children;
    return fields.filter(({ name }) => name === fieldName)[0]; // name у всех уникальный
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
        field.setProps({ error: INPUT_ERRORS.IS_REQUIRED });
        error = true;
      }
      if (value && !validate.bind(field)(value)) {
        error = true;
      }
      if (isEqual) {
        const contestee = this.getField(isEqual);
        if (contestee.value !== value) {
          contestee.setProps({ error: INPUT_ERRORS.NOT_EQUAL });
          field.setProps({ error: INPUT_ERRORS.NOT_EQUAL });
          error = true;
        }
      }
      return value ? { ...res, [name]: value } : res;
    }, {});
    return error ? {} : result;
  }
}
