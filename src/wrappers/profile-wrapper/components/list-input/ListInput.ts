import List, { ListProps } from "../../../../components/list";
import LineInput, { LineInputProps } from './elements/line-input';

export default class ListInput extends List {
  constructor(props: ListProps) {
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

  line(field: LineInputProps): LineInput {
    return new LineInput(field);
  }
}
