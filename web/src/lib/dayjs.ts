import { default as lib } from 'dayjs';
import { default as locale } from 'dayjs/locale/pt-br';
import { default as relativeTime } from 'dayjs/plugin/relativeTime';

lib.locale(locale);
lib.extend(relativeTime);

export const dayjs = lib;
