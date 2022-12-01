/*
    Exported classes: Members
*/

export class Members extends Array<Member> {
    /* Constructor overloads */
    constructor(size?: number | undefined);
    constructor(members: Array<Member>);

    /**
     * Creates a list of members
     * @desc Support passing in an array of members or
     * setting the initial length of the members array 
     * @param {Array<Member> | number} value
     */
    constructor(value?: Array<Member> | number) {
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

interface IMember {
    username: string;
}

export class Member implements IMember {
    username: string;

    constructor(username: string) {
        this.username = username;
    }

    // TODO: serialization methods
}