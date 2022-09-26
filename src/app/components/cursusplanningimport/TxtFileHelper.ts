import { CursusInstantie, CursusInstantieFactory } from "src/models/cursusInstantie";
import { TxtFileHelperObject, TxtFileHelperObjectFactory } from "src/models/txtFileHelperObject";

export class TxtFileHelper{
    globalCounter: number = 0;
    
    constructor(private file: string){
        
    }
    Loop(): TxtFileHelperObject{
        let obj: TxtFileHelperObject = TxtFileHelperObjectFactory.create();
        let counter: number = 0;
        let temp: string[] = []
        for (const line of this.file.split(/\n/)){
            //Upping counters
            this.globalCounter++;
            counter++;

            //Last line is always empty so throw it out 
            //so it doesn't cause an error at the end
            if(line == "" && counter != 5) continue;  
            //Add line to history
            obj.foundLines.push(line);

            //Check the line for errors 
            let lineCheck: ErrorObject = this.findFormatError(counter, line);
            if(!lineCheck.state)
            {
                //throw error and stop
                obj.error.isError = true;
                obj.error.line = this.globalCounter;
                obj.error.text = lineCheck.message;
                console.log("Error found!");
                return obj;
            }else{
                if(counter !=5)
                    temp.push(line);
            }
            //Full "object" so push, format and reset
            if(counter == 5){
                obj.cursusInstanties.push(this.createCursusInstantieFromArray(temp));
                counter = 0;
                temp = [];   
            }
        }
        return obj;
    }
    findFormatError(i: number, s: string): ErrorObject
    {
        switch(i){
            case(1):
                return {
                    state: s.startsWith('Titel:'),
                    message: "Begint niet met Titel:!"
                };
            case(2): 
                return {
                    state: s.startsWith('Cursuscode:'),
                    message: "Begint niet met Cursuscode:!"
                };
            case(3):
                return this.checkFormatOfInputDuration(s);
            case(4):                
                return this.checkFormatOfInputDate(s);
            case(5):
                return {state:s == "", message: "Geen lege lijn!"} 
        }
        return {state:false, message: "Er is iets fout gegaan!"}
    }
    createCursusInstantieFromArray(a: string[]): CursusInstantie{
        let temp: CursusInstantie = CursusInstantieFactory.create()
        temp.titel = this.splitKeyFromValue(a[0]);
        temp.cursusCode = this.splitKeyFromValue(a[1]);
        temp.duration = parseInt(this.splitKeyFromValue(a[2]).split(' ')[0]);
        temp.startDate = this.createDateFormatServerExpects(this.splitKeyFromValue(a[3]));
        return temp;
    }
    splitKeyFromValue(input: string) : string{
        return input.split(': ')[1];
    }
    createDateFormatServerExpects(input: string): string {
        let splitInput: string[]= input.split("/");
        let correctFormat: string = "";
        correctFormat+= splitInput[2] + "-";
        correctFormat+= this.padDatePart(splitInput[1]) + "-";
        correctFormat+= this.padDatePart(splitInput[0]);
        return correctFormat;
        //`${splitInput[2]}-${splitInput[1]}-${splitInput[0]}`;

    }
    padDatePart(input: string): string{
        input = input.padStart(2, "0");
        return input;
    }
    checkFormatOfInputDate(input:string): ErrorObject{
        //Check if startdatum: is correct
        if(!input.startsWith('Startdatum:')){
            return {
                state: false,
                message: "Begint niet met Startdatum:!"
            }
        }
        let regex = /([0-9]+(\/[0-9]+)+)/i;
        if(!regex.test(this.splitKeyFromValue(input))){
            return {
                state: false,
                message: "Datum komt niet overeen met het verwachten formaat, voorbeeld: 01/01/2018;"
            }
        }
        return {state:true, message: ""}
    }
    checkFormatOfInputDuration(input:string): ErrorObject{
        //Check if startdatum: is correct
        if(!input.startsWith('Duur:')){
            return {
                state: false,
                message: "Begint niet met Duur:!"
            }
        }
        input = this.splitKeyFromValue(input).split(' ')[1];
        if(input != 'dagen'){
            return {
                state: false,
                message: "Duratie komt niet overeen met het verwachten formaat, voorbeeld 5 dagen;"
            }
        }
        return {state:true, message: ""}
    }
}

export interface ErrorObject{state: boolean, message: string}