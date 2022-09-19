import { Title } from "@angular/platform-browser";

export interface CursusInstantie{
    id: number,
    titel: string,
    cursusId: number,
    startDate: string,    
    duration: number,
    cursusisten: number
}
export abstract class CursusInstantieFactory{
    public static create(input?:Partial<CursusInstantie>){
        let obj: CursusInstantie =  {
            id: 0,
            titel: '',
            cursusId: 0,
            startDate: '1995-01-01',
            duration: 0,
            cursusisten: 0,
        };
        Object.assign(obj, input);
        return obj;
    }
    public static createFromParameters(
        titel: string, 
        cursusId: number,
        duration: Number,
        startDate: string,        
        ){

    }
}