import { Component,trigger, state, style, transition, animate, keyframes} from '@angular/core';
import { FormBuilder,Validators,FormGroup} from '@angular/forms';

import { NavController, NavParams,AlertController,LoadingController,IonicApp,MenuController} from 'ionic-angular';
import { HomePage } from '../home/home';
import $ from 'jquery';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
	
	animations:[
		trigger('fadeUp', [
      state('fadeUped', style({
				webkitTransform:'translate3d(0,-300%,0)',
				left:'20%',
				width:'60%',
				})),
			state('fadeUp320', style({
				webkitTransform:'translate3d(0,-95%,0) ',
				left:'20%',
				width:'60%'
			})),
		 ])
		
	]
})
 export class LoginPage {
	
	fadeState: String = 'fadeDown';
	myForm:FormGroup;
	phoneNum: any;
  passWord: any;
  constructor(public menu: MenuController,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public alertCtrl: AlertController) {
		this.myForm = formBuilder.group({//表单验证
      		phoneNum: ['', Validators.compose([Validators.minLength(11), Validators.maxLength(11), Validators.required])],
			passWord: ['', Validators.compose([Validators.minLength(6), Validators.required])]
		});
		this.phoneNum = this.myForm.controls['phoneNum'];
		this.passWord = this.myForm.controls['passWord'];
		this.menu.enable(false);//侧边栏在登录页不工作
	} 


login(value) {//提交按钮点击后判断账号密码，错误提示，以及加载动画
    if (value.phoneNum == "1" && value.passWord == 1	) {
			 let loading = this.loadingCtrl.create({
					content: 'just second...',
					spinner:"crescent",
					showBackdrop:false,
					cssClass:"loadCustomCss"
				});
				loading.present();
				setTimeout(() => {
					this.navCtrl.push(HomePage,{ animate: true, direction: 'forward'})
					loading.dismiss();
				}, 3000);

    } else {
				let alert = this.alertCtrl.create({//错误警告框
				title: '高冷的标题',
				subTitle: '仙人哎，手机号和密码都记不到，好生想哈',
				buttons: ['你好生说'],
				cssClass: 'alertCustomCss'
			});
			alert.present();
    }

	}
	fadeUp(){//为ANIMATE定的动画状态
					let wip4 = window.innerWidth;
					let hip4 = window.innerHeight;
					if(wip4==320 && hip4==480 ){
						this.fadeState='fadeUp320';
					}else{
						this.fadeState = 'fadeUped';
					}
						
				}
	fadeDown(){
					this.fadeState = 'fadeDown';
					
				}



	ionViewDidLoad() {//生命周期-页面加载时
			$('.bkg-video').height($('body')[0].clientHeight)
			
		}
 
	ionViewDidEnter(){//页面已经进入时
				//解决不能在ANDROID设备循环播放视频
					
				let video = (<HTMLVideoElement>document.getElementById('video'))
				video.loop = false; 
				video.addEventListener('ended', function() { 
				video.currentTime=0.1; video.play(); }, false);
					video.muted=true;
					video.play();
					video.addEventListener('click',function(){
					video.play();
					},false); 
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
					if(isAndroid){
						$(".login-view-back").css({"font-size":"25px"})
					}
					$('.btn').click(function(){
									// $(this).css({"width":"60%","transform":"translateY(-300%)"})
								$(".overlay").css({"visibility":"visible"});
									$(".i-icon-phone").fadeOut("100");
									$(".login-text").text("Sign Up")
									$(".bkg-video").addClass("blur-for-bkg")
									$(".log-input-item").css({"opacity":'1',"transform":"none"})
								$(".i1").css({"transition-delay":"100"})
									$(".i2").css({"transition-delay":"150ms"})
									$(".login-view-back").fadeIn("100")	
									$(".login-view-back").css({"left":"5%","transition":"1s"})
									if(isAndroid){
										$(".overlay-for-no-blur").css({"opacity":".8"})
									}
									setTimeout(function(){
										$(".btn").attr("type","submit")
									},100)
									
					})
					$('.login-view-back').click(function(){
									$(".btn").attr("type","button")
								    $(".overlay").css({"visibility":"hidden"});
									$(".i-icon-phone").fadeIn("100");
								    $(".login-text").text("Sign Up With Phone")
									$(".bkg-video").removeClass("blur-for-bkg")
									$(".i1,.i2").css({"transform":"scale(1.1)  translate3d(0,-18px,0)","transition":"transition: opacity .6s ease-out, transform .6s;"})
									$(".log-input-item").css({"opacity":'0',"transform":".6s"})
									$(".login-view-back").hide();
									$(".login-view-back").css({"left":"10%","transition":".3s"})
									$(".overlay-for-no-blur").css({"opacity":".3"})
					})
				
			}
		ionViewWillLeave() {
			this.menu.enable(true);//离开登录页是启用/重新启用侧边栏菜单
		}
 			
}
