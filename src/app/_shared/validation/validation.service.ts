import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms/src/model';

export class ValidationService {

  static getControlErrorMessage(control: FormControl | AbstractControl, checkDirty: boolean = true, checkTouched: boolean = true) {
    for (let propertyName in control.errors) {
      if (control.errors.hasOwnProperty(propertyName) && control.invalid) {
        if ((!checkDirty || control.dirty) || (!checkTouched || control.touched))
          return ValidationService.getValidatorErrorMessage(propertyName, control.errors[propertyName]);
      }
    }

    return null;
  }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Campo obrigatório',
      'email': 'Endereço de e-mail inválido',
      'requiredLength': 'Campo obrigatório',
      'invalidEmailAddress': 'Endereço de e-mail inválido',
      'invalidPassword': 'Senha inválida. Senha deve conter pelo menos 6 caracteres e conter números.',
      'minlength': `Tamanho mínimo do campo é ${validatorValue.requiredLength}`,
      'comparePassword': 'As senhas são diferentes',
      'dateValidator': 'Data inválida'
    };

    return config[validatorName];
  }

  static dateValidator(control : FormControl){
    console.log(control);
    if(control.value && (<string>control.value).length == 8){
      let dia = (<string>control.value).substr(0, 2);
      let mes = (<string>control.value).substr(2, 2);
      let ano = (<string>control.value).substr(4,4);
      console.log(dia);
      console.log(mes);
      console.log(ano);

      try{
        let dtValid : Date = new Date(+ano, +mes, +dia);
        return {'dateValidator' : true};
      }
      catch(e){
        return null;
      }
    }
    else{
      return null;
    }
  }

  static creditCardValidator(control: FormControl) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static passwordValidator(control: FormControl) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number

    return null;
    // if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
    //   return null;
    // } else {
    //   return { 'invalidPassword': true };
    // }
  }

  static telefoneValidator(control: FormControl) {
    return null;
    // if (!control.value)
    //   return null;
    // if (control.value.match('')) {
    //   return null;
    // }
    // else {
    //   return { 'invalidTelefone': true };
    // }
  }

  static celularValidator(control: FormControl) {
    return null;
    // if (!control.value)
    //   return null;
    // if (control.value.match('') || !this.telefoneValidator(control)) {
    //   return null;
    // }
    // else {
    //   return { 'invalidTelefone': true };
    // }
  }

  static equalValueValidator(targetKey: string, toMatchKey: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
      const target = group.controls[targetKey];
      const toMatch = group.controls[toMatchKey];
      if (target.touched && toMatch.touched) {
        const isMatch = target.value === toMatch.value;
        // set equal value error on dirty controls
        if (!isMatch && target.valid && toMatch.valid) {
          toMatch.setErrors({compareValidator: targetKey});
          return {'compareValidator': true};
        }
        if (isMatch && toMatch.hasError('compareValidator')) {
          toMatch.setErrors(null);
        }
      }
  
      return null;
    };
  }

}
