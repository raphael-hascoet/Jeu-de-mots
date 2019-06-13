import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-best-words',
    templateUrl: './best-words.component.html',
    styleUrls: ['./best-words.component.css'],
})
export class BestWordsComponent implements OnInit {
    /**
     * Texte de la boite de dialogue
     */
    text: string;
    constructor(
        public dialogRef: MatDialogRef<BestWordsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {
        let nbWords = data.words.length;
        if (nbWords != 0) {
            this.text =
                'Les ' +
                nbWords +
                ' mots ayant rapporté le plus de points sont :';
        } else {
            this.text = "Votre équipe n'a encore rentré aucun mot.";
        }
    }

    ngOnInit() {}
}

interface DialogData {
    words: Array<string>;
}
