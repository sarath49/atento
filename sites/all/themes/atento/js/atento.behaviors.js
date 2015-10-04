(function ($) {

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
        // Open First by Default
        var items = $(this).find('.file-preview');
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
        $(this).find('.accordion-item.first').addClass('on');
        
        // Add Click Event
        $(this).find('.accordion-item .field-name-field-title').click(atentoAccordionClick);
        
      });
    }
  };
  
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
    $(btn).parent().parent().find('.accordion-item.on .accordion-content').slideUp(300, function(){
      $(this).parent().removeClass('on').addClass('off');
    });
    
    // Open This One
    $(btn).parent().find('.accordion-content').slideDown(300, function(){
      $(this).parent().removeClass('off').addClass('on');
    });
    
    e.preventDefault();
  }

})(jQuery);
