console.log($('.location-choice'))

$('.location-choice').click(function (event) {
    $('#search-input').css({
        'background': 'url("' + event.target.firstElementChild.src + '") no-repeat scroll 7px 7px',
        'background-size': '30px 30px',
        'padding-left':'40px',
        'background-color': 'white'
    })
    $('#search-input').val(event.target.innerText)
})