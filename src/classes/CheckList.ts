/*
    Exported classes: CheckList, CheckListItemFactory
    Exported types: ICheckListItem, CheckListItem
*/

/**
 * `Public Class CheckList extends Array<CheckListItem>`
 * This class provides functions for manipulating checklists
 * @class
 * @classdesc This is a class for a check list for the kanban item
 */
export class CheckList extends Array<CheckListItem> {
    /**
     * This function specifies how the instances should be copied
     * When using map instead of returning the type CheckList this return the
     * parent type Array.
     * 
     * This is used to serialize the object into JSON
     */
    static get [Symbol.species]() {
        return Array;
    }

    /*
       Constructor overloads
       This is an easy lookup to ensure
    */
    constructor(size?: number);
    constructor(items: Array<CheckListItem>);

    /**
     * Creates a checklist
     * @desc Support passing in an array of check list items or
     * setting the initial length of the checklist 
     * @param {Array<CheckList> | number} items
     */
    constructor(items?: Array<CheckListItem> | number) {
        if (items instanceof Array) {
            if (items.length === 1) {
                super();
                this.push(items[0]);
            } else {
                super(...items);
            }
        } else if (items) {
            super(items);
        } else {
            super();
        }
    }


    /* Serialization methods */
    toJSON(): Object {
        const jsonArray: string[] = this.map(item => {
            return JSON.stringify(item);
        })

        return Object.assign({}, jsonArray);
    }

    static fromJSON(parsedItems: ICheckListItem[]): CheckList {
        return new CheckList(parsedItems.map(parsedItem => BaseCheckListItem.fromJSON(parsedItem)));
    }
}

interface ICheckListItemBase {
    title: string;
    checked: boolean;
}

interface ICheckListItemDue extends ICheckListItemBase {
    dueDate: Date;
}

export type ICheckListItem = ICheckListItemBase | ICheckListItemDue

abstract class BaseCheckListItem {
    title: string;
    checked: boolean = false;

    constructor(title: string) {
        this.title = title;
    }

    /* Serialization methods */
    abstract toJSON(): Object;

    static fromJSON(parsedObject : ICheckListItem) : CheckListItem {
        return CheckListItemFactory.createCheckListItem(parsedObject);
    }
}

class CheckListItemDefault extends BaseCheckListItem implements ICheckListItemBase {
    constructor(title: string) {
        super(title);
    }

    toJSON(): Object {
        return {
            title: this.title,
            checked: this.checked
        }
    }
}

class CheckListItemDue extends BaseCheckListItem implements ICheckListItemDue {
    dueDate: Date;

    constructor(title: string, dueDate: Date) {
        super(title);
        this.dueDate = dueDate;
    }

    /* Serialize function */
    toJSON(): Object {
        return {
            title: this.title,
            checked: this.checked,
            dueDate: JSON.stringify(this.dueDate)
        }
    }
}

export class CheckListItemFactory {
    static createCheckListItem(item : ICheckListItem) : CheckListItem {
        if (this.isDueItem(item)) {
            return new CheckListItemDue(item.title, item.dueDate);
        }

        return new CheckListItemDefault(item.title);
    }

    private static isDueItem(item: ICheckListItem): item is ICheckListItemDue {
        return 'dueDate' in item;
    }
}

export type CheckListItem = CheckListItemDefault | CheckListItemDue;



