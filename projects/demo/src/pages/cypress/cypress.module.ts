import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MaskitoModule} from '@maskito/angular';
import {TuiAddonDocModule, tuiGenerateRoutes} from '@taiga-ui/addon-doc';
import {TuiGroupModule} from '@taiga-ui/core';
import {TuiInputModule} from '@taiga-ui/kit';

import {CypressDocPageComponent} from './cypress.component';
import {TestDocExample1} from './examples/1-predicate/component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaskitoModule,
        TuiInputModule,
        TuiGroupModule,
        TuiAddonDocModule,
        RouterModule.forChild(tuiGenerateRoutes(CypressDocPageComponent)),
    ],
    declarations: [CypressDocPageComponent, TestDocExample1],
    exports: [CypressDocPageComponent],
})
export class CypressDocPageModule {}
