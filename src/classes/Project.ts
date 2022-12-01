import { Group } from "./Group";
import { Members } from "./Members";

export interface IProject {
    title: string,
    groups: Group[],
    members: Members
}

export class Project {
    title: string;
    
    groups: Group[] = [];
    members: Members = new Members();

    constructor(title: string) {
        this.title = title;
    }
}