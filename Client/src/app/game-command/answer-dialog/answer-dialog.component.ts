import { DefinitionsBoxComponent } from './../../definitions-box/definitions-box.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-answer-dialog',
    templateUrl: './answer-dialog.component.html',
    styleUrls: ['./answer-dialog.component.css'],
})
export class AnswerDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<AnswerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit() {}
}

interface DialogData {
    answer: string;
}
