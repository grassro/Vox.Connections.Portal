import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ValidationService } from '../_shared/validation/validation.service';
import { AuthService } from '../_shared/_guard/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  private formLogin: FormGroup;
  private errorMessage: string;
  private logggingIn: boolean = false;

  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.route.snapshot.data['logout']) {
      this.service.logout();
      this.router.navigate(['/login']);
    }
    this.formLogin = this.builder.group({
      'email': [null, [Validators.required]],
      'senha': [null, Validators.required]
    })
  }

  submit(): boolean {
    if (this.formLogin.invalid) {
      for (let controlKey in this.formLogin.controls) {
        var control = (<FormControl>this.formLogin.controls[controlKey])
        var controlError = ValidationService.getControlErrorMessage(control, false, false);
        if (controlError) {
          control.markAsDirty();
          control.markAsTouched();
        }
      }

      return false;
    }

    let user: User = new User();
    user.email = this.formLogin.controls['email'].value;
    user.senha = this.formLogin.controls['senha'].value;

    this.logggingIn = true;
    this.service.login(user).subscribe(res => {
      this.router.navigateByUrl(this.service.getInitialPage());
    },
      err => {
        this.errorMessage = 'Usuário e/ou senha inválida';
        this.logggingIn = false;
      }
    );


    return false;
    // if(!this.service.isAuthenticated()){
    //   this.errorMessage = 'Usuário e/ou senha inválida';
    //   return false;
    // }


    // this.router.navigateByUrl(this.service.getInitialPage());
    // return true;
  }

}
