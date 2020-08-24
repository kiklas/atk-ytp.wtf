// Cache selectors
$(document).ready(function(){
    var topMenu = $("#atkytpnavbar");
    var topMenuHeight = topMenu.outerHeight()+15;
    // All list items
    var menuItems = topMenu.find(".nav-item a");
    // Anchors corresponding to menu items
    var scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
        $('html, body').stop().animate({ 
            scrollTop: offsetTop
        }, 300);
        e.preventDefault();
    });
    $('.navbar-toggler').on('click', function() {
        $('.navbar-toggler-icon').toggle();
        $('.navbar-close-icon').toggle();
    });
    $('.nav-link').on('click', function(){
        $('.navbar-toggler').trigger('click');
    })

    // Bind to scroll
    $(window).scroll(function(){
        // Get container scroll position
        var fromTop = $(this).scrollTop()+topMenuHeight;
        // Get id of current scroll item
        var cur = scrollItems.map(function(){
            if ($(this).offset().top < fromTop)
            return this;
        });
        // Get the id of the current element
        cur = cur[cur.length-1];

        var id = cur && cur.length ? cur[0].id : "";
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#"+id+"']").parent().addClass("active");
    })
});