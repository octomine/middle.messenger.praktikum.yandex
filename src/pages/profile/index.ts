import { render } from '../../utils/render';

import ProfileWrapper from '../../wrappers/profile-wrapper';
import Button from '../../components/button';

const ctx = {
  title: "Восилей",
  content: {
    blockType: Button,
    fields: [
      { name: "change", label: "Изменить данные" }
    ]
  }
}

const profile = new ProfileWrapper(ctx);

render('.main', profile);
