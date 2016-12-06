
$.extend($.easing,
{
    def: 'easeOutQuad',
    easeInOutExpo: function (x, t, b, c, d) {
        if (t==0) return b;
        if (t==d) return b+c;
        if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
        return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

(function( $ ) {

    // Attach to window object (global scope) so can use it in other & in-content scripts if need be.
    window.throttle = function(func, wait, tail, begin, thisArg, debounce) {
        if (typeof begin !== 'boolean') begin = true;
        if (typeof thisArg === 'undefined') thisArg = func;
        if (typeof debounce === 'undefined') debounce = false;
        if (debounce) tail = true; // Can't debounce w/o tailing
        
        var timeout = null;
        var time = Date.now();
        return function() {
            
            var expire = time + wait - Date.now();

            if (begin && expire < 0){
                func.apply(thisArg, arguments);
                time = Date.now();
            }
            if (tail) {
                if (timeout !== null) { 
                    clearTimeout(timeout); 
                    timeout = null;
                };
                timeout = setTimeout(function(args){
                    if (time + wait - Date.now() < 0){
                        func.apply(thisArg,args);
                        time = Date.now();
                        if (timeout !== null){
                            clearTimeout(timeout);
                            timeout = null;
                        }
                    }
                }.bind(this), debounce ? wait : expire, arguments);
            }
        };
    }

    $.fn.navScroller = function(options) {
        var navItems = this;
        navItems.settings = $.extend({
            scrollToOffset: 170,
            scrollSpeed: 800,
            activateParentNode: true,
            $document: null
        }, options );
        if (!(navItems.settings.$document instanceof jQuery)) navItems.settings.$document = $(document);
        navItems.navs = {};
        navItems.sections = {};
        navItems.disableScrollFn = false;

        navItems.populateDestinations = function() {
            navItems.each(function(){
                var scrollID = $(this).attr('href').substring(1);
                navItems.navs[scrollID] = (navItems.settings.activateParentNode)? this.parentNode : this;
                navItems.sections[scrollID] = $(document.getElementById(scrollID)).offset().top;
            });
        };

        navItems.scrollTo = function(location){

            function performScroll(targetScrollTop){
                navItems.disableScrollFn = true;
                $('html,body').stop().animate({scrollTop: targetScrollTop},
                    navItems.settings.scrollSpeed, "easeInOutExpo", function(){
                        navItems.disableScrollFn = false;
                        if (targetScrollTop === 0) navItems.settings.$document.trigger('scroll');
                    }
                );
            }

            if (typeof location === 'number'){
                // if target scrollTop px
                if (window.requestAnimationFrame){
                    window.requestAnimationFrame(performScroll.bind(this, location));
                } else {
                    setTimeout(performScroll, 0, location);
                }
            } else if (typeof location === 'string') {
                // if section/nav id (hash pre-removed)
                navItems.scrollTo(Math.max(navItems.sections[location] - navItems.settings.scrollToOffset, 0))
            } else {
                throw new Error("'location' param must be a number (scrollTop) or string (section ID).");
            }
        }

        function activateNav(navID){
            for (nav in navItems.navs) { $(navItems.navs[nav]).removeClass('active'); }
            $(navItems.navs[navID]).addClass('active');
        };

        //attatch click listeners
        var throttledNavClickHandler = throttle(function(event){
            var navID = $(event.target).attr("href").substring(1);
            activateNav(navID);
            navItems.scrollTo(navID);
    	}, 250, false);

    	navItems.on('click', function(e){
            e.preventDefault();
            throttledNavClickHandler.call(this, e);
        });

        // setup scroll listener
        var throttledScrollHandler = throttle(function(event){
            if (navItems.disableScrollFn) { return; }
            var page_height = $(window).height();
            var pos = navItems.settings.$document.scrollTop();
            for (i in navItems.sections) {
                if (
                    (pos + navItems.settings.scrollToOffset + (page_height/4) >= navItems.sections[i]) && 
                    (navItems.sections[i] < pos + (page_height * (3/4)))
                ){
                    activateNav(i);
                }
            }
        }, 100, true);
        navItems.settings.$document.scroll(throttledScrollHandler);

        //populate lookup of clicable elements and destination sections
        navItems.populateDestinations(); //should also be run on browser resize, btw
        window.requestAnimationFrame ? window.requestAnimationFrame(throttledScrollHandler) : throttledScrollHandler();
        return navItems;
    };

    $.fn.topNav = function(options) {
        var $tn = this;
        options = $.extend({
            initiallyOpen : true,
            $document: null,
            $sectionNav: null,
            $pageWrapper: null,
        }, options );
        if (!(options.$document instanceof jQuery)) options.$document = $(document);
        if (!(options.$pageWrapper instanceof jQuery)) options.$pageWrapper = $('body');
        $tn.settings = options;
        $tn.hoverShow = false;
        $tn.pageTopShow = $tn.settings.initiallyOpen;

        var unsetDisableTimeout = null;
        $tn.hide = function(hide){
            if (hide){
                if (unsetDisableTimeout !== null){
                    clearTimeout(unsetDisableTimeout);
                    unsetDisableTimeout = null;
                }
                $tn.settings.$pageWrapper.addClass('navbar-hide navbar-disabled').removeClass('navbar-show');
            } else {
                $tn.settings.$pageWrapper.addClass('navbar-show').removeClass('navbar-hide');
                unsetDisableTimeout = setTimeout(function(){
                    $tn.settings.$pageWrapper.removeClass('navbar-disabled');
                }, 450);
            }
        };

        var throttledScrollHandler = throttle(function(e){
            var pageScrollTop = $tn.settings.$document.scrollTop();

            // Set topNav visible if at page top
            if (pageScrollTop < $tn.height()){
                $tn.pageTopShow = true;
                if (!$tn.hoverShow) {
                    $tn.hide(false);
                }
            } else if ($tn.pageTopShow && pageScrollTop >= $tn.height()) {
                $tn.pageTopShow = false;
                if (!$tn.hoverShow) {
                    $tn.hide(true);
                }
            };

        }, 100, true, true, null, true);

        var throttledMouseMoveHandler = throttle(function(e){
            if (!$tn.hoverShow && e.clientY < 18) {
                $tn.hoverShow = true;
                if (!$tn.pageTopShow){
                    $tn.hide(false);
                }
            } else if ($tn.hoverShow && e.clientY > ( $tn.height() + $tn.settings.$sectionNav.height() )){
                $tn.hoverShow = false;
                if (!$tn.pageTopShow) {
                    $tn.hide(true);
                }
            }
        }, 100, true, true);

        // For mobile / toggleButton :
        $tn.find('i.fa-bars').on('click', function(e){
            $tn.children('ul').toggleClass('collapsed');
        });

        $tn.settings.$document
        .on('scroll', throttledScrollHandler)
        .on('mousemove', throttledMouseMoveHandler);

        throttledScrollHandler();

        return $tn;

    };

    $.fn.equalizer = function(options){
        var $container = this;
        options = $.extend({
            $window: null,
            minWidth : 768
        }, options );
        if (!(options.$window instanceof jQuery)) options.$window = $(window);
        $container.settings = options;
        var throttledResizeHandler = throttle(function(){
            var maxHeight = 0;
            $container.children().height('') // Reset
            .each(function(index, child){
                maxHeight = Math.max(maxHeight, $(child).height());
            })
            .each(function(index, child){
                $(child).height(maxHeight);
            });
        }, 300, true, false, null, true);

        $container.settings.$window.on('resize', throttledResizeHandler);
        throttledResizeHandler();

        return $container;
    }

})( jQuery );


$(document).ready(function (){

    var $document = $(this),
        $pageWrapper = $document.find('#main'),
        $sectionNav = $pageWrapper.find('nav#sectionNav'),
        $sectionNavItems = $sectionNav.find('li a').navScroller({ '$document' : $document }),
        $pageNav = $pageWrapper.find('nav#pageNav').topNav({
            '$document' : $document,
            '$pageWrapper' : $pageWrapper,
            '$sectionNav' : $sectionNav
        });

    //section divider icon click gently scrolls to reveal the section
	$pageWrapper.find(".sectiondivider").on('click', function(event) {
        var $body = $('html,body');
        setTimeout($body.stop().animate.bind($body), 0, {scrollTop: $(event.target.parentNode).offset().top - 50}, 400, "linear");
	});

    //links going to other sections nicely scroll
	$pageWrapper.find(".container a").each(function(){
        var $this = $(this);
        if ($this.attr("href").charAt(0) == '#' && $this.attr("href").length > 1){
            $this.on('click', function(event) {
        		event.preventDefault();
                var target = $(event.target).closest("a");
                var targetHeight =  $(target.attr("href")).offset().top;
                var $body = $('html,body');
                setTimeout($body.stop().animate.bind($body), 0, {scrollTop: targetHeight - 170}, 800, "easeInOutExpo");
            });
        }
	});


    var throttledScrollHandler = throttle(function(){
        var pageScrollTop = $document.scrollTop();

        function pastScrollOffsetAttribute(val){
            if (typeof val === 'number' || val === null){
                if (val !== null) {
                    // Create a sort of 'class string'
                    val = Array(val / 100).fill(1).map(function(v, i){
                        return (i + 1) * 100;
                    }).join(' ');
                }
                $pageWrapper.attr('scroll-offset-past', val);
            } else {
                return $pageWrapper.attr('scroll-offset-past');
            }
        };

        if (pageScrollTop > 100) pastScrollOffsetAttribute(Math.floor(pageScrollTop / 100) * 100);
        else pastScrollOffsetAttribute(null);

    }, 100, true);


    // Adjust top padding when menu items elide on smaller-width screens.
    var throttledResizeHandler = throttle(function(){
        if (window.innerWidth < 768){
            $pageWrapper[0].style.paddingTop = ''; // Reset (for mobile)
        } else {
            $pageWrapper[0].style.paddingTop = (($sectionNav.height() + $pageNav.height()) - $pageNav.attr('orig-height')) + 'px';
        }
        $sectionNavItems.populateDestinations();
    }, 300, true, false, null, true);

    $(window).on('resize', throttledResizeHandler).on('scroll', throttledScrollHandler).on('load', function(){
        $pageWrapper.addClass('page-loaded');
        setTimeout(function(){ $pageWrapper.addClass('page-load-transition'); }, 200);
    });

    // Do initial layout calcs.
    throttledResizeHandler();
    throttledScrollHandler();

});

