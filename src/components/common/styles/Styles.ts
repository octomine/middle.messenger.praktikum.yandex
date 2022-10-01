import Handlebars from 'handlebars/dist/handlebars.runtime';
import { HelperOptions } from 'handlebars';
import tmpl from './tmpl.hbs';

Handlebars.registerPartial('styles', tmpl);

Handlebars.registerHelper('split', (data: string) => (typeof data === 'string' ? data.split(',') : []));
Handlebars.registerHelper('trim', (data: string) => data.trim());
Handlebars.registerHelper('concat', (...args: string[]) => (args.length === 0
  ? args
  : args
    .filter((item) => typeof item === 'string' && item.length > 0)
    .reduce((res, curr) => `${res},${curr}`)));
Handlebars.registerHelper('removeSpaces', function (options: HelperOptions) {
  return options.fn(this).replace(/\s+/g, ' ');
});
