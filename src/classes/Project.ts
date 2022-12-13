import { Group } from "./Group";
import { Members } from "./Members";

export interface IProject {
    title: string,
    id: string,
    groups: Group[],
    owner: string
}

export interface IProjectData {
    title: string,
    id: string,
    owner: string
}

export class Project {
    title: string;
    id: string;
    
    groups: Group[] = [];
    owner: string;

    constructor(id: string, title: string, owner: string) {
        this.id = id;
        this.title = title;
        this.owner = owner
    }

    static fromJSON(parsedObject : IProjectData): Project {
        return new Project(parsedObject.id, parsedObject.title, parsedObject.owner);
    }
}