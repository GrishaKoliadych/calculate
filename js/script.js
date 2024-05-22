let CCcountry = 0;
const CCcollection = [700, 700, 700, 800, 800, 700, 900, 900, 900, 900];
let CCButton = 0;

let CWcountry = 0;
const CWcollection = [700, 700, 700, 800, 800, 700, 900, 900, 900, 900];
let CWButton = 0;

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
            } else {
                calcCost.css("display", "block");
            }
            calcwh.css("display", "none");
        } else {
            if ($(window).width() > 1350) {
                calcwh.css("display", "flex");
                adjustHeight(calcwh);
            } else {
                calcwh.css("display", "block");
            }
            calcCost.css("display", "none");
        }
    });

    function adjustHeight(container) {
        let inputs = container.find(".inputs");
        let outputs = container.find(".outputs");
        if (inputs.outerHeight() < outputs.outerHeight()) {
            inputs.css("height", outputs.outerHeight());
        } else {
            outputs.css("height", inputs.outerHeight());
        }
    }

    if ($(window).width() > 1350) adjustHeight(calcCost);

    let CCselectHeader = calcCost.find(".select-header");
    let CCselectBody = calcCost.find(".select-body");
    let CCselectItem = calcCost.find(".select-item");
    let CCselectCurrent = calcCost.find(".select-current");
    let CCBtnCalc = calcCost.find(".btn-calc");
    let CCneon = calcCost.find(".neon");

    CCselectHeader.click(function() {
        CCselectBody.css("width", CCselectHeader.outerWidth());
        CCselectBody.toggleClass("is-active");
    });

    CCselectItem.click(function() {
        CCselectCurrent.text($(this).text());
        CCcountry = $(this).index();
        CCselectBody.toggleClass("is-active");
    });

    CCneon.change(function() {
        CCButton = this.checked ? 200 : 0;
        calcCost.find(".right-info").eq(6).text(CCButton + " €");
    });

    CCBtnCalc.click(function() {
        let textFieldInput = calcCost.find(".text-field__input");
        let rightInfo = calcCost.find(".right-info");
        for (let i = 0; i < textFieldInput.length; i++) {
            if (textFieldInput.eq(i).val() === '') {
                textFieldInput.eq(i).focus();
                return;
            }
        }
        calculateCost(calcCost, CCcollection, CCcountry, CCButton, rightInfo);
    });

    let CWselectHeader = calcwh.find(".select-header");
    let CWselectBody = calcwh.find(".select-body");
    let CWselectItem = calcwh.find(".select-item");
    let CWselectCurrent = calcwh.find(".select-current");
    let CWBtnCalc = calcwh.find(".btn-calc");
    let CWneon = calcwh.find(".neon");

    CWselectHeader.click(function() {
        CWselectBody.css("width", CWselectHeader.outerWidth());
        CWselectBody.toggleClass("is-active");
    });

    CWselectItem.click(function() {
        CWselectCurrent.text($(this).text());
        CWcountry = $(this).index();
        CWselectBody.toggleClass("is-active");
    });

    CWneon.change(function() {
        CWButton = this.checked ? 200 : 0;
        calcwh.find(".right-info").eq(6).text(CWButton + " €");
    });

    CWBtnCalc.click(function() {
        let textFieldInput = calcwh.find(".text-field__input");
        let rightInfo = calcwh.find(".right-info");
        for (let i = 0; i < textFieldInput.length; i++) {
            if (textFieldInput.eq(i).val() === '') {
                textFieldInput.eq(i).focus();
                return;
            }
        }
        calculateCost(calcwh, CWcollection, CWcountry, CWButton, rightInfo);
    });

    function calculateCost(container, collection, country, button, rightInfo) {
        let textFieldInput = container.find(".text-field__input");
        const priceCar = Number(textFieldInput.eq(0).val());
        const priceColl = Number(collection[country]);
        const priceDelivery = container.is(calcCost) ? 1500 : 350;
        const priceService = Number(textFieldInput.eq(1).val());
        const priceEurope = Number(textFieldInput.eq(2).val());
        const priceSwift = Number(5 * (priceCar + priceColl) / 100).toFixed(2);
        const priceAll = priceCar + priceColl + priceDelivery + priceService + Number(priceSwift) + 250 + 100 + button + priceEurope;

        rightInfo.eq(0).text(priceCar + " €");
        rightInfo.eq(1).text(priceDelivery + " €");
        rightInfo.eq(2).text(priceEurope + " €");
        rightInfo.eq(4).text(priceService + " €");
        rightInfo.eq(6).text(button + " €");
        rightInfo.eq(7).text(priceSwift + " €");
        rightInfo.eq(8).html(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(priceAll));
    }
});
