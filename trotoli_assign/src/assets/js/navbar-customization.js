$(document).ready(function(){
    var scroll_start = 0;
    var startchange_home = $('#how_it_works');
    var startchange_menu = $('#navBar');
    var startchange_packages = $('#tour_section');
    var offset_menu =  startchange_menu.offset();
    var offset_packages =  startchange_packages.offset();
    var offset_home = startchange_home.offset();
    if (startchange_home.length || startchange_packages.length){
        $(document).scroll(function() {
            scroll_start = $(this).scrollTop();
            if(offset_menu !== undefined && scroll_start > offset_menu.top ) {
                $("#navBar").addClass('navbar-fixed-top');
            } else if (offset_menu !== undefined) {
                $("#navBar").removeClass('navbar-fixed-top');
            }

            if(offset_home !== undefined && scroll_start > offset_home.top ) {
                $(".navbar-default").addClass('navbar-default-scrolled');
            } else if (offset_home !== undefined) {
                $('.navbar-default').removeClass('navbar-default-scrolled');
            }

            if(offset_packages !== undefined && scroll_start > offset_packages.top) {
                $(".navbar-default").addClass('navbar-default-scrolled');
            } else if (offset_packages !== undefined){
                $('.navbar-default').removeClass('navbar-default-scrolled');
            }
        });
    }
});