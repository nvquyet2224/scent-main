const modules = index.modules;
const $ = modules.$;

let scrollPosition = 0;

function togglePopup(show) {
  console.log(window.scrollY);
  const body = document.body;

  if (show) {
    scrollPosition = window.scrollY;
    $('body').addClass('no-scroll');
    body.style.top = `-${scrollPosition}px`;
  } else {
    $('body').removeClass('no-scroll');
    window.scrollTo(0, scrollPosition);
  }
}

function navClick() {
  $(document).on('click', '.hamburger-open', function(){
    $(".header").addClass("open-menu");
    togglePopup(true);
  });

  $(document).on('click', '.hamburger-close, .header-overlay', function(){
    $(".header").removeClass("open-menu");
    togglePopup(false);
  });
}

function faqClick() {
  $(document).on('click', '.item__title', function(){
    var parent = $(this).parent();
    var detail = parent.find('.item__detail');

    if(parent.hasClass('active')) {
      detail.css({'height': 0});
      parent.removeClass('active');
    } else {
      var oldActive = $('.faq__item.active');  
      if(oldActive.length) {
        var oldDetail = oldActive.find('.item__detail');
        oldActive.removeClass('active');
        oldDetail.css({'height': 0});
      }
      var bodyH = parent.find('.item__body').innerHeight();
      detail.css({'height': bodyH});
      parent.addClass('active');
    }

  });
}

var industrySelected = [];
function getIndustry() {
  industrySelected = [];
  $('.select__box').find('li.selected').each(function(_index, elm){
    var value = $(elm).attr('data-value');
    industrySelected.push(value);
  });
  renderIndustrySelected();
}

function renderIndustrySelected() {
  $('.selected__block').html('');
  var html = '';
  for(var item of industrySelected) {
    html += `<div class="selected__item" data-selected="${item}">
        <span>${item}</span>
        <span class="remove__item"></span>
      </div>`;
  }
  $('.selected__block').html(html);
}

function industryClick() {

  // Open industry
  $(document).on('click', '.select__header', function(){
    var parent = $(this).parent();
    if(parent.hasClass('open')) {
      parent.removeClass('open');
    }else {
      parent.addClass('open');
    }
  });

  // select Industry
  $(document).on('click', '.select__box li', function(){
    if($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
    setTimeout(function(){
      getIndustry();
    },100);
  });

  // remove Industry
  $(document).on('click', '.selected__item', function(e){
    e.stopPropagation();
    var value = $(this).attr('data-selected');
    var elm = $('.select__box li[data-value='+ value +']');
    if(elm.length) {
      elm.trigger('click');
    }
    
  });

  // detect click out
  var $targetIndustry = $(".select");
  $(document).on("click", function (event) {
      if (!$targetIndustry.is(event.target) && $targetIndustry.has(event.target).length === 0) {
          if($targetIndustry.hasClass('open')) {
            $targetIndustry.removeClass('open')
          }
      }
  });
}

(function () {
  navClick();
  faqClick();
  industryClick();

  // mockup event submit
  $('#btnSubmit').on('click', function(){
    $('.message').addClass('show__message');
  });


})();
