declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';

  const tmpl: TemplateDelegate;

  export default tmpl;
}

declare module 'handlebars/dist/handlebars.runtime';
