import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any
  constructor(
    public af: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public toast: ToastrService) {

      //storing data in local storage
      this.afAuth.authState.subscribe(user =>{
        if(user){
          this.userData = user
          localStorage.setItem('user',JSON.stringify(this.userData))//if logged in
          JSON.parse(localStorage.getItem('user'))
        }else{
          localStorage.setItem('user',null)//if logout
          JSON.parse(localStorage.getItem('user'))
        }
      })
     }

     login(email,password){
       return this.afAuth.auth.signInWithEmailAndPassword(email,password)
        .then((result)=>{
          this.ngZone.run(()=>{
            this.router.navigate(['home'])
          })
         this.setUserData(result.user)
        }).catch((error)=>{
          this.toast.error(error.message)
        })
     }

     register(email,password){
      return this.afAuth.auth.createUserWithEmailAndPassword(email,password)
        .then((result)=>{
          this.sendVerificationMail()
          this.setUserData(result.user)
        }).catch((error)=>{
          this.toast.error(error)
        })
     }

     sendVerificationMail(){
       return this.afAuth.auth.currentUser.sendEmailVerification()
        .then(()=>{
          this.router.navigate(['login'])
        })
     }

     forgotPassword(email){
       return this.afAuth.auth.sendPasswordResetEmail(email)
        .then(()=>{
          this.toast.success('Email sent, check your inbox')
        }).catch((error)=>{
          this.toast.error(error.message)
        })
     }

     get isLogged(){
       const user = JSON.parse(localStorage.getItem('user'))
       return (user !== null && user.emailVerified !== false) ? true : false
     }

     setUserData(user){
      let path = "users/" + user.uid;
      const userRef: AngularFirestoreDocument<any> = this.af.doc(path)
      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      }
      return userRef.set(Object.assign({}, data), {merge:true})
     }

     logout(){
       return this.afAuth.auth.signOut().then(()=>{
         localStorage.removeItem('user')
         this.router.navigate(['login'])//navigate to login page
       })
     }

     updateUser(displayName, email){
      //this.userData.displayName = displayName
      //this.userData.email = email

      try {
        this.updateData(email,displayName)
        //this.hc.changeDisplayName(displayName)
        this.toast.success("Changes will be updated shortly")
      } catch (error) {}
     }
     
     updateData(email, displayName?){
       this.afAuth.auth.currentUser.updateProfile({
         displayName: displayName
       }).catch((error)=>{
         this.toast.error(error.message)
       })
       this.afAuth.auth.currentUser.updateEmail(email)
      .catch((error)=>{
        this.toast.error(error.message)
      })
     }
}
