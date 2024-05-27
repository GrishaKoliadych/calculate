let CCcountry = 0; //КРАIНА ОДИНОЧНИЙ
let CCButton = 0; //КРАIНА ОПТОВИЙ

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
            if ($(window).width() > 1350) {
                calcCost.css("display", "flex");
                adjustHeight(calcCost);
            } else
                calcCost.css("display", "block");
            calcwh.css("display", "none");
        } else {
            if ($(window).width() > 1350) {
                calcwh.css("display", "flex");
                adjustHeight(calcwh);
            } else
                calcwh.css("display", "block");
            calcCost.css("display", "none");
        }
    });

    function adjustHeight(container) {
        let inputs = container.find(".inputs");
        let outputs = container.find(".outputs");
        if (inputs.outerHeight() < outputs.outerHeight())
            inputs.css("height", outputs.outerHeight());
        else
            outputs.css("height", inputs.outerHeight());
    }

    if ($(window).width() > 1350) adjustHeight(calcCost);

    //ОДИНОЧНИЙ КАЛЬКУЛЯТОР
    calcCost.find(".select-header").each(function() {
        let header = $(this);
        let sbody = header.next(".select-body");
        let items = sbody.find(".select-item");
        let current = header.find(".select-current");
    
        header.click(function() {
            sbody.css("width", header.outerWidth());
            sbody.toggleClass("is-active");
        });
    
        items.click(function() {
            current.text($(this).text());
            CCcountry = $(this).index();
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
            calculateCost(cCInstance, CCcountry, CCButton, rightInfo, true);
        });
    });

    //ОПТОВИЙ КАЛЬКУЛЯТОР
    calcwh.find(".select-header").each(function() {
        let header = $(this);
        let sbody = header.next(".select-body");
        let items = sbody.find(".select-item");
        let current = header.find(".select-current");
    
        header.click(function() {
            sbody.css("width", header.outerWidth());
            sbody.toggleClass("is-active");
        });
    
        items.click(function() {
            current.text($(this).text());
            CWcountry = $(this).index();
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
            calculateCost(cWInstance, CWcountry, CWButton, rightInfo, true);
        });
    });


    function calculateCost(container, country, button, rightInfo, deliveryPrice) {
        let textFieldInput = container.find(".text-field__input");
        const priceCar = Number(textFieldInput.eq(0).val()) + crossBorder[country] + processingDocs[country];
        const priceColl = collection[country];
        const priceDelivery = 450;
        const priceService = Number(textFieldInput.eq(1).val());
        const priceEurope = Number(textFieldInput.eq(2).val());
        const priceSwift = (0.05 * (priceCar + priceColl)).toFixed(2);
        const priceAll = priceCar + priceColl + priceDelivery + priceService + Number(priceSwift) + 250 + 100 + button + priceEurope;
    
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
            priceAll + del
        ].map(getFormatValue);
    
        [0, 1, 2, 4, 6, 7, 8].forEach((index, i) => {
            rightInfo.eq(index).text(formattedValues[i]);
        });
    }
    
    function getFormatValue(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }
    
});
