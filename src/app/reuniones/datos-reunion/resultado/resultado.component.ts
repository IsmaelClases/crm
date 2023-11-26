import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosReunionComponent} from '../datos-reunion.component';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { ENTIDAD_REUNION } from 'src/app/shared/messages';
import { editorConfig } from 'src/app/shared/editor-config';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {

  resultadoForm: FormGroup;
  ENTIDAD: String;
  editorConfig = editorConfig;


  constructor(
    private datosReunion: DatosReunionComponent,
    public reunionService: ReunionesService,

  ) {}

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_REUNION;
    this.setForm();

    this.resultadoForm.valueChanges.subscribe(form => {
      this.reunionService.setResultadoReunion(form);
    });


  }

  setForm(): void  {
    this.resultadoForm = new FormGroup({
      id_reunion: new FormControl(this.reunionService.reunion.id_reunion, Validators.required),
      resultado: new FormControl(this.reunionService.reunion.resultado, Validators.required),
    });

  }

  ngOnDestroy(): void {
    //this.editor.destroy();
  }

}
