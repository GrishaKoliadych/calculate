let CCcountry = 0; //КРАIНА ОДИНОЧНИЙ
let CCButton = 0; //КРАIНА ОПТОВИЙ

let CCFuel = 0; //ТИП ПАЛИВА ОДИНОЧНИЙ
let CWFuel = 0; //ТИП ПАЛИВА ОПТОВИЙ

let CWcountry = 0; //КНОПКА ОДИНОЧНИЙ
let CWButton = 0; //КНОПКА ОПТОВИЙ
const collection = [700, 700, 700, 800, 800, 700, 900, 900, 900, 900]; //АУК ЗБIР

const crossBorder = [139, 99, 89, 185, 149, 139, 245, 149, 379, 189]; //ТРАНСКОРДОННI
const processingDocs = [249, 149, 269, 229, 259, 249, 229, 252, 189, 159]; //ОБРОБКА ДОКУМЕНТIВ

$(document).ready(function() {
    let calcCost = $(".calc-cost");
    let calcwh = $(".calc-wholesale");

    $(".tab-main").click(function() {
        $(".tab-main").removeClass('active');
        $(this).addClass('active');
        if ($(this).index() == 0) {
            if ($(window).width() > 1350) calcCost.css("display", "flex");
            else calcCost.css("display", "block");
            calcwh.css("display", "none");
        } else {
            if ($(window).width() > 1350) calcwh.css("display", "flex");
            else calcwh.css("display", "block");
            calcCost.css("display", "none");
        }
    });

    //ОДИНОЧНИЙ КАЛЬКУЛЯТОР
    calcCost.find(".select-header").each(function() {
        let sbody = $(this).next(".select-body");
        let current = $(this).find(".select-current");
        let items = sbody.find('.select-item');
        items.click(function() {
            current.text($(this).text());
            if (sbody.hasClass('country-index')) {
                CCcountry = $(this).index();
            } else if (sbody.hasClass('fuel-index')) {
                CCFuel = $(this).index();
            }
            sbody.toggleClass("is-active");
        });
    
        $(this).click(function() {
            sbody.css("width", $(this).outerWidth());
            sbody.toggleClass("is-active");
        });
    });

    calcCost.find(".neon").each(function() {
        $(this).change(function() {
            CCButton = this.checked ? 200 : 0;
            $(this).closest('.calc-cost').find(".right-info").eq(6).text(CCButton + ",00 €");
        });
    });
    
    calcCost.find(".btn-calc").each(function() {
        $(this).click(function() {
            let cCInstance = $(this).closest('.calc-cost');
            let textFieldInput = cCInstance.find(".text-field__input");
            let rightInfo = cCInstance.find(".right-info");
            for (let i = 0; i < textFieldInput.length; i++) {
                if (textFieldInput.eq(i).val() === '') {
                    textFieldInput.eq(i).focus();
                    return;
                }
            }
            calculateCost(cCInstance, CCcountry, CCButton, CCFuel, rightInfo, true);
        });
    });

    //ОПТОВИЙ КАЛЬКУЛЯТОР
    calcwh.find(".select-header").each(function() {
        let sbody = $(this).next(".select-body");
        let current = $(this).find(".select-current");
        let items = sbody.find('.select-item');
        items.click(function() {
            current.text($(this).text());
            if (sbody.hasClass('country-index')) {
                CWcountry = $(this).index();
            } else if (sbody.hasClass('fuel-index')) {
                CWFuel = $(this).index();
            }
            sbody.toggleClass("is-active");
        });
    
        $(this).click(function() {
            sbody.css("width", $(this).outerWidth());
            sbody.toggleClass("is-active");
        });
    });

    calcwh.find(".neon").each(function() {
        $(this).change(function() {
            CWButton = this.checked ? 200 : 0;
            $(this).closest('.calc-wholesale').find(".right-info").eq(6).text(CWButton + ",00 €");
        });
    });
    
    calcwh.find(".btn-calc").each(function() {
        $(this).click(function() {
            let cWInstance = $(this).closest('.calc-wholesale');
            let textFieldInput = cWInstance.find(".text-field__input");
            let rightInfo = cWInstance.find(".right-info");
            for (let i = 0; i < textFieldInput.length; i++) {
                if (textFieldInput.eq(i).val() === '') {
                    textFieldInput.eq(i).focus();
                    return;
                }
            }
            calculateCost(cWInstance, CWcountry, CWButton, CWFuel, rightInfo, true);
        });
    });


    function calculateCost(container, country, button, fuel, rightInfo, deliveryPrice) {
        let textFieldInput = container.find(".text-field__input");
        const pliceCarOlso = Number(textFieldInput.eq(0).val());
        const priceCar = Number(textFieldInput.eq(0).val()) + crossBorder[country] + processingDocs[country];
        const priceColl = collection[country];
        const priceDelivery = 450;
        const priceService = Number(textFieldInput.eq(1).val());
        const priceEurope = Number(textFieldInput.eq(2).val());

        const yearRelease = Number(textFieldInput.eq(3).val());
        const engineCapacity = Number(textFieldInput.eq(4).val());
        

        //РОЗРАХУНОК РОЗМИТНЕННАЯ ПОЧАТОК
        let basikExcise = 0; //Базовий акциз
        if (fuel == 0) {
            if (engineCapacity <= 3000) basikExcise = 50;
            else basikExcise = 100;
        } else {
            if (engineCapacity <= 3500) basikExcise = 75;
            else basikExcise = 150;
        }


        let coeffYear = 2024 - yearRelease - 1; //Коефiцiєнт вiку
        if (coeffYear < 1) coeffYear = 1;
        else if (coeffYear > 15) coeffYear = 15;

        const excise = basikExcise * (engineCapacity / 1000) * coeffYear; //Акциз
        const toll = pliceCarOlso * 0.1; //Мито

        const pdv = (pliceCarOlso + toll + excise) * 0.2;

        const customsclearance = toll + excise + pdv; //Розмитнення
        //РОЗРАХУНОЙ РОЗМИТНЕННЯ КIНЕЦЬ

        const priceSwift = (100 + (0.035 * (priceCar + priceColl))).toFixed(2);
        const priceAll = priceCar + priceColl + priceDelivery + priceService + Number(priceSwift) + 250 + 100 + button + priceEurope + customsclearance;
    
        let del = 0; // НАЦIНКА НА ДОСТАВКУ
        if (deliveryPrice) {
            if (priceAll < 6000) del = 550;
            else if (priceAll <= 8000) del = 960;
            else del = 1500;
        }
    
        const formattedValues = [
            priceCar,
            priceDelivery + del,
            priceEurope,
            priceService,
            button,
            priceSwift,
            customsclearance,
            priceAll + del,
        ].map(getFormatValue);
    
        [0, 1, 2, 4, 6, 7, 8, 9].forEach((index, i) => {
            rightInfo.eq(index).text(formattedValues[i]);
        });
    }
    
    function getFormatValue(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }
    
});
