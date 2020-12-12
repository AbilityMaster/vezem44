$(document).ready(function($) {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsive:{
            0:{
                items:1
            }
        }
    });

    let form = {
        count: "",
        direction: "",
        date: "",
        time: ""
    };

    let isSuccessCalculated = false;
    const isValid = () => form.direction && form.count && form.date && form.time;
    const calculate = () => { isSuccessCalculated = true; return `${form.direction * form.count} р.`; };
    const $sumBlock = $("#sum")[0];
    const $submitButton = $(".reservation__pass-form-submit-value")[0];

    $("#direction")
        .selectmenu({
            change: function() {
                form.direction = +$(this).find("option:selected")[0].getAttribute("sum");

                $("#direction-button").css({"background":"white"});

                if (isValid()) {
                    $sumBlock.innerHTML = calculate();
                }

            }
        })
        .selectmenu( "menuWidget" )
        .addClass( "overflow" );

    $("#time")
        .selectmenu({
            change: function(event, ui) {
                form.time = ui.item.value;

                $("#time-button").css({"background":"white"});

                if (isValid()) {
                    $sumBlock.innerHTML = calculate();
                }

            }
        })
        .selectmenu( "menuWidget" )
        .addClass( "overflow" );

    $("#count")
        .selectmenu({
            change: function() {
                form.count = +$(this).find("option:selected")[0].getAttribute("count");

                $("#count-button").css({"background":"white"});

                if (isValid()) {
                    $sumBlock.innerHTML = calculate();
                }
            }
        })
        .selectmenu( "menuWidget" )
        .addClass( "overflow" );

    $("#datepicker").datepicker({
        onSelect: function(dateText) {
            form.date = dateText;

            $("#datepicker").css({"background":"white"});

            if (isValid()) {
                $sumBlock.innerHTML = calculate();
            }
        }
    });

    $submitButton.addEventListener("click", () => {
        if (isValid()) {
            $sumBlock.innerHTML = calculate();
        }

        return false;
    });

    $('.popup__open').click(function() {
        $('.popup-fade').fadeIn();
        return false;
    });

    $('.popup__close').click(function() {
        $(this).parents('.popup-fade').fadeOut();
        return false;
    });

    $(document).keydown(function(e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('.popup-fade').fadeOut();
        }
    });

    $('.popup-fade').click(function(e) {
        if ($(e.target).closest('.popup').length === 0) {
            $(this).fadeOut();
        }
    });

    $("#popup-phone").mask("+7 (999) 999-99-99");

    $("#how-much-pay").click(function() {
        if (form.direction === "") {
            $("#direction-button").css({"background-color":"rgb(255, 208, 208)"});
        }

        if (form.count === "") {
            $("#count-button").css({"background-color":"rgb(255, 208, 208)"});
        }

        if (form.date === "") {
            $("#datepicker").css({"background-color":"rgb(255, 208, 208)"});
        }

        if (form.time === "") {
            $("#time-button").css({"background-color":"rgb(255, 208, 208)"});
        }
    });

    $('.button-what-pay').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('#bronirovanie').offset().top }, 800);
        e.preventDefault();
    });

    $('.menu__link-direction').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('.directions').offset().top }, 800);
        e.preventDefault();
    });

    $('.menu__link-amount').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('.directions').offset().top }, 800);
        e.preventDefault();
    });

    $('.menu__link-contacts').on('click', function(e){
        $('html,body').stop().animate({ scrollTop: $('.about-us').offset().top }, 800);
        e.preventDefault();
    });
});