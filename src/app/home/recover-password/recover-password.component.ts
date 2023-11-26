import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  cambiarPasswordForm: FormGroup;
  alerta: string;
  showSpinner: boolean;
  error: string;
  @Output() valueChange = new EventEmitter();

  constructor(
              private authService: AuthService,
              private snackBar: MatSnackBar,
            ) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.cambiarPasswordForm = new FormGroup({
      username: new FormControl('', Validators.required)
    });
  }

  async recuperarPass() {
    const RESPONSE = await this.authService.resetPassword(this.cambiarPasswordForm.value).toPromise();
    if (RESPONSE.ok) {
      this.snackBar.open('Se ha enviado un correo de recuperación de contraseña a la dirección indicada', 'Cerrar', {duration: 5000});
      this.valueChange.emit(false);
    } else if (RESPONSE.message === 'usuario inexistente') {
      this.snackBar.open('El usuario introducido no existe en nuestro sistema', 'Cerrar', {duration: 5000});
    }
  }

  goBack() {
    this.valueChange.emit(false);
  }

}
