import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';


@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private injector: Injector, private router: Router, private ngZone: NgZone) { }

    handleError(error: Error | HttpErrorResponse) {
        let message: string;
        let stackTrace;
        
        const errorService = this.injector.get(ErrorService);

        if (error instanceof HttpErrorResponse) {
            // Server Error
            message = errorService.getNormalizedServerMessage(error);
        } else {
            // Client Error
            message = errorService.getClientMessage(error);
            stackTrace = errorService.getClientStack(error);
        }
        console.error(message, stackTrace);
        this.ngZone.run(() => this.router.navigate(['/error'], {state: {errorMessage: 'Error: ' + message}}))
        
    }
}
