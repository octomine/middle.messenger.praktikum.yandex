import Handlebars from 'handlebars/dist/handlebars.runtime';
import tmpl from './tmpl.hbs';

Handlebars.registerPartial('styles', tmpl);

Handlebars.registerHelper('split', (data: string) => (typeof data === 'string' ? data.split(',') : []));
Handlebars.registerHelper('trim', (data: string) => data.trim());
Handlebars.registerHelper('concat', (...args: string[]) => (args.length === 0
  ? args
  : args
    .filter((item) => typeof item === 'string' && item.length > 0)
    .reduce((res, curr) => `${res},${curr}`)));
Handlebars.registerHelper('removeSpaces', (data: string) => data.replace(/ +/g, ' '));
