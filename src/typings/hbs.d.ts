declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';

  const tmpl: TemplateDelegate;

  export default tmpl;
}
