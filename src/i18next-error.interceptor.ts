import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HTTP_STATUS_DICTIONARY } from './i18next-error.tokens';

interface ILocalizedServerError {
    message?: string;
}

@Injectable()
export class I18NextErrorInterceptor implements HttpInterceptor {

    statusKeys: any;

    constructor(
        private injector: Injector // https://github.com/angular/angular/issues/18224
    ) {
        this.statusKeys = this.injector.get(HTTP_STATUS_DICTIONARY);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) => {}, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    this.HandleErrorMessage(err);
                }
            })
        );
    }

    private HandleErrorMessage(errorResponse: HttpErrorResponse): HttpErrorResponse {
        if (!errorResponse) {
            return errorResponse;
        }
        let errorEntity: ILocalizedServerError;
        // if error is object or json string that can be parsed
        try {
            if (errorResponse.error instanceof Object) {
                errorEntity = errorResponse.error;
            }
            else {
                errorEntity = JSON.parse(errorResponse.error);
            }
        }
        catch (ex) {}
        // if object got message: server localized message by himself (no need to translate)
        if (!(errorEntity && errorEntity.message)) {
            errorEntity = { message: this.GetLocalizedStatusMessage(errorResponse.status) };
        }
        // modify error response with client localized message
        return new HttpErrorResponse(
            Object.assign(errorResponse, { error: errorEntity })
        );
    }

    private GetLocalizedStatusMessage(status: number = undefined): string {
        const i18nextService: ITranslationService = this.injector.get(I18NEXT_SERVICE);
        let errorKey = this.statusKeys[status] || this.statusKeys.default;
        return i18nextService.t(errorKey);
    }
}
