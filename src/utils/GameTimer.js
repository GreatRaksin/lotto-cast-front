class GameTimer {
    constructor(gameName, onTimerEnd) {
        this.gameName = gameName;
        this.onTimerEnd = onTimerEnd;
        this.interval = null;
        this.remainingTime = 0;
    }

    start(countdownMinutes) {
        this.remainingTime = countdownMinutes * 60;
        if (this.interval) clearInterval(this.interval);

        this.interval = setInterval(() => {
            this.remainingTime -= 1;
            const minutes = Math.floor(this.remainingTime / 60);
            const seconds = this.remainingTime % 60;
            console.log(`${this.gameName} Timer: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);

            if (this.remainingTime <= 0) {
                clearInterval(this.interval);
                this.onTimerEnd(this.gameName);
            }
        }, 1000);
    }

    reset(countdownMinutes) {
        console.log(`Resetting ${this.gameName} Timer to ${countdownMinutes} minutes`);
        this.start(countdownMinutes);
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    // Новый метод getTime для получения оставшегося времени
    getTime() {
        const minutes = Math.floor(this.remainingTime / 60);
        const seconds = this.remainingTime % 60;
        return { minutes, seconds };
    }
}

export default GameTimer;
