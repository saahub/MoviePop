/**
 * Función centrado de imagen en vista splash
 */

 $.fn.center = function () {
  this.css("position","absolute");
  this.css("top", Math.max(0, (
    ($(window).height() - $(this).outerHeight()) / 2) + 
  $(window).scrollTop()) + "px"
  );
  this.css("left", Math.max(0, (
    ($(window).width() - $(this).outerWidth()) / 2) + 
  $(window).scrollLeft()) + "px"
  );
  return this;
}

/**
 * cargado de función vista splash
 */
 $("#overlay").show();
 $("#overlay-content").show().center();

 setTimeout(function(){    
  $("#overlay").fadeOut();
}, 2000);

/**
 * Función circulo vista splash
 */
 $('#circle').circleProgress({
   value: 1,
   fill: {gradient: [['#ffffff', .5], ['#f7f2f5', .5]], gradientAngle: Math.PI / 4}

 }).on('circle-animation-progress', function(event, progress, stepValue) {
  $(this).find('strong').text(stepValue.toFixed(2).substr(1));
  
});
