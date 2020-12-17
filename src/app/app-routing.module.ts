import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    { path: 'component', loadChildren: () => import('./components/components.module').then( m => m.ComponentsModule) },
    { path: 'shared', loadChildren: () => import('./shared/shared.module').then( m => m.SharedModule) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: false})],
    exports: [RouterModule]
})
export class AppRoutingModule {}
