import { AngularEditorConfig } from '@kolkov/angular-editor';
//import { URL_IMG } from '../../environments/environment';

export const editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '24em',
    minHeight: '0',
    maxHeight: '30em',
    width: '54em',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Escriba aquí el texto...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      // {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
   // uploadUrl: URL_IMG,
    uploadWithCredentials: false,
    sanitize: false,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['superscript','subscript','fontName'],
      ['customClasses',
      'insertHorizontalRule',
      //'toggleEditorMode',
      'removeFormat',
      'insertImage',
      'insertVideo']
    ]
};