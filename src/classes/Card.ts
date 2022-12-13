export class Cards extends Array<Card> {
    /* Constructor overloads */
    constructor(size?: number | undefined);
    constructor(cards: Array<Card>);

    /**
     * Creates a list of members
     * @desc Support passing in an array of members or
     * setting the initial length of the members array 
     * @param {Array<Card> | number} value
     */
    constructor(value?: Array<Card> | number) {
        if (value instanceof Array) {
            if (value.length === 1) {
                super();
                this.push(value[0])
            } else super(...value);
        } else if (value) {
            super(value);
        } else {
            super();
        }
    }

    // TODO: serialization methods
}

export class Card implements ICardData {
    id: string;
    title: string;
    creator: string;
    // Temp going to make this use markdown
    private _description: string = "";

    constructor(id: string, title: string, creator: string);
    constructor(id: string, title: string, creator: string, description: string);

    constructor(id: string, title: string, creator: string, description?: string) {
        this.id = id;
        this.title = title;
        this.creator = creator;
        this._description = description ?? this._description;
    }

    // Getters and Setters

    get description(): string {
        return this._description;
    }

    set description(newDesc: string) {
        this._description = newDesc;
    }
}

export interface ICardData {
    id: string,
    title: string,
    description: string,
    creator: string
}

type CardTuple = [id: string, title: string, description: string];