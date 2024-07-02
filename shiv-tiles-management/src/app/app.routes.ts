import { Routes } from '@angular/router';
import { HomeComponent } from './componants/home/home.component';
import { PurchaseComponent } from './componants/purchase/purchase.component';
import { SaleComponent } from './componants/sale/sale.component';
import { LogComponent } from './componants/log/log.component';

export const routes: Routes = [
    {
        path:'home',
        component : HomeComponent
    },
    {
        path:'',
        component : HomeComponent
    },
    {
        path:'purchase',
        component : PurchaseComponent
    },
    {
        path:'sale',
        component : SaleComponent
    },
    {
        path:'log',
        component : LogComponent
    }
];
