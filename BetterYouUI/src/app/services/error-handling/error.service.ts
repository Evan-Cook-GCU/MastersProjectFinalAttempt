import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }
        if (error.message.includes('NG04002')) {
            return 'Page not found.'
        }
        return error.message ? error.message : error.toString();
    }

    getClientStack(error: Error): string | undefined {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }

    getServerStack(error: HttpErrorResponse): string {
        return error.error;
    }

    getServerNameAndStatusText(error: HttpErrorResponse): string {
        return `${error.name} ${error.statusText} ${error.message}`;
    }

    getNormalizedServerMessage(error: HttpErrorResponse) {
        const status = error.status;
        if (status === 400) return this.getHttpErrorMessage(error, 'Bad Request');
        if (status === 401 || status === 403) return this.getHttpErrorMessage(error, 'Unauthorized', 'Attempted to perform an unauthorized action.');
        if (status === 404) return this.getHttpErrorMessage(error, 'Not Found', 'The requested resource was not found.');
        if (status === 500) return this.getHttpErrorMessage(error, 'Internal Server Error', 'An unknown error occurred.');

        return this.getServerNameAndStatusText(error);
    }

    getHttpErrorMessage(error: HttpErrorResponse, label: string, defaultMessage?: string) {
        const message = error.headers.get('X-Status-Reason') || defaultMessage;
        return message ? `${label}: ${message}` : label;
    }
}
