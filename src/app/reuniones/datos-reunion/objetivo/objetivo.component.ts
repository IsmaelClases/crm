import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatosReunionComponent} from '../datos-reunion.component';
import { ReunionesService } from 'src/app/services/reuniones.service';
import { ENTIDAD_REUNION } from 'src/app/shared/messages';
import { editorConfig } from 'src/app/shared/editor-config';

@Component({
  selector: 'app-objetivo',
  templateUrl: './objetivo.component.html',
  styleUrls: ['./objetivo.component.scss']
})
export class ObjetivoComponent implements OnInit {

  objetivoForm: FormGroup;
  ENTIDAD: String;
  editorConfig = editorConfig;


  constructor(
    private datosReunion: DatosReunionComponent,
    public reunionService: ReunionesService,

  ) {}

  ngOnInit(): void {
    this.ENTIDAD = ENTIDAD_REUNION;
    this.setForm();

    this.objetivoForm.valueChanges.subscribe(form => {
      this.reunionService.setObjetivoReunion(form);
    });

  }

  setForm(): void  {
    this.objetivoForm = new FormGroup({
      id_reunion: new FormControl(this.reunionService.reunion.id_reunion, Validators.required),
      objetivo: new FormControl(this.reunionService.reunion.objetivo, Validators.required),
    });
  }

  ngOnDestroy(): void {
    //this.editor.destroy();
  }
  
}
