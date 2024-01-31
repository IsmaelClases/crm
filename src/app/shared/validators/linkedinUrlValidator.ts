import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { LinkedinUrlPipe } from '../pipes/linkedinUrl.pipe';

export function LinkedinUrlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const linkedinUrlPipe = new LinkedinUrlPipe();
    const isValid = linkedinUrlPipe.transform(control.value);
    
    return isValid ? null : { linkedinUrl: true };
  };
}
