$(document).ready(function() {
  var url = window.location.href;

  if ((url.includes("/blog/")) || (url.includes("/tags/"))) {
    console.log("BLOG");
    var bricklayer = new Bricklayer(document.querySelector('.bricklayer'))
  }

  // if (url.includes("pace.travel/en/")) {
  // console.log("/en/");
  //
  // var userLang = navigator.language || navigator.userLanguage;
  // if(userLang == "fr"){
  //    window.location.href = "https://pace.travel/fr/"
  // }
  // else if(userLang == "de"){
  //    window.location.href = "https://pace.travel/de/"
  // }
  // else if(userLang == "nl"){
  //    window.location.href = "https://pace.travel/nl/"
  // }
  // };

  $('.pace-carousel').slick({
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  $('.pace-carousel-team').slick({
    dots: true,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  AOS.init();

});
