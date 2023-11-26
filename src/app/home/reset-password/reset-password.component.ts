import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  @Input() tokenPasswd: string;

  resetPass: boolean;
  checkTokenPasswd: boolean;
  showSpinner: boolean;
  iconoPass: string;
  @Output() valueChanges = new EventEmitter();

  constructor(
              private authService: AuthService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.resetPasswordForm = new FormGroup({
        token_pwd: new FormControl(this.tokenPasswd, Validators.required),
        password: new FormControl('', Validators.required),
        confirm_password: new FormControl('', Validators.required)
      }, this.contrasenaMatchValidator);
  }

  contrasenaMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirm_password').value
      ? null
      : { mismatch: true };
  }

  async generateNewPass() {

    if (this.resetPasswordForm.valid) {
    //   const pass = this.resetPasswordForm.get('password').value;
    // const confirmPass = this.resetPasswordForm.get('confirm_password').value;
      const DATA = this.resetPasswordForm.value;
    // console.log(this.token_passwd);
      const RESPONSE = await this.authService.generateNewPass(DATA).toPromise();
      if (RESPONSE.ok) {
        this.snackBar.open('Se ha cambiado la contraseña con éxito', 'Cerrar', {duration: 5000});
        this.valueChanges.emit(false);
      } else {
        this.snackBar.open('No se ha podido cambiar la contraseña', 'Cerrar', {duration: 5000});
      }
    }

  }

  changeInput(input: string) {

  }

}
