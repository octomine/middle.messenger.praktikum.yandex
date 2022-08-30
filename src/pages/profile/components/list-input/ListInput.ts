import List from "../list";
import LineInput from './elements/line-input';

interface ListInputProps {

}

export default class ListInput extends List {
  constructor(props: ListInputProps) {
    super(props);
  }

  collect() {
    // TODO: валидация?
    this.children.fields.map(({ name, value }) => {
      if (name) {
        console.log(`${name}: ${value}`);
      }
    });
  }

  line(field): LineInput {
    return new LineInput(field);
  }
}
