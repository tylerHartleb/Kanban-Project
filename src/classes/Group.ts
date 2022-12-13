import { Cards, Card } from "./Card";

export interface IGroupData {
    cards: Cards,
    id: string,
    title: string
}

export class Group implements IGroupData {
    id: string;
    title: string;
    
    private _cards: Cards = new Cards();

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }

    set cards(newCards: Cards) {
        this._cards = newCards;
    }

    get cards(): Cards {
        return this._cards;
    }
}