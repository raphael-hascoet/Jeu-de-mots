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

    private isLoaded: boolean = false;
    private isDefined: boolean = false;
    private definedWord: string = '';
    private definitions: Array<string>;

    constructor(private definitionsService: DefinitionsService) {}

    ngOnInit() {
        this.definitionsService
            .getDefinitions(this.word)
            .subscribe((data: any) => {
                console.log(data);
                this.isLoaded = true;
                this.definedWord = data.word;
                this.definitions = data.defs;
                this.isDefined =
                    !!this.definedWord &&
                    !!this.definitions &&
                    this.definedWord !== '' &&
                    this.definitions !== [];
            });
    }
}
