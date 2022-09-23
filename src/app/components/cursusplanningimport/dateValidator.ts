import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class DateValidator {
    static dateLessThan(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            console.log("Validator fired!");
            let start = control.get('dateStart');
            let startDate = start != null ? start.value : new Date();
            let end = control.get('dateEnd');
            let endDate = end != null ? end.value : new Date();
            return startDate < endDate ? { dateValid:true } : {};
        }
    };
}
