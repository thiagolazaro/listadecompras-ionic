import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lista',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../listas/lista-lista/lista-lista.module').then(
                (m) => m.ListaListaPageModule
              ),
          },
          {
            path: 'nova',
            loadChildren: () =>
              import('../listas/form-lista/form-lista.module').then(
                (m) => m.FormListaPageModule
              ),
          },
          {
            path: 'editar/:id',
            loadChildren: () =>
            import('../listas/form-lista/form-lista.module').then(
              (m) => m.FormListaPageModule
            ),
          },
          {
            path: 'detalhe/:id',
            loadChildren: () =>
              import('../listas/detalhe-lista/detalhe-lista.module').then(
                (m) => m.DetalheListaPageModule
              ),
          }
        ],
      },
      {
        path: 'categorias',
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                '../categorias/lista-categoria/lista-categoria.module'
              ).then((m) => m.ListaCategoriaPageModule),
          },
          {
            path: 'nova',
            loadChildren: () =>
              import('../categorias/form-categoria/form-categoria.module').then(
                (m) => m.FormCategoriaPageModule
              ),
          },
          {
            path: 'editar:id',
            loadChildren: () =>
              import('../categorias/form-categoria/form-categoria.module').then(
                (m) => m.FormCategoriaPageModule
              ),
          }
        ],
      },
      {
        path: 'sobre',
        loadChildren: () =>
          import('../sobre/sobre.module').then((m) => m.SobrePageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/lista',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
