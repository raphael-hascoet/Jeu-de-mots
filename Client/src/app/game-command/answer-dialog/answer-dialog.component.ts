import { DefinitionsService } from './../../service/definitions.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-answer-dialog',
    templateUrl: './answer-dialog.component.html',
    styleUrls: ['./answer-dialog.component.css'],
})
export class AnswerDialogComponent implements OnInit {
    private definitions: Array<string>;

    constructor(
        private definitionsService: DefinitionsService,
        public dialogRef: MatDialogRef<AnswerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {
        this.definitionsService
            .getDefinitions(this.data.answer)
            .subscribe((data: Array<string>) => {
                console.log(data);
                this.definitions = data;
            });
    }
}

interface DialogData {
    answer: string;
}
