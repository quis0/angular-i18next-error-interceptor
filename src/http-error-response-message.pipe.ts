import { Pipe, PipeTransform } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Pipe({
    name: 'http-error-response-message',
})
export class HttpErrorResponseMessage implements PipeTransform {
    transform(httpErrorResp: HttpErrorResponse): string {
        if (!httpErrorResp || !httpErrorResp.error) {
            return '';
        }
        return httpErrorResp.error.message;
    }
}
