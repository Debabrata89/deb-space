$(function () {
    // Gallery
    //$('.carousel').carousel({
    //    interval: false
    //});

    // For checkbox/radio style
    $('.cb').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%' // optional
    });

    $('input[type="checkbox"]').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%' // optional
    });

    // Booking sidebar affix
    $('.booking-sidebar-wrap').affix({
        offset: {
            top: ($('.header-wrap').outerHeight(true)),
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true) + 45)
            }
        }
    });
});
// $.typeahead({
//     input: '.js-typeahead-location',
//     minLength: 1,
//     order: "asc",
//     dynamic: true,
//     delay: 500,
//     backdrop: {
//         "background-color": "#fff"
//     },
//     template: function (query, item) {
//         return '<span class="row">' +
//             '<span class="autocomplete">{{autocomplete}}</span>' +
//             "</span>"
//     },
//     emptyTemplate: "no result for {{query}}",
//     source: {
//         user: {
//             display: "autocomplete",
//             href: "/packages/?location={{id}}",
//             ajax: function (query) {
//                 return {
//                     type: "GET",
//                     url: "/api/locations",
//                     path: "results",
//                     data: {
//                         q: "{{query}}"
//                     },
//                     callback: {
//                         done: function (data) {
//                             return data;
//                         }
//                     }
//                 }
//             }
//
//         },
//
//     },
//     callback: {
//         onSendRequest: function (node, query) {
//             console.log('request is sent')
//         },
//         onReceiveRequest: function (node, query) {
//             console.log('request is received')
//         }
//     },
//     debug: true
// });
<!-- Multiselect dropdown -->
$(".select2").select2();

/* For image thump of search dropdown */
function formatState(state) {
    if (!state.id) {
        return state.text;
    }
    var $state = $(
        '<span><img src="{% static "images/search-thumb.png" %}" class="img-flag" /> ' + state.text + '</span>'
    );
    return $state;
}
;

$(".select2-dd").select2({
    templateResult: formatState,
    minimumResultsForSearch: Infinity
});

/* /For image thump of search dropdown */



//Date Picker
$('.datepicker').datepicker({
    format: "dd/mm/yyyy",
    todayBtn: "linked",
    clearBtn: true,
    autoclose: true,
    todayHighlight: true
});

//Number spinner
$('.spinner').bootstrapNumber({
    upClass: 'success',
    downClass: 'danger'
});

$('.forgot-bar .close').on('click', function () {
    $('.forgot-bar').fadeOut();
});

$(".typeahead__query").focusin(function(){
    $(".default-location").fadeIn();
});

$(".typeahead__query").focusout(function(){
    $(".default-location").fadeOut();
});

$(".location-input").keypress(function(){
    $(".default-location").fadeOut();
});