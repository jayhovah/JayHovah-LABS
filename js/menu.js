$(function(){
  
  let btn = $('.menu-btn');
  let gnb = $('.gnb');
  let win = $(window).width();
    
  btn.click(function(){
    btn.toggleClass('love');
    gnb.slideToggle('fast');//수정
  });
  
  $(window).resize(function(){
    win = $(window).width();
      
    if(win >= 623) {
      btn.addClass('love');
      gnb.show();
    } else {
      console.log(win)
      btn.removeClass('love');
      gnb.hide();
    }
    
  });
  
  gnb.click(function(){    
    if(win < 640) {
      btn.removeClass('love');
      gnb.hide();
    }
  });
  
});



