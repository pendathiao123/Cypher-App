import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  { path: '', redirectTo: '/acceuil', pathMatch: 'full' },
  {path: 'acceuil', component: AcceuilComponent},
  { path: 'login', component: LoginComponent },
  //{ path: 'acceuil', component: AcceuilComponent, canActivate: [AuthGuard] },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  // Ajoutez ici d'autres chemins de route pour les autres pages de votre application
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
