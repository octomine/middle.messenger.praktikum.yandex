import Store from '../store';
import { InputWrappedProps } from '../components/input-wrapped';
import { getValidator, ValidType } from '../utils';

class ControllerInput {
  resetError(field: InputWrappedProps) {
    const { name, errorSpace }: InputWrappedProps = field;
    this.setError(`${errorSpace}.${name}`, null);
  }

  setError(name: string, error: string | null) {
    Store.set(`errors.${name}`, error);
  }

  validate(field: InputWrappedProps) {
    const { name, value, errorSpace }: InputWrappedProps = field;
    const { error }: ValidType = getValidator(name)(value);
    if (value && error) {
      this.setError(`${errorSpace}.${name}`, error);
    } else {
      this.setError(`${errorSpace}.${name}`, null);
    }
  }
}

export default new ControllerInput();
