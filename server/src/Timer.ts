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

    /**
     * Méthode permettant de démarrer le timer et d'envoyer le nouveau temps au client via la socket, après chaque seconde
     * @param socket - Socket de connexion au client
     */
    public startTimer(socket: any) {
        this.timer = setInterval(() => {
            this.seconds++;
            console.log(this.seconds);
            if (this.seconds == 60) {
                this.minutes++;
                this.seconds = 0;
            }
            socket.emit('timer', [this]);
        }, 1000);
    }

    /**
     * Méthode permettant d'arrêter le timer
     */
    public stopTimer() {
        clearInterval(this.timer);
    }
}
