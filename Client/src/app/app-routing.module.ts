import { GameConfigurationViewComponent } from './game-configuration-view/game-configuration-view.component';
import { DashBoardViewComponent } from './dash-board-view/dash-board-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameViewComponent } from './game-view/game-view.component';

const routes: Routes = [
    {
        path: 'game',
        component: GameViewComponent,
    },
    {
        path: 'config',
        component: GameConfigurationViewComponent,
    },
    {
        path: '',
        component: DashBoardViewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
