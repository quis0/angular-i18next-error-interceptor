import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import * as tokens from './i18next-error.tokens';
import { I18NextErrorInterceptor } from './i18next-error.interceptor';
import { HttpErrorResponseMessage } from './http-error-response-message.pipe';

export type Dic = { [key: string]: string };

export const DEFAULT_STATUS_KEYS: Dic  = {
    400: 'http_error:validation_error',
    401: 'http_error:not_authorized',
    403: 'http_error:access_denied',
    500: 'http_error:internal_server_error',
    'default': 'http_error:unknown_server_error'
};

const declarations = [
    HttpErrorResponseMessage
];

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: declarations,
    exports: declarations,
    providers: []
})
export class I18NextErrorInterceptorModule {
    static forRoot(httpStatusDictionary: Dic = null): ModuleWithProviders {
        return {
            ngModule: I18NextErrorInterceptorModule,
            providers: [
                {
                    provide: tokens.HTTP_STATUS_DICTIONARY,
                    useValue: httpStatusDictionary || DEFAULT_STATUS_KEYS
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: I18NextErrorInterceptor,
                    multi: true
                }
            ]
        };
    }
}
