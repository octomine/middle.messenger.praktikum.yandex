import List from "../../../../components/list";
import LineForm from "./elements/line-form/LineForm";

export default class ListForm extends List {
  constructor(props) {
    super(props);
  }

  line(field: object): LineForm {
    const { title: placeholder } = field;
    return new LineForm({ ...field, placeholder });
  }

  collect() {
    const { fields } = this.children;
    fields.forEach(({ name, value }) => console.log(`${name}: ${value}`))
  }
}
