import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tokenPasswd: string;
  formularioRecuperacion = false;
  formularioReseteo = false;
  checkTokenPasswd = false;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    ) {
      this.activatedRoute.queryParams.subscribe(params => {
        this.tokenPasswd = params.token;
      });

      if (this.tokenPasswd) {
        this.formularioReseteo = true;
        this.checkPassToken(this.tokenPasswd);
      }
    }

  ngOnInit() {}

  forgotPassword(event: boolean) {
    this.formularioRecuperacion = event;
  }

  resetPass(event: boolean) {
    this.formularioReseteo = event;
  }

  checkPassToken(tokenPasswd: string) {
    this.authService.checkPassToken(tokenPasswd).subscribe(data => {
        this.checkTokenPasswd = data.ok;
    });
  }

}
