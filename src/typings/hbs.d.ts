declare module "*.hbs" {
  import { TemplateDelegate } from 'handlebars';

  declare const tmpl: TemplateDelegate;

  export default tmpl;
}
