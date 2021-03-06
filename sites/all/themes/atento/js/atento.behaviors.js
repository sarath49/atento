(function ($) {
  var search_link = 0;
  var search_box = 0;
  
  Drupal.behaviors.mobileHeroResize = {
    attach: function (context, settings) {
      $(window).load(mobileHeroResizeAdjust);
      $(window).resize(mobileHeroResizeAdjust);
    }
  };
  
  function mobileHeroResizeAdjust() {
    width = parseInt($(window).width(), 10);
    if ( width <= 540 || width >= 750 ) {
      $('.mobile-hero-background img').removeAttr('style');
      return;
    }
    
    
    hero_margin = -((((width-40)/500*196)-196)/2);
    $('.mobile-hero-background img').css('margin-top', hero_margin + 'px');
  }
  
  Drupal.behaviors.mmenuSettings = {
    attach: function (context, settings) {
      $('#menu-closer', context).once('mmenu', function () {
        // Open by Default First Menu Item
        $('a.mm-subopen.mm-fullsubopen').click();
        
        // Code Close Menu.
        var API = $("#mmenu_left").data("mmenu");
        $(this).click(function(e){
          API.close();
          e.preventDefault();
        });
        
        // Add Search to Mobile Menu
        $('#msearch-form').appendTo('#mheader');
      });
    }
  };
        

  /**
   * Behavior for Search Box
   */
  Drupal.behaviors.atentoSearchBox = {
    attach: function (context, settings) {
      $('#menu-search-link', context).once('atentoSearchBox', function () {
        $('#menu-search-link').click(function(e){
          if ( search_link == 1 ) {
            return false;
          }
          
          search_link = 1;
          if ( search_box == 0 ) {
            $('#block-search-form').fadeIn(100, function(){
              search_box = 1;
              search_link = 0;
              $('#block-search-form .form-item-search-block-form input').focus();
            });
          } else {
            $('#block-search-form').fadeOut(100, function(){
              search_box = 0;
              search_link = 0;
            });
          }
          e.preventDefault();
        });
      });
    }
  };

  /**
   * Behavior for Landing Pages
   */
  Drupal.behaviors.atentoLandingPages = {
    attach: function (context, settings) {
      $('.vocabulary-categories.view-mode-full > .landing-body', context).once('atentoLandingBody', function () {
        // Get Height of Next Column
        var secondColumnHeight = parseInt($('#block-atentom-taxonomy-children').outerHeight(true), 10) - 110;
        $(this).height(secondColumnHeight);
      });
    }
  };

  /**
   * Behavior for Landing Pages
   */
  Drupal.behaviors.atentoFileDownload = {
    attach: function (context, settings) {
      $('.file-download', context).once('atentoFileDownload', function () {
        $(this).click(function(e){
          window.location = $(this).attr('href');
        });
      });
    }
  };
  
  /**
   * The recommended way for producing HTML markup through JavaScript is to write
   * theming functions. These are similiar to the theming functions that you might
   * know from 'phptemplate' (the default PHP templating engine used by most
   * Drupal themes including Omega). JavaScript theme functions accept arguments
   * and can be overriden by sub-themes.
   *
   * In most cases, there is no good reason to NOT wrap your markup producing
   * JavaScript in a theme function.
   */
  Drupal.theme.prototype.atentoExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };

  /**
   * Behavior for Files Rows
   */
  Drupal.behaviors.atentoFilesRows = {
    attach: function (context, settings) {
      $('.files.photoswipe-gallery', context).once('filesRows', function () {
        var items = $(this).find('.file-preview');
        // Set columns
        $(items).each(function(index){
          col = index%3 + 1;
          $(this).addClass('col-' + col);
        });
        
        // Open First by Default
        var count = items.length;
        var rows = Math.ceil(count/3);
        for(i=0; i<rows; i++) {
          start = i*3;
          end = (i+1)*3;
          chunk = $(items).slice(start, end);
          $(chunk).addClass('row-' + (i+1));
          if ( i == 0 ) {
            $(chunk).addClass('row-first');
          }
          if ( i == (rows-1) ) {
            $(chunk).addClass('row-last');
          }
        }
      });
    }
  };
  
  /**
   * Behavior for Accordion
   */
  Drupal.behaviors.atentoAccordion = {
    attach: function (context, settings) {
      $('.accordion', context).once('atento', function () {
        // Open First by Default
        //$(this).find('.accordion-item.first').addClass('on');
        
        // Add Click Event
        $(this).find('.accordion-item .field-name-field-title').click(atentoAccordionClick);
        
      });
    }
  };
  
  function scrollSmooth(obj) {
    var postop = parseInt($(obj).offset().top, 10) - parseInt($('body').css('padding-top'), 10);
    postop = postop + 'px';
    $('html, body').animate({
      scrollTop: postop
    }, 500);
  }
  
  function atentoAccordionClick(e) {
    btn = $(this);
    // Just Hide this One if is On
    if ( $(btn).parent().hasClass('on') ) {
      $(btn).parent().find('.accordion-content').slideUp(300, function(){
        $(this).parent().removeClass('on').addClass('off');
      });
      e.preventDefault();
      return false;
    }
    
    // Close Previous
    $(btn).parent().parent().parent().find('.accordion-item.on .accordion-content').slideUp(300, function(){
      $(this).parent().removeClass('on').addClass('off');
    });
    
    // Open This One
    $(btn).parent().find('.accordion-content').slideDown(300, function(){
      $(this).parent().parent().removeClass('off').addClass('on');
      scrollSmooth(btn);
    });
    
    e.preventDefault();
  }

})(jQuery);
