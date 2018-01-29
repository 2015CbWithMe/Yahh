import { Component,ViewChild } from '@angular/core';
import { Nav,Platform,MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import $ from 'jquery';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  pan:number = 0;
   @ViewChild(Nav) nav: Nav;

   pages: Array<{title: string, component: any,icon:any}>;

   //依赖注入
  constructor(public menuCtrl: MenuController,platform: Platform, statusBar: StatusBar, splashScreen:SplashScreen) {
      this.pages = [
                {title: 'YAHH', component: HomePage ,icon:'basketball'},
                {title: 'PROFILE', component: ProfilePage,icon:'battery-charging'},
                {title: 'MESSAGES', component: LoginPage,icon:'bicycle' },
                {title: 'MUSIC', component: LoginPage ,icon:'bluetoot'},
                {title: 'Logout', component: LoginPage,icon:'body' }
                ];
	    platform.ready().then(() => {
	    		splashScreen.hide();
                menuCtrl.open();
      });
             
		
  };

   openPage(page) { 
      this.nav.setRoot(page.component);//菜单列表导航

    
  };
 
//    Name              Value  手势方向判定规则
// DIRECTION_NONE         1
// DIRECTION_LEFT         2
// DIRECTION_RIGHT        4
// DIRECTION_UP           8
// DIRECTION_DOWN         16
// DIRECTION_HORIZONTAL   6
// DIRECTION_VERTICAL     24
// DIRECTION_ALL          30
menuCloseByTap(){
      $(".menu-open").css({"-webkit-transform":"","-webkit-transition":".4s","z-index":"1"})//点击菜单选项同时收起菜单
      
}
menuOpen(e){//向右滑动打开菜单
    if(e.direction == 4){
     
        $(".menu-open").css({
             "-webkit-transform":"translate3d(50%,0,0) rotateY(-40deg) scale(.9)",
              "-webkit-transition":".4s","z-index":"2"})
      }
    
 }
menuClose(e){//向左滑动关闭菜单
    if(e.direction == 2){
        $(".menu-open").css({
             "-webkit-transform":"",
              "-webkit-transition":".4s","z-index":"1"})
        }
       
    }
      
}
