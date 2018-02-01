import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from './http.service';
import { Router } from '@angular/router';
function httpServiceFactory(backend: XHRBackend, options: RequestOptions, route : Router) {
    return new HttpService(backend, options, route);
}
export { httpServiceFactory };