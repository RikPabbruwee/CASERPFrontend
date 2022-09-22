import { TxtFileHelperObject } from "src/models/txtFileHelperObject";
import { ErrorObject, TxtFileHelper } from "./TxtFileHelper";

describe('TxtFileHelper', () => {
    let string: string;
    let sut: TxtFileHelper;
    beforeEach(() => {
        string = `Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n`;
        string +=`Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 15/10/2018\n\n`;
        string +=`Titel: Java Persistence API\nCursuscode: JPA\nDuur: 2 dagen\nStartdatum: 15/10/2018\n\n`;
        string +=`Titel: Java Persistence API\nCursuscode: JPA\nDuur: 2 dagen\nStartdatum: 8/10/2018\n\n`;
        string +=`Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n`;
        sut = new TxtFileHelper(string);
    });
    describe('Loop', () => {
        let result: TxtFileHelperObject;
        beforeEach(() => {
            result = sut.Loop();
            console.log(result);
        })
        
        it('should contain a instance of "C# Programmeren"', () => {
            expect(result.cursusInstanties[0].titel).toBe("C# Programmeren");
        })
        it('should contain a instance of "Java Persistence API"', () => {
            expect(result.cursusInstanties[2].titel).toBe("Java Persistence API");
        })
        it('should contain 5 cursusinstanties', () => {
            expect(result.cursusInstanties.length).toBe(5);
        })
    });
    describe('Helper functions', () => {
        let lineTitle: string;
        let lineCode: string;
        let lineDate: string;
        let lineDuration: string;
        let NoError: ErrorObject;
        
        beforeEach(() => {
            string = `Titel: C# Programmeren\nCursuscode: CNETIN\nDuur: 5 dagen\nStartdatum: 8/10/2018\n\n`;
            lineTitle = `Titel: C# Programmeren`;
            lineCode = `Cursuscode: CNETIN`;
            lineDate = `Startdatum: 8/10/2018`;
            lineDuration = `Duur: 5 dagen`;
            NoError = {state:true, message: ""};
            sut = new TxtFileHelper(string);
        });
        describe('splitKeyFromValue', () => {
            it('should be the value of the line', () => {
                expect(sut.splitKeyFromValue(lineTitle)).toBe("C# Programmeren");
                expect(sut.splitKeyFromValue(lineDate)).toBe("8/10/2018");
                expect(sut.splitKeyFromValue(lineDuration)).toBe("5 dagen");
            });
        });
        describe('checkFormatOfInputDate', () => {
            it('should be a correct date', () => {
                expect(sut.checkFormatOfInputDate(lineDate))
                    .toEqual(NoError);
            });
            it('should be a incorrect date', () =>{
                ////state: false, message: "Begint niet met Startdatum:!"
                expect(sut.checkFormatOfInputDate(`Start: 8-10-2018`))
                    .toEqual({state: false, message: "Begint niet met Startdatum:!"});
                expect(sut.checkFormatOfInputDate(`Startdatum: 8-10-2018`))
                    .toEqual({state: false, message: 'Datum komt niet overeen met het verwachten formaat, voorbeeld: 01/01/2018;'});
            });
        });
        describe('checkFormatOfInputDuration', () => {
            it('should be a correct duration', () => {
                expect(sut.checkFormatOfInputDuration(lineDuration))
                    .toEqual(NoError);
            });
            it('should not be a correct date', () => {
                expect(sut.checkFormatOfInputDuration("5 dagen"))
                    .toEqual({state: false, message: "Begint niet met Duur:!"});
            });
            it('should not be a correct date', () => {
                expect(sut.checkFormatOfInputDuration("Duur: 5"))
                    .toEqual({state: false, message: "Duratie komt niet overeen met het verwachten formaat, voorbeeld 5 dagen;"});
            });
        });
        describe('createDateFormatServerExpects', () => {
            it('should return a YYYY-MM-DD', () => {
                expect(sut.createDateFormatServerExpects('01/01/2018'))
                    .toBe('2018-01-01');
            })
        });
        describe('padDatePart', () => {
            it('should return a padded date', () => {
                expect(sut.padDatePart('1')).toBe('01');
                expect(sut.padDatePart('11')).toBe('11');
            });
        });
        describe('findFormatError', () => {
            it('should return a NoError', () => {
                NoError.message = "Begint niet met Titel:!";
                expect(sut.findFormatError(1, lineTitle))
                    .toEqual(NoError);
            });
            it('should return a NoError', () => {
                NoError.message = "Begint niet met Cursuscode:!";
                expect(sut.findFormatError(2, lineCode))
                    .toEqual(NoError);
            });
            it('should return a NoError', () => {
                expect(sut.findFormatError(3, lineDuration))
                    .toEqual(NoError);
            });
            it('should return a NoError', () => {
                expect(sut.findFormatError(4, lineDate))
                    .toEqual(NoError);
            });
        });
        
    });
})