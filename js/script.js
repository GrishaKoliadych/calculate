let CWFuel = 0; //ТИП ПАЛИВА ОПТОВИЙ

let CWcountry = 0; //КРАIНА ОПТОВИЙ
let CWButton = 0; //КНОПКА ОПТОВИЙ
const collection = [700, 700, 700, 800, 800, 700, 900, 900, 900, 900]; //АУК ЗБIР

const crossBorder = [139, 99, 89, 185, 149, 139, 245, 149, 379, 189]; //ТРАНСКОРДОННI
const processingDocs = [249, 149, 269, 229, 259, 249, 229, 252, 189, 159]; //ОБРОБКА ДОКУМЕНТIВ





let country_CC = 0; //КРАIНА ОДИНОЧНИЙ

const calc_CC = document.querySelector(".calc-cost");
const calc_WH = document.querySelector(".calc-wholesale");
const tabMain = document.querySelectorAll(".tab-main");

//ТАБИ
for (let i = 0; i < tabMain.length; i++) {
    tabMain[i].addEventListener('click', () => {
        for (let j = 0; j < tabMain.length; j++)
            tabMain[j].classList.remove('active');
        tabMain[i].classList.add('active');
        if (i == 0) {
            if (window.outerWidth > 1350) calc_CC.style.display = "flex";
            else calc_CC.style.display = "block";
            calc_WH.style.display = "none";
        } else {
            if (window.outerWidth > 1350) calc_WH.style.display = "flex";
            else calc_WH.style.display = "block";
            calc_CC.style.display = "none";
        }
    });
}

//SELECT КРАIНИ ОДИНОЧНИЙ
const select_CC_header_country = document.querySelector(".select-header-CC-Country");
const selectBody_CC_country = document.querySelector(".select-body-CC-Country");
const current_CC_Country = select_CC_header_country.querySelector(".select-current");
const items_CC_country = selectBody_CC_country.querySelectorAll(".select-item");


select_CC_header_country.addEventListener('click', () => {
    selectBody_CC_country.style.width = select_CC_header_country.offsetWidth + "px";
    selectBody_CC_country.classList.toggle('is-active');
})

for (let i = 0; i < items_CC_country.length; i++) {
    items_CC_country[i].addEventListener('click', () => {
        current_CC_Country.innerText = items_CC_country[i].innerText;
        country_CC = i;
        selectBody_CC_country.classList.toggle('is-active');
    })
}

//КНОПКА РОЗРАХУНКУ ЦIНИ ОДИНОЧНИЙ
const btn_calc_CC_Price = calc_CC.querySelector(".btn-calc-CC-all-price");
btn_calc_CC_Price.addEventListener('click', () => {
    const priceCar_input = calc_CC.querySelector(".auto-Price-CC");
    if (priceCar_input.value == '') {
        priceCar_input.focus();
        return;
    }
    const priceEurope_input = calc_CC.querySelector(".europe-Price-CC");
    if (priceEurope_input.value == '') {
        priceEurope_input.focus();
        return;
    }
    const priceCar = Number(priceCar_input.value); //ЦIНА АВТО
    const priceEurope = Number(priceEurope_input.value); //ЦIНА ДОСТАВКИ З ЕВРОПИ
    const priceService = 550; //ВАРТIСТЬ ПОСЛУГ З ПIДБОРУ
    calculate_CC(country_CC, priceCar, priceService, priceEurope);
});

function calculate_CC(country, priceCar, priceService, priceEurope) {
    const priceCarAuction = priceCar + crossBorder[country] + processingDocs[country]; //ВАРТIСТЬ АВТО + АУК ЗБIР
    const broker = 250; //БРОКЕР
    const certificate = 100; //СЕРТИФIКАТ

    const priceColl = collection[country];
    const priceSwift = (100 + (0.032 * (priceCarAuction + priceColl))); //СВIФТ

    const allPriceNoUK = priceCarAuction + priceEurope + broker + certificate + priceService + priceSwift;

    let priceUK = 0; //ДОСТАВКА ДО УКРАIНИ
    if (allPriceNoUK < 4000) priceUK = 1100;
    if (allPriceNoUK > 4000 && allPriceNoUK < 6000) priceUK = 1450;
    if (allPriceNoUK > 6000) priceUK = 1800;

    const allPriceCar = allPriceNoUK + priceUK; //ВАРТIСТЬ АВТО З ДОСТАВКОЮ ДО УКРАIНИ

    const ouptuts_Main_CC = calc_CC.querySelector(".outputs");
    const labelInfoForAuto = ouptuts_Main_CC.querySelectorAll(".right-info");

    labelInfoForAuto[0].innerText = getFormatValue(priceCarAuction);
    labelInfoForAuto[1].innerText = getFormatValue(priceEurope);
    labelInfoForAuto[2].innerText = getFormatValue(priceService);
    labelInfoForAuto[3].innerText = getFormatValue(priceSwift);
    labelInfoForAuto[5].innerText = getFormatValue(allPriceCar);
    priceCar_CC_Buff = allPriceCar;
    function getFormatValue(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }
}




$(document).ready(function() {
    let calcCost = $(".calc-cost");
    let calcwh = $(".calc-wholesale");

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

        const priceSwift = (100 + (0.032 * (priceCar + priceColl))).toFixed(2);
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
