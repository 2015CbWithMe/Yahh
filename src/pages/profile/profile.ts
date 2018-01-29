import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import $ from 'jquery';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
    $('.menu').on('touchstart',function(e) {
      console.log(111)
            var _touch = e.originalEvent.targetTouches[0];
            var _x= _touch.pageX;
            if(_x<40){
               $(".menu").addClass('menu-open')
            }
       });
   
  
  }

}
