import Store, { StoreEvents } from "./";
import Block, { TBlockProps } from "../components/common/block";

export function connect(Component: typeof Block, mapStateToProps: (state: object) => object) {
  return class extends Component<TBlockProps> {
    constructor(props: TBlockProps) {
      super({ ...props, ...mapStateToProps(Store.getState()) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(Store.getState()) })
      })
    }
  }
}
