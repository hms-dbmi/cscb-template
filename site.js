
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
    window.throttle = function(func, wait, tail) {
        var time = Date.now();
        var timeout = null;
        return function() {
            var expire = time + wait - Date.now();
            if (expire < 0) {
                func.apply(func, arguments);
                time = Date.now();
                if (timeout !== null){
                    clearTimeout(timeout);
                    timeout = null;
                }
            } else if (tail) {
                if (timeout !== null){
                    clearTimeout(timeout);
                }
                timeout = setTimeout(func.bind(func,arguments), expire);
            }
        }
    }

    $.fn.navScroller = function(options, $document) {
        var navItems = this;
        navItems.settings = $.extend({
            scrollToOffset: 170,
            scrollSpeed: 800,
            activateParentNode: true,
        }, options );
        navItems.navs = {};
        navItems.sections = {};
        navItems.disableScrollFn = false;
        if (!($document instanceof jQuery)) $document = $(document);

        navItems.populateDestinations = function() {
            navItems.each(function(){
                var scrollID = $(this).attr('href').substring(1);
                navItems.navs[scrollID] = (navItems.settings.activateParentNode)? this.parentNode : this;
                navItems.sections[scrollID] = $(document.getElementById(scrollID)).offset().top;
            });
        };

        navItems.activateNav = function(navID){
            for (nav in navItems.navs) { $(navItems.navs[nav]).removeClass('active'); }
            $(navItems.navs[navID]).addClass('active');
        };

        //attatch click listeners
        var throttledNavClickHandler = throttle(function(event){
            var navID = $(event.target).attr("href").substring(1);
            navItems.disableScrollFn = true;
            navItems.activateNav(navID);
        	$('html,body').stop().animate({scrollTop: navItems.sections[navID] - navItems.settings.scrollToOffset},
                navItems.settings.scrollSpeed, "easeInOutExpo", function(){
                    navItems.disableScrollFn = false;
                }
            );
    	}, 250, false);
    	navItems.on('click', function(e){
            e.preventDefault();
            throttledNavClickHandler.call(this, e);
        });

        // setup scroll listener
        var throttledScrollHandler = throttle(function(event){
            if (navItems.disableScrollFn) { return; }
            var page_height = $(window).height();
            var pos = $document.scrollTop();
            for (i in navItems.sections) {
                if ((pos + navItems.settings.scrollToOffset >= navItems.sections[i]) && navItems.sections[i] < pos + page_height){
                    navItems.activateNav(i);
                }
            }
        }, 100, true);
        $document.scroll(throttledScrollHandler);

        //populate lookup of clicable elements and destination sections
        navItems.populateDestinations(); //should also be run on browser resize, btw
        window.requestAnimationFrame ? window.requestAnimationFrame(throttledScrollHandler) : throttledScrollHandler();
        return navItems;
    };

})( jQuery );


$(document).ready(function (){

    var $document = $(this),
        $pageWrapper = $document.find('#main'),
        $pageNav = $pageWrapper.find('nav#pageNav'),
        $sectionNav = $pageWrapper.find('nav#sectionNav'),
        $sectionNavItems = $sectionNav.find('li a').navScroller({}, $document);

    //section divider icon click gently scrolls to reveal the section
	$pageWrapper.find(".sectiondivider").on('click', function(event) {
    	$('html,body').stop().animate({scrollTop: $(event.target.parentNode).offset().top - 50}, 400, "linear");
	});

    //links going to other sections nicely scroll
	$pageWrapper.find(".container a").each(function(){
        if ($(this).attr("href").charAt(0) == '#'){
            $(this).on('click', function(event) {
        		event.preventDefault();
                var target = $(event.target).closest("a");
                var targetHight =  $(target.attr("href")).offset().top
            	$('html,body').animate({scrollTop: targetHight - 170}, 800, "easeInOutExpo");
            });
        }
	});

    var topNav = {

        hide : function(hide){
            if (hide){
                $pageWrapper.addClass('navbar-hide').removeClass('navbar-show');
            } else {
                $pageWrapper.addClass('navbar-show').removeClass('navbar-hide');
            }
        },

        pastScrollOffsetAttribute : function(val){
            if (typeof val !== undefined){
                $pageWrapper.attr('scroll-offset-past', val);
            } else {
                return $pageWrapper.attr('scroll-offset-past');
            }
        },

        pageTopShow : true,
        throttledScrollHandler : throttle(function(){
            var pageScrollTop = $document.scrollTop();

            // Set topNav visible if at page top
            if (!topNav.pageTopShow && pageScrollTop < $pageNav.height()){
                topNav.pageTopShow = true;
                if (!topNav.hoverShow) {
                    topNav.hide(false);
                }
            } else if (topNav.pageTopShow && pageScrollTop >= $pageNav.height()) {
                topNav.pageTopShow = false;
                if (!topNav.hoverShow) {
                    topNav.hide(true);
                }
            }

            if (pageScrollTop > 800) topNav.pastScrollOffsetAttribute(800);
            else if (pageScrollTop > 700) topNav.pastScrollOffsetAttribute(700);
            else if (pageScrollTop > 600) topNav.pastScrollOffsetAttribute(600);
            else if (pageScrollTop > 500) topNav.pastScrollOffsetAttribute(500);
            else if (pageScrollTop > 400) topNav.pastScrollOffsetAttribute(400);
            else if (pageScrollTop > 300) topNav.pastScrollOffsetAttribute(300);
            else if (pageScrollTop > 200) topNav.pastScrollOffsetAttribute(200);
            else if (pageScrollTop > 100) topNav.pastScrollOffsetAttribute(100);
            else topNav.pastScrollOffsetAttribute(null);
        }, 100, true),

        hoverShow : false,
        throttledMouseMoveHandler : throttle(function(e){
            if (!topNav.hoverShow && e.clientY < 18) {
                topNav.hoverShow = true;
                if (!topNav.pageTopShow){
                    topNav.hide(false);
                }
            } else if (topNav.hoverShow && e.clientY > ( $pageNav.height() + $sectionNav.height() )){
                topNav.hoverShow = false;
                if (!topNav.pageTopShow) {
                    topNav.hide(true);
                }
            }
        }, 100, true)

    };


    // Adjust top padding when menu items elide on smaller-width screens.
    var throttledResizeHandler = throttle(function(){
        $pageWrapper[0].style.paddingTop = ($sectionNav.height() - 70) + $pageNav.height() + 'px';
        $sectionNavItems.populateDestinations();
    }, 300, true);

    $document
    .on('resize', throttledResizeHandler)
    .on('scroll', topNav.throttledScrollHandler)
    .on('mousemove', topNav.throttledMouseMoveHandler);

    // Do initial layout calcs.
    throttledResizeHandler();
    topNav.throttledScrollHandler();

});

