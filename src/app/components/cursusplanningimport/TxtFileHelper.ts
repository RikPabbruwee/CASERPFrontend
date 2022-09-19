import { CursusInstantie, CursusInstantieFactory } from "src/models/cursusInstantie";

export class TxtFileHelper{
    globalCounter: number = 0;
    
    constructor(private file: string){
        this.Loop();
    }
    Loop(){
        let objList: CursusInstantie[] = [];
        let counter: number = 0;
        let obj: CursusInstantie = CursusInstantieFactory.create();
        let temp: string[] = [];
        for (const line of this.file.split(/[\n]+/)){
            this.globalCounter++;
            console.log("Line "+ counter++ + ": ", line);

            if(!this.shouldStartWith(counter, line)){
                //throw error and stop
                return;
            }else{
                temp.push(line);
            }

            if(counter == 4){
                counter = 0;
                objList.push(obj);
                obj = CursusInstantieFactory.create();
            }
        }
        console.log("ObjList:", objList);
    }
    shouldStartWith(i: number, s: string){
        switch(i){
            case(1):
                return s.startsWith('Titel:')
            case(2): 
                return s.startsWith('Cursuscode:');
            case(3):
                return s.startsWith('Duur:');
            case(4):
                return s.startsWith('Startdatum:');
        }
        return false;
    }

}