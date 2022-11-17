import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'lista-categoria',
    loadChildren: () => import('./categorias/lista-categoria/lista-categoria.module').then( m => m.ListaCategoriaPageModule)
  },
  {
    path: 'form-categoria',
    loadChildren: () => import('./categorias/form-categoria/form-categoria.module').then( m => m.FormCategoriaPageModule)
  },
  {
    path: 'lista-lista',
    loadChildren: () => import('./listas/lista-lista/lista-lista.module').then( m => m.ListaListaPageModule)
  },
  {
    path: 'form-lista',
    loadChildren: () => import('./listas/form-lista/form-lista.module').then( m => m.FormListaPageModule)
  },
  {
    path: 'detalhe-lista',
    loadChildren: () => import('./listas/detalhe-lista/detalhe-lista.module').then( m => m.DetalheListaPageModule)
  },
  {
    path: 'form-produto',
    loadChildren: () => import('./produtos/form-produto/form-produto.module').then( m => m.FormProdutoPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./sobre/sobre.module').then( m => m.SobrePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
