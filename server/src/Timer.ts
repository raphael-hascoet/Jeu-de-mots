/**
 * Classe permettant de gérer le décompte du temps
 */
export class Timer {
    private seconds = 0;
    private minutes = 0;
    /**
     * Objet permettant d'appeler la méthode setInterval()
     */
    private timer: any;

    public constructor(minutes: number, seconds: number) {
        this.seconds = seconds;
        this.minutes = minutes;
    }

    /**
     * Méthode permettant de démarrer le timer
     */
    public startTimer() {
        console.log('startTime');
        this.timer = setInterval(() => {
            this.seconds++;
            if (this.seconds == 60) {
                this.minutes++;
                this.seconds = 0;
            }
        }, 1000);
    }

    /**
     * Méthode permettant d'arrêter le timer
     */
    public stopTimer() {
        clearInterval(this.timer);
    }

    /**
     * Getter permettant de récupérer un objet Timer à un instant t
     */
    public getTimer(): Timer {
        return new Timer(this.minutes, this.seconds);
    }

    public toString(): string {
        let timerMin = '';
        let timerSec = this.seconds + ' secondes';
        if (this.minutes > 0) {
            if (this.minutes == 1) {
                timerMin = this.minutes + ' minute ';
            } else {
                timerMin = this.minutes + ' minutes ';
            }
        }
        if (this.seconds <= 1) {
            timerSec = this.seconds + ' seconde';
        }
        return timerMin + timerSec;
    }
}
