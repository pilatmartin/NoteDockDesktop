import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//COMPONENTS
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AddFolderComponent } from './dialogs/add-folder/add-folder.component';
import { ProfileComponent } from './dialogs/profile/profile.component';
import { MainComponent } from './components/main/main.component'
import { AddProfileImageComponent } from './dialogs/add-profile-image/add-profile-image.component'


//FIREBASE
import { AngularFireModule } from '@angular/fire'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment'
import { AngularFirestoreModule } from '@angular/fire/firestore'



//MATERIAL
import {MatFormFieldModule} from '@angular/material/form-field'
import {
  MatDialogModule, 
  MatInputModule, 
  MatButtonModule, 
  MatToolbarModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatMenuModule,
  MatIconModule,
  MatMenuTrigger
  } from '@angular/material'

//SERVICES
import { AuthService } from './services/auth.service'

//OTHER
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component'
import { AuthGuardService } from './services/auth-guard.service'
import { FlexLayoutModule } from '@angular/flex-layout'
import { DeviceDetectorModule } from 'ngx-device-detector'
import { ImageCropperModule } from 'ngx-image-cropper'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HttpClientModule } from '@angular/common/http'

//ROUTING
import {Routes, RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module'

//page routes array
const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: '', component: MainComponent},
  {path: 'image-crop', component:AddProfileImageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    AddFolderComponent,
    ProfileComponent,
    MainComponent,
    AddProfileImageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatDialogModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatProgressBarModule,
    DeviceDetectorModule.forRoot(),
    ImageCropperModule,
    MatMenuModule,
    MatIconModule,
    AngularFirestoreModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports:[
    MatIconModule,
    MatMenuModule
  ],
  entryComponents: [AddFolderComponent, ProfileComponent],
  providers: [AngularFirestore, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}


