import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';

import * as Highcharts from 'highcharts';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-game-stats-view',
    templateUrl: './game-stats-view.component.html',
    styleUrls: ['./game-stats-view.component.css'],
})
export class GameStatsViewComponent implements OnInit {
    @Input() parent: AppComponent;
    @ViewChild('chronologie') chronoGraph: Highcharts.Chart;
    highcharts = Highcharts;
    //Graph Chronologie
    updateChronologie = false; //boolean pour l'update du graph
    chronologie: Highcharts.Options = {
        chart: {
            type: 'spline',
        },
        title: {
            text: 'Chronologie de la partie',
        },
        subtitle: {
            text: 'Tout est une question de temps',
        },
        xAxis: {
            categories: [],
        },
        yAxis: {
            title: {
                text: 'Score du mot',
            },
        },
        tooltip: {
            valueSuffix: ' pts',
        },
        series: [
            {
                data: [],
            } as Highcharts.SeriesSplineOptions,
        ],
    };

    //Bar chart
    updateBar = false;
    barChart: Highcharts.Options = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Nombre de propositions par nombre de lettres',
        },
        subtitle: {
            text: '1111',
        },
        xAxis: {
            categories: ['Jan'],
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: 'proposition(s)',
            },
        },
        tooltip: {
            headerFormat:
                '<span style="font-size:10px">Nombre de lettres : {point.key}</span><table>',
            pointFormat:
                '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} propositions</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: '',
                data: [],
            } as Highcharts.SeriesColumnOptions,
        ],
    };

    //global stats variables
    teamName = 'Equiiiipe';
    globalScore;
    globalNbTries;
    gameTime;
    players: {
        name: string;
        score: number;
        efficiency: number;
        tries: number;
        badge: string;
    }[] = [];

    constructor(private gameService: GameService) {}

    ngOnInit() {
        this.gameService.getChronologie().subscribe(msg => {
            this.chronologie.xAxis = { categories: msg[0][0] };
            this.chronologie.series = [
                {
                    data: msg[0][1],
                } as Highcharts.SeriesSplineOptions,
            ];
            this.updateChronologie = true;
        });

        this.gameService.getNbLettres().subscribe(msg => {
            this.barChart.xAxis = {
                categories: msg[0][0],
                crosshair: true,
            };
            this.barChart.series = [
                {
                    name: msg[0][1].keyStore[0],
                    data: msg[0][1].valueStore[0],
                } as Highcharts.SeriesColumnOptions,
            ];
            this.updateBar = true;
        });

        this.gameService.getGameStats().subscribe(msg => {
            console.log('Stats', msg);
            this.globalScore = msg[0][0][0];
            this.globalNbTries = msg[0][0][1];
            this.gameTime = msg[0][0][2];

            msg[0][1].forEach(player => {
                let effi: number = +player[2];
                this.players.push({
                    name: player[0],
                    score: player[1],
                    efficiency: parseFloat(effi.toFixed(2)),
                    tries: player[3],
                    badge: player[4],
                });
            });
        });
    }
}
