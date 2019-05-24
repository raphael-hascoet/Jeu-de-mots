export class Player {
    private name: string;
    private team: string;

    constructor(name: string, team: string) {
        this.name = name;
        this.team = team;
    }

    getName(): string{
        return this.name;
    }

    getTeam(): string {
        return this.team;
    }
}
