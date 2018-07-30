import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
@Pipe({
    name: 'http-error-response-message',
})
export class HttpErrorResponseMessage implements PipeTransform {
    transform(httpErrorResp: HttpErrorResponse): string {
        if (!httpErrorResp || !httpErrorResp.error) {
            return null;
        }
        return httpErrorResp.error.message;
    }
}
