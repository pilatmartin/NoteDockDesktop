import { Component, OnInit, Inject } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LOCALE_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import '../../../assets/js/smtp.js'
import { ToastrService } from 'ngx-toastr';

declare let Email: any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  deviceInfo = null
  isMobile: boolean = null

  constructor(public deviceService: DeviceDetectorService,
    public router: Router,
    public as: AuthService,
    @Inject(LOCALE_ID) public locale: string,
    public translate: TranslateService,
    public toastr: ToastrService) {
    this.showDevice()
  }
  useLanguage(language: string) {
    this.translate.use(language);
}

  ngOnInit() {
    this.router.navigate(['login'])
  }

  showDevice() {
    this.deviceInfo = this.deviceService.getDeviceInfo()

    this.isMobile = this.deviceService.isMobile()
    //const isTablet = this.deviceService.isTablet()
    console.log(this.isMobile)

  }
  onSubmit(from:String, subject:String, message: String){
    if(from.length>0 && subject.length>0 && message.length>0){

      Email.send({
        Host: 'smtp.elasticemail.com',
        Username: '8pilatmartin8@gmail.com',
        Password: 'D044C53E6FC14B7CE6AEBDE88D2D5EEA9A9D',
        To:'8pilatmartin8@gmail.com',
        From: '8pilatmartin8@gmail.com',
        Subject: subject,
        Body:` <i> Sent From NoteDock Form.<i> <br/> <b>From: </b> ${from} <b>Message<b/>: ${message}`
  
      }).then(this.toastr.success("Email has been sent!")).catch(error=>{
        this.toastr.error(error)
      })
  
      // console.log(from, subject, message)
  
      }else this.toastr.error('Every field is mandatory!')
    }
    
  }



