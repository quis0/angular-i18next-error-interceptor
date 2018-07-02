import { InjectionToken } from '@angular/core';

export const HTTP_STATUS_DICTIONARY = new InjectionToken<{ [key: string]: string }>('HTTP_STATUS_LOCALE_KEYS');
