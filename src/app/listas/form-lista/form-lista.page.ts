import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastService } from 'src/app/core/service/toast.service';
import { Lista } from '../shared/lista';
import { ListaService } from '../shared/lista.service';

@Component({
  selector: 'app-form-lista',
  templateUrl: './form-lista.page.html',
  styleUrls: ['./form-lista.page.scss'],
})
export class FormListaPage implements OnInit {
  titulo: string = 'Nova lista';
  public lista!: Lista;
  public  formLista!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private nav: NavController,
    private formBuilder: FormBuilder,
    private toast: ToastService,
    private listaService: ListaService
  ) {
    this.formLista = this.formBuilder.group({
      nome: ['', Validators.compose([
        Validators.required,
        Validators.minLength(2)
      ])],
    });
  }

  ngOnInit() {
    this.lista = new Lista();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.titulo = 'Editar Lista';
      this.carregaLista(parseInt(idParam));
    }
  }

  async carregaLista(id: number) {
    this.lista = await this.listaService.getById(id);
  }

  async onSubmit() {
    try {
      const resultado = await this.listaService.save(this.lista);
      this.lista.id = resultado.insertId;
      this.toast.success('Lista salva com sucesso');
      this.nav.pop();
    } catch (error) {
      this.toast.error('Ocorreu um erro ao tentar salvar a Lista');
    }
  }

}
