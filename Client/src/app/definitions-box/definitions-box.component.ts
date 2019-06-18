import { DefinitionsService } from './../service/definitions.service';
import { Component, OnInit, Input } from '@angular/core';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

@Component({
    selector: 'app-definitions-box',
    templateUrl: './definitions-box.component.html',
    styleUrls: ['./definitions-box.component.css'],
})
export class DefinitionsBoxComponent implements OnInit {
    @Input() word: string;

    private definedWord: string = '';
    private definitions: Array<string>;

    constructor(private definitionsService: DefinitionsService) {}

    ngOnInit() {
        this.definitionsService
            .getDefinitions(this.word)
            .subscribe((data: any) => {
                console.log(data);
                this.definedWord = data.word;
                this.definitions = data.defs;
            });
    }
}
