$(document).ready(function() {
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        responsive:{
            0:{
                items:1
            }
        }
    });


    const kos = {
        text: "Кострома",
        value: "kos"
    };
    const snt = {
        text: "Санкт-Петербург",
        value: "snt"
    };
    const yar =  {
        text: "Ярославль",
        value: "yar"
    };
    const vol = {
        text: "Вологда",
        value: "vol"
    };
    const cher = {
        text: "Череповец",
        value: "cher"
    };

    const fromOptions = [
        kos,
        snt,
        yar,
        vol,
        cher
    ];
    
    const amountByDirection = {
        ["kos-snt"]: 2000,
        ["snt-kos"]: 2000,
        ["kos-yar"]: 250,
        ["kos-vol"]: 600,
        ["kos-cher"]: 1200,
        ["snt-cher"]: 1000,
        ["snt-vol"]: 1500,
        ["snt-yar"]: 2000,
        ["yar-vol"]: 500,
        ["yar-kos"]: 250,
        ["yar-snt"]: 2000,
        ["yar-cher"]: 1200,
        ["vol-kos"]: 600,
        ["vol-snt"]: 1500,
        ["vol-yar"]: 500,
        ["vol-cher"]: 600,
        ["cher-snt"]: 1000,
        ["cher-vol"]: 600,
        ["cher-yar"]: 1200,
        ["cher-kos"]: 1200,
    }; 
    const pricesDict = new Map([
            [1, {amount: 2000, time: "19:00"}],
            [2, {amount: 2000, time: "19:00"}],
            [3, {amount: 250, time: "19:00"}],
            [4, {amount: 600, time: "19:00"}],
            [5, {amount: 1200, time: "19:00"}],
            [6, {amount: 1000, time: "19:00"}],
            [7, {amount: 1500, time: "19:00"}],
            [8, {amount: 2000, time: "19:00"}],
            [9, {amount: 500, time: "20:30"}],
            [10, {amount: 250, time: "5:00"}],
            [11, {amount: 2000, time: "20:30"}],
            [12, {amount: 1200, time: "20:30"}],
            [13, {amount: 600, time: "2:00"}],
            [14, {amount: 1500, time: "0:00"}],
            [15, {amount: 500, time: "2:00"}],
            [16, {amount: 600, time: "0:00"}],
            [17, {amount: 1000, time: "2:00"}],
            [18, {amount: 600, time: "0:30"}],
            [19, {amount: 1200, time: "0:30"}],
            [20, {amount: 1200, time: "0:30"}],
        ]
    );

    const availableToByFrom = {
        kos: [snt, yar, vol, cher],
        snt: [kos, yar, vol, cher],
        yar: [kos, snt, vol, cher],
        vol: [kos, snt, yar, cher],
        cher: [kos, snt, yar, vol],
    };

    let form = {
        to: "",
        from: "",
        count: ""
    };
    
    const isValid = () => Boolean(form.to && form.from && form.count);
    const calculate = () => {
        const nameField = `${form.from}-${form.to}`;

        return `${amountByDirection[nameField] * form.count} р.`;
    };
    const $sumBlock = $("#sum")[0];
    const $submitButton = $(".reservation__pass-form-submit-value")[0];

    // $("#direction")
    //     .selectmenu({
    //         appendTo: ".reservation__pass-form-column",
    //         change: function(event, ui) {
    //             const {item: {index}} = ui;
    //             const {amount, time} = pricesDict.get(index) || {};
    //
    //             const select = document.querySelector('#time');
    //
    //             const today = new Date();
    //
    //             const timeNow = +`${today.getHours()}${today.getMinutes()}`;
    //             const timeDirection = +time.replace(":", "");
    //
    //             if (timeNow > timeDirection) {
    //                 form.time = form.time && "";
    //
    //                 const today = new Date();
    //                 const dayInMs = 1000 * 60 * 60 * 24;
    //
    //                 today.setHours(0);
    //                 today.setMinutes(0);
    //                 today.setSeconds(0);
    //                 today.setMilliseconds(0);
    //
    //                 const minDate = new Date(today.getTime() + dayInMs);
    //
    //                 $("#datepicker").datepicker( "option", "minDate", minDate);
    //             } else {
    //                 $("#datepicker").datepicker( "option", "minDate", new Date());
    //             }
    //
    //             form.time = time;
    //             select.options[1].text = time;
    //             select.options[1].value = time;
    //             select.value = time;
    //
    //             $( "#time" ).selectmenu( "refresh" );
    //
    //             form.direction = amount;
    //
    //             $("#direction-button").css({"background":"white"});
    //
    //             if (isValid()) {
    //                 $sumBlock.innerHTML = calculate();
    //             }
    //         }
    //     })
    //     .selectmenu("menuWidget")
    //     .addClass("overflow");

    $("#from")
        .selectmenu({
            create: function(event, ui) {
                const selectFrom = document.querySelector('#from');

                fromOptions.forEach(({text, value}, index) => {
                    selectFrom.options[index + 1] = new Option(text, value);
                });

                $("#from").selectmenu("refresh");
            },
            change: function(event, ui) {
                form.from = ui.item.value;

                const isDisabledTo = $("#to").selectmenu("option", "disabled");

                if (form.from === form.to || !isDisabledTo) {
                    form.to = availableToByFrom[ui.item.value][0].value;
                }

                $("#to").selectmenu( "option", "disabled", false );

                const selectFrom = document.querySelector('#from');

                fromOptions.forEach(({text, value}, index) => {
                    const isSelected = value === ui.item.value;

                    selectFrom.options[index + 1] = new Option(text, value, isSelected, isSelected);
                    $("#from").selectmenu("refresh");
                });

                const selectTo = document.querySelector('#to');

                availableToByFrom[ui.item.value].forEach(({text, value}, index) => {
                    selectTo.options[index + 1] = new Option(text, value);

                    $("#to").selectmenu("refresh");
                });

                $("#time-button").css({"background":"white"});

                if (isValid()) {
                    $sumBlock.innerHTML = calculate();
                }

            }
        })
        .selectmenu( "menuWidget" );


    $("#to")
        .selectmenu({
            create: function(event, ui) {
                $("#to").selectmenu( "option", "disabled", true );
            },
            change: function(event, ui) {
                form.to = ui.item.value;

                $("#count").selectmenu( "option", "disabled", false);

                $("#time-button").css({"background":"white"});

                if (isValid()) {
                    $sumBlock.innerHTML = calculate();
                }
            }
        })
        .selectmenu( "menuWidget" );


    // $("#time")
    //     .selectmenu({
    //         change: function(event, ui) {
    //             form.time = ui.item.value;
    //
    //             $("#time-button").css({"background":"white"});
    //
    //             if (isValid()) {
    //                 $sumBlock.innerHTML = calculate();
    //             }
    //
    //         }
    //     })
    //     .selectmenu( "menuWidget" );

    $("#count")
        .selectmenu({
            create: function(event, ui) {
                $("#count").selectmenu( "option", "disabled", true);
            },
            change: function() {
                form.count = +$(this).find("option:selected")[0].getAttribute("count");

                $("#count-button").css({"background":"white"});

                if (isValid()) {
                    $sumBlock.innerHTML = calculate();
                }
            }
        })
        .selectmenu( "menuWidget" );


    // $("#datepicker").datepicker({
    //     minDate: new Date(),
    //     onSelect: function(dateText) {
    //         form.date = dateText;
    //
    //         $("#datepicker").css({"background":"white"});
    //
    //         if (isValid()) {
    //             $sumBlock.innerHTML = calculate();
    //         }
    //     }
    // });

    // $.datepicker.regional.ru = {
    //     closeText: "Закрыть",
    //     prevText: "&#x3C;Пред",
    //     nextText: "След&#x3E;",
    //     currentText: "Сегодня",
    //     monthNames: [ "Январь","Февраль","Март","Апрель","Май","Июнь",
    //         "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь" ],
    //     monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
    //         "Июл","Авг","Сен","Окт","Ноя","Дек" ],
    //     dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
    //     dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
    //     dayNamesMin: [ "Вс","Пн","Вт","Ср","Чт","Пт","Сб" ],
    //     weekHeader: "Нед",
    //     dateFormat: "dd.mm.yy",
    //     firstDay: 1,
    //     isRTL: false,
    //     showMonthAfterYear: false,
    //     yearSuffix: "" };
    // $.datepicker.setDefaults( $.datepicker.regional.ru );

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