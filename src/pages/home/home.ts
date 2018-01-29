import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,MenuController,Slides,ToastController,InfiniteScroll} from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import $ from 'jquery';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {
  @ViewChild(Slides) slides: Slides;
  public tap: number = 0;
  public refresherState: String = 'ready';
  items = [];
  constructor( 
                public toastCtrl: ToastController,
                public menuCtrl: MenuController,
                public navCtrl: NavController, 
                public navParams: NavParams,
                public infiniteScroll:InfiniteScroll
              ) {
        for (let i = 0; i < 30; i++) {
          this.items.push( this.items.length );
        }
       
  } 


  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
  GoToProfilePage(){
    this.navCtrl.push(ProfilePage)
    
  }

  
   menuClose(e){ //滑动页面收起菜单
    if(e.direction == 2){
        $(".menu-open").css({"-webkit-transform":"","-webkit-transition":".4s","z-index":"1"})
       }
    }
  menuOpenByTap(){//点击头像打开菜单
    
     $(".menu").addClass('menu-open')
     $(".menu-open").css({
             "-webkit-transform":"translate3d(50%,0,0) rotateY(-40deg) scale(.9)",
              "-webkit-transition":".4s","z-index":"2"})
      }
  ionViewDidLoad(){
   var _x
    $('.menu').on('touchstart',function(e) {//判断滑动屏幕最左侧才打开菜单。
   
            var _touch = e.originalEvent.targetTouches[0];
             _x= _touch.pageX;
       
       });
    $(".menu").on("touchmove",function(e){
         if(_x<= 50){
             $(".menu").addClass('menu-open')
             $(".menu-open").css({
             "-webkit-transform":"translate3d(50%,0,0) rotateY(-40deg) scale(.9)",
             "-webkit-transition":".4s","z-index":"2"})
         }

      })
    $('.menu,#menu-list').on('touchend',function(e) {
              setTimeout(function(){
                   if($('.menu').css('z-index')!=2){
                    $(".menu").removeClass('menu-open')
                }
              },450)
         }); 
     
     var START_Y,MOVE_Y,_TOUCH,SCALE_Y,TRANSLAT_Y, T_MOVE,_TOP=0;

     $(".home-wrap .scroll-content").scroll(function() { //透明度渐变
         _TOP = $(this).scrollTop()/250;
        $('.change').css({'opacity':(( _TOP  > 0.9) ? 0.9 : _TOP)})
        // console.log(_TOP)
     });
    //  var element = $('.element');
    //  var win = $(window);
    //  win.scroll(function() {
    //      if (element.offset().top + element.height() <= win.height() + win.scrollTop()) {
    //          element.css('backgroundColor', '#f33');
    //      } else {
    //          element.css('backgroundColor', '#fff');
    //      }
    //  })
    $('.home-wrap').on('touchstart',function(e) { //下拉放大和刷新加载动画
        
        _TOUCH = e.originalEvent.targetTouches[0];
        
        $(".home-slides,.home-list, .y-r div span,.change2").css({'transition':"0s"})
          if(_TOP == 0){        
              //使用scrollTop来判断到达指定位置才开始获取START_Y，不然用户还没到达指定位置就开始获取
            START_Y= _TOUCH.pageY;   //等到到达指定位置时，START_Y里已经有值了，直接变大。
           }
              
         });
    $('.home-wrap').on('touchmove',function(e) {
     
          _TOUCH = e.originalEvent.targetTouches[0]; 
          MOVE_Y=_TOUCH.pageY - START_Y;
          SCALE_Y = MOVE_Y/500;
          TRANSLAT_Y = MOVE_Y/5;
          T_MOVE = MOVE_Y/3                         
          // console.log(MOVE_Y)
          // console.log($('.home-list').offset().top)
          // console.log($('.home-list')[0].scrollHeight)
          // console.log($('.home-list')[0].scrollTop)
          if($('.home-list').offset().top == (-($('.home-list')[0].scrollHeight - $(window).height()))){//  判断滚动到底部
             $(".loadMore").text("点击加载更多")
          }
          if(MOVE_Y>0 && _TOP == 0){ //判断下拉才执行动画
              // console.log(MOVE_Y)
              event.preventDefault()
              $('.change2').show() //下拉遮罩
              $('.change2').css({'opacity':'1',"background-color":"rgba(0, 0, 0, 0.55)"})
              
              $(".home-slides,.change2").css({'display':'block','transform':"scale("+(1+SCALE_Y)+")"})
              $('.home-list').css({'-webkit-transform':"translate3d(0,"+TRANSLAT_Y+"px,0) "})
           
              $('.y-1').css({'left':((-20+T_MOVE > 7) ? 7 :-20+T_MOVE)+'px',//用户下拉刷新组成文字动画
                    'top':((-10+T_MOVE > 10) ? 10 :-10+T_MOVE)+'px',
                    '-webkit-transform':"rotate("+((T_MOVE+30>50)?50:T_MOVE+30)+"deg)"
              })
              $('.y-2').css({'left':((-5+T_MOVE > 13) ? 13 :-5+T_MOVE)+'px',
                    'top':((-5+T_MOVE > 10) ? 10 :-5+T_MOVE)+'px',
                    '-webkit-transform':"rotate(-"+((T_MOVE+30>50)?50:T_MOVE+30)+"deg)"
              })
              $('.y-3').css({'left':((20-T_MOVE < 9) ? 9 :20-T_MOVE)+'px',
                    'top':((-3+T_MOVE > 18) ? 18 :-3+T_MOVE)+'px',
                    '-webkit-transform':"rotate("+((T_MOVE+60>90)?90:T_MOVE+60)+"deg)"
              })
              $('.A-1').css({'left':((-15+T_MOVE > 0) ? 0 :-15+T_MOVE)+'px',
                    'top':((-20+T_MOVE > 15) ? 15 :-20+T_MOVE)+'px',
                    '-webkit-transform':"rotate(-"+((T_MOVE+20 > 70) ? 70:T_MOVE+20)+"deg)"
              })
              $('.A-2').css({'left':((30 - T_MOVE < 6) ? 6 : 30-T_MOVE)+'px',
                      'top':((-15+T_MOVE > 15) ? 15 :-15+T_MOVE)+'px',
                      '-webkit-transform':"rotate("+((T_MOVE+20 > 70) ? 70:T_MOVE+20)+"deg)"
              })
              $('.A-3').css({'left':((25 - T_MOVE < 7) ? 7 :25-T_MOVE)+'px',
                      'top':((-25+T_MOVE > 17) ? 17 :-25+T_MOVE)+'px'
              
              })
              $('.H-1').css({'left':((45 - T_MOVE < 9) ? 9 : 45 - T_MOVE)+'px',
                    'top':((-10+T_MOVE > 15) ? 15 :-10+T_MOVE)+'px',
                    '-webkit-transform':"rotate(-"+((T_MOVE+60 > 90) ? 90:T_MOVE+60)+"deg)"
              })
              $('.H-2').css({'left':((30 - T_MOVE < 0) ? 0 : 30-T_MOVE)+'px',
                    'top':((-20+T_MOVE > 15) ? 15 :-20+T_MOVE)+'px',
                    '-webkit-transform':"rotate("+((T_MOVE+60 > 90) ? 90: T_MOVE+60)+"deg)"
              })
              $('.H-3').css({'left':((30 - T_MOVE < 9) ? 9   : 30 - T_MOVE)+'px',
                    'top':((-5 + T_MOVE > 15) ? 15 : T_MOVE)+'px'
              
              })
              $('.H2-1').css({'left':((45 - T_MOVE < 9) ? 9 : 45 - T_MOVE)+'px',
                    'top':((5 + T_MOVE > 15) ? 15 : 5 + T_MOVE)+'px',
                    '-webkit-transform':"rotate(-"+((T_MOVE+60 > 90) ? 90:T_MOVE+60)+"deg)"
              })
              $('.H2-2').css({'left':((-30 + T_MOVE > 0) ? 0 : -30+T_MOVE)+'px',
                    'top':((-10+T_MOVE > 15) ? 15 :-10+T_MOVE)+'px',
                    '-webkit-transform':"rotate("+((T_MOVE+60 > 90) ? 90: T_MOVE+60)+"deg)"
              })
              $('.H2-3').css({'left':((55 - T_MOVE < 9) ? 9   : 55 -T_MOVE)+'px',
                  'top':((-15 + T_MOVE > 15) ? 15 : -15+T_MOVE)+'px'
              
              })
            }else{
              $('.change').show()
            
            }
          
      });
      $('.home-wrap').on('touchend',function(e) {
          $(".home-slides,.change2").css({'transform':"scale(1)","transition":".4s"})
          $('.home-list').css({'transform':"translateY(0)","transition":".4s"})
          if(_TOP == 0){$('.change').hide() }
          
              if(MOVE_Y>140){
                $('.y-r div').addClass('shake') //用户下拉到指定位置松手后添加摇摆动画
                  setTimeout(function(){//用户下拉到指定位置松手后分解字体动画
                      $('.y-r div').removeClass('shake')
                      $('.change2').css({'transition':".8s","opacity":"0"})
                      $('.y-r div span').css({'transition':".8s"})
                      $('.y-1').css({'left':'-20px','top':'-10px',})
                      $('.y-2').css({'left':'-5px','top':'-5px',})
                      $('.y-3').css({'left':'20px','top':'-3px',})
                      $('.A-1').css({'left':'-15px','top':'-20px',})
                      $('.A-2').css({'left':'30px','top':'-15px',})
                      $('.A-3').css({'left':'25px','top':'-25px'})
                      $('.H-1').css({'left':'45px','top':'-10px',})
                      $('.H-2').css({'left':'30px','top':'-20px',})
                      $('.H-3').css({'left':'30px','top':'-5px'})
                      $('.H2-1').css({'left':'45px','top':'5px',})
                      $('.H2-2').css({'left':'-30px','top':'-10px'})
                      $('.H2-3').css({'left':'55px','top':'-15px'})
                      setTimeout(function(){
                        $('.change2').hide()
                      },1000)
                    },2000)
                  
              }else{ //下拉后未到指定位置，初始化文字位置
              
                    $('.change2').hide();
                    $('.y-r div span').css({'transition':".4s"})
                    $('.y-1').css({'left':'-20px','top':'-10px',})
                    $('.y-2').css({'left':'-5px','top':'-5px',})
                    $('.y-3').css({'left':'20px','top':'-3px',})
                    $('.A-1').css({'left':'-15px','top':'-20px',})
                    $('.A-2').css({'left':'30px','top':'-15px',})
                    $('.A-3').css({'left':'25px','top':'-25px'})
                    $('.H-1').css({'left':'45px','top':'-10px',})
                    $('.H-2').css({'left':'30px','top':'-20px',})
                    $('.H-3').css({'left':'30px','top':'-5px'})
                    $('.H2-1').css({'left':'45px','top':'5px',})
                    $('.H2-2').css({'left':'-30px','top':'-10px'})
                    $('.H2-3').css({'left':'55px','top':'-15px'})
              }
          }); 
}
 
  doRefresh(refresher) {
   
   if(refresher.deltaY > 140 && $('.change').css('opacity')==0){
        setTimeout(() => {
            console.log('刷新完成');
            this.presentToast()
            refresher.complete();
        }, 2500);
      }else{
           refresher.complete();
      }
     
  }
  presentToast() { //烤面包提示框
    let toast = this.toastCtrl.create({
      message: "为你更新了2条新内容",
      duration: 2000,
      position:'middle',
      cssClass:'toastCustomCss'
    });
    toast.present();
  }
  slideChanged() { //获取当前轮播图下标
    let currentIndex = this.slides.getActiveIndex();
    // console.log('Current index is', currentIndex);
  }
} 
 