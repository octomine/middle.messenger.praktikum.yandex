import Block, { TBlockProps } from '@components/common/block';
import Store, { StoreEvents, Indexed } from './Store';

export function connect(mapStateToProps: (state: Indexed) => Indexed) {
  return function (Component: typeof Block) {
    return class extends Component<any> {
      constructor(props: TBlockProps) {
        super({ ...props, ...mapStateToProps(Store.getState()) });

        Store.on(StoreEvents.Updated, () => {
          this.setProps({ ...mapStateToProps(Store.getState()) });
        });
      }
    };
  };
}
