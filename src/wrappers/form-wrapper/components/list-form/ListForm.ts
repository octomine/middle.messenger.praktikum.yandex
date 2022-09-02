import List, { ListProps } from "../../../../components/list";
import LineForm, { LineFormProps } from "./elements/line-form/LineForm";

export default class ListForm extends List {
  constructor(props: ListProps) {
    super(props);
  }

  line(field: LineFormProps): LineForm {
    const { title: placeholder } = field;
    return new LineForm({ ...field, placeholder });
  }

  collect() {
    const { fields } = this.children;
    fields.forEach(({ name, value }) => console.log(`${name}: ${value}`))
  }
}
