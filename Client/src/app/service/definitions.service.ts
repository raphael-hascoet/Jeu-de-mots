import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const env = environment;
@Injectable({
    providedIn: 'root',
})
export class DefinitionsService {
    constructor(private http: HttpClient) {}

    getDefinitions(word: string) {
        word = word.trim();
        const options = word
            ? { params: new HttpParams().set('word', word) }
            : {};

        return this.http.get(env['serverUrl'] + '/definitions', options);
    }
}
