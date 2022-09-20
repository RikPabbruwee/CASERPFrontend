import { CursusInstantie } from "./cursusInstantie";

export interface TxtFileHelperObject {
    foundLines: string[],
    cursusInstanties: CursusInstantie[],
    error: {
        isError: boolean,
        line: number,
        text: string
    }
}
export abstract class TxtFileHelperObjectFactory{
    public static create(){
        let obj: TxtFileHelperObject =  {
            foundLines: [],
            cursusInstanties: [],
            error: {
                isError: false,
                line: 0,
                text: ''
            }
        };
        return obj;
    }
}