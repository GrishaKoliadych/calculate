let CWFuel = 0; //ТИП ПАЛИВА ОПТОВИЙ

let CWcountry = 0; //КРАIНА ОПТОВИЙ
let CWButton = 0; //КНОПКА ОПТОВИЙ
const collection = [700, 700, 700, 800, 800, 700, 900, 900, 900, 900]; //АУК ЗБIР

const crossBorder = [139, 99, 89, 185, 149, 139, 245, 149, 379, 189]; //ТРАНСКОРДОННI
const processingDocs = [249, 149, 269, 229, 259, 249, 229, 252, 189, 159]; //ОБРОБКА ДОКУМЕНТIВ





let country_CC = 0; //КРАIНА ОДИНОЧНИЙ
let fuelType_CC = 0; //ТИП ПАЛИВА ОДИНОЧНИЙ
let priceCar_CC_Buff = 0; //БУФЕР ФIНАЛЬНОI ЦIНИ ДЛЯ РОЗМИТНЕННЯ
let buttonCC = 0; //КНОПКА ОДИНОЧНИЙ

const calc_CC = document.querySelector(".calc-cost");
const calc_WH = document.querySelector(".calc-wholesale");
const calc_america = document.querySelector(".calc-america");
const tabMain = document.querySelectorAll(".tab-main");

//ТАБИ
for (let i = 0; i < tabMain.length; i++) {
    tabMain[i].addEventListener('click', () => {
        for (let j = 0; j < tabMain.length; j++)
            tabMain[j].classList.remove('active');
        tabMain[i].classList.add('active');
        if (i == 0) {
            if (window.outerWidth > 950) calc_CC.style.display = "flex";
            else calc_CC.style.display = "block";
            calc_WH.style.display = "none";
            calc_america.style.display = "none"
        } else if (i == 1) {
            if (window.outerWidth > 950) calc_WH.style.display = "flex";
            else calc_WH.style.display = "block";
            calc_CC.style.display = "none";
            calc_america.style.display = "none"
        } else {
            if (window.outerWidth > 950) calc_america.style.display = "flex";
            else calc_america.style.display = "block";
            calc_CC.style.display = "none";
            calc_WH.style.display = "none";
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

calc_CC.querySelector(".neon").addEventListener('change', () => {
    buttonCC = calc_CC.querySelector(".neon").checked ? 250 : 0;
    console.log("s");
});

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

    const allPriceNoUK = priceCarAuction + priceEurope + broker + certificate + priceService + priceSwift + buttonCC;

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



//SELECT ТИПА ПАЛИВА ОДИНОЧНИЙ
const select_CC_header_fuel = document.querySelector(".select-header-CC-Fuel");
const selectBody_CC_fuel = document.querySelector(".select-body-CC-Fuel");
const current_CC_fuel = select_CC_header_fuel.querySelector(".select-current");
const items_CC_fuel= selectBody_CC_fuel.querySelectorAll(".select-item");

select_CC_header_fuel.addEventListener('click', () => {
    selectBody_CC_fuel.style.width = select_CC_header_fuel.offsetWidth + "px";
    selectBody_CC_fuel.classList.toggle('is-active');
})

for (let i = 0; i < items_CC_fuel.length; i++) {
    items_CC_fuel[i].addEventListener('click', () => {
        current_CC_fuel.innerText = items_CC_fuel[i].innerText;
        fuelType_CC = i;
        selectBody_CC_fuel.classList.toggle('is-active');
    })
}

const btn_calc_CC_clearance = calc_CC.querySelector(".btn-calc-CC-clearance");
btn_calc_CC_clearance.addEventListener('click', () => {
    const priceCar_input = calc_CC.querySelector(".auto-Price-CC");
    if (priceCar_input.value == '') {
        priceCar_input.focus();
        return;
    }
    const yearRelease_label = calc_CC.querySelector(".year-Release-CC");
    if (yearRelease_label.value == '') {
        yearRelease_label.focus();
        return;
    }
    const engineCapacity_label = calc_CC.querySelector(".engine-Capacity-CC");
    if (engineCapacity_label.value == '') {
        engineCapacity_label.focus();
        return;
    }

    const pliceCarOlso = Number(priceCar_input.value) + 300;
    const yearRelease = Number(yearRelease_label.value);
    const engineCapacity = Number(engineCapacity_label.value);

    let basikExcise = 0; //Базовий акциз
    if (fuelType_CC == 0) {
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

    const ouptuts_Main_CC = calc_CC.querySelector(".outputs");
    const labelInfoForAuto = ouptuts_Main_CC.querySelectorAll(".right-info");

    labelInfoForAuto[4].innerText = getFormatValue(customsclearance);
    labelInfoForAuto[5].innerText = getFormatValue(Number(priceCar_CC_Buff) + Number(customsclearance));

    function getFormatValue(value) {
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
    }
});









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




//КАЛЬКУЛЯТОР АМЕРИКА




let america_state = 0; //Штат
let america_fuel = 0; //Тип двигуна

const select_header_fuel_America = document.querySelector(".select-header-Fuel-America");
const selectBody_fuel_America = document.querySelector(".select-body-Fuel-America");
const current_fuel_America = select_header_fuel_America.querySelector(".select-current");
const items_fuel_America = selectBody_fuel_America.querySelectorAll(".select-item");

select_header_fuel_America.addEventListener('click', () => {
    selectBody_fuel_America.style.width = select_header_fuel_America.offsetWidth + "px";
    selectBody_fuel_America.classList.toggle('is-active');
})

for (let i = 0; i < items_fuel_America.length; i++) {
    items_fuel_America[i].addEventListener('click', () => {
        current_fuel_America.innerText = items_fuel_America[i].innerText;
        america_fuel = i;
        selectBody_fuel_America.classList.toggle('is-active');
    })
}


const statesInfo = [
    {state: "ABILENE - TX", price: 420, port: 3},
    {state: "ACE - Carson (CA)", price: 345, port: 4},
    {state: "ACE - Perris - CA", price: 310, port: 4},
    {state: "ACE - Perris 2 - CA", price: 310, port: 4},
    {state: "ADELANTO-CA", price: 320, port: 4},
    {state: "AKRON-CANTON (OH)", price: 600, port: 1},
    {state: "ALBANY - NY", price: 325, port: 1},
    {state: "ALBUQUERQUE - NM", price: 770, port: 3},
    {state: "ALDEN NY", price: 545, port: 1},
    {state: "ALTOONA - PA", price: 490, port: 1},
    {state: "AMARILLO - TX", price: 495, port: 3},
    {state: "AMERICAN CANYON CA", price: 545, port: 4},
    {state: "AMSTERDAM NY", price: 420, port: 1},
    {state: "ANAHEIM (CA)", price: 260, port: 4},
    {state: "ANCHORAGE - AK", price: 2570, port: 4},
    {state: "ANDREWS-TX", price: 495, port: 3},
    {state: "ANTELOPE - CA", price: 1270, port: 3},
    {state: "APPLETON - WI", price: 400, port: 5},
    {state: "ARROLIME NV", price: 520, port: 4},
    {state: "ASHEVILLE - NC", price: 420, port: 2},
    {state: "Ashland KY", price: 520, port: 2},
    {state: "ATLANTA EAST - GA", price: 395, port: 2},
    {state: "ATLANTA GA", price: 395, port: 2},
    {state: "ATLANTA NORTH - GA", price: 395, port: 2},
    {state: "ATLANTA SOUTH - GA", price: 395, port: 2},
    {state: "ATLANTA WEST - GA", price: 395, port: 2},
    {state: "AUGUSTA - GA", price: 370, port: 2},
    {state: "AUSTIN - TX", price: 320, port: 3},
    {state: "AVENEL NEW JERSEY (NJ)", price: 245, port: 1},
    {state: "BAKERSFIELD - CA", price: 370, port: 4},
    {state: "BALTIMORE - MD", price: 370, port: 1},
    {state: "BATON ROUGE - LA", price: 395, port: 3},
    {state: "BILLINGS - MT", price: 920, port: 6},
    {state: "BIRMINGHAM - AL", price: 475, port: 2},
    {state: "BISMARCK - ND", price: 1170, port: 5},
    {state: "BOISE-ID", price: 570, port: 6},
    {state: "BOSTON - SHIRLEY - MA", price: 445, port: 1},
    {state: "Bowling Green - KY", price: 460, port: 6},
    {state: "BRIDGEPORT (PA)", price: 345, port: 1},
    {state: "BRIDGETON MO", price: 420, port: 5},
    {state: "Buckhannon MV", price: 620, port: 1},
    {state: "BUFFALO - NY", price: 545, port: 1},
    {state: "Burlington (VT)", price: 670, port: 1},
    {state: "CANDIA - NH", price: 445, port: 1},
    {state: "CARTERSVILLE - GA", price: 370, port: 1},
    {state: "CASPER - WY", price: 1020, port: 5},
    {state: "CENTRAL NEW JERSEY", price: 245, port: 1},
    {state: "CHAMBERSBURG - PA", price: 420, port: 1},
    {state: "CHARLESTON - SC", price: 320, port: 2},
    {state: "CHARLESTON - WV", price: 570, port: 1},
    {state: "CHARLOTTE (NC)", price: 370, port: 2},
    {state: "CHATTANOOGA-TN", price: 520, port: 2},
    {state: "CHICAGO HEIGHTS IL", price: 320, port: 5},
    {state: "CHICAGO NORTH - IL", price: 270, port: 5},
    {state: "CHICAGO SOUTH - IL", price: 270, port: 5},
    {state: "Chicago-West IL", price: 270, port: 5},
    {state: "CHINA GROVE - NC", price: 395, port: 2},
    {state: "CICERO-IN", price: 320, port: 5},
    {state: "CINCINNATI - OH", price: 550, port: 1},
    {state: "CLEARWATER-FL", price: 370, port: 7},
    {state: "Cleveland - OH", price: 650, port: 1},
    {state: "CLEVELAND EAST - OH", price: 650, port: 1},
    {state: "CLEVELAND WEST - OH", price: 650, port: 1},
    {state: "CLEWISTON FL", price: 395, port: 7},
    {state: "COLORADO SPRINGS - CO", price: 720, port: 5},
    {state: "COLTON - CA", price: 280, port: 4},
    {state: "COLUMBIA - MO", price: 420, port: 4},
    {state: "COLUMBIA - SC", price: 290, port: 2},
    {state: "COLUMBUS - OH", price: 600, port: 1},
    {state: "CONCORD - NC", price: 370, port: 2},
    {state: "CORPUS CHRISTI - TX", price: 345, port: 3},
    {state: "CRASHEDTOYS DALLAS - TX", price: 335, port: 3},
    {state: "CUDAHY WI", price: 450, port: 5},
    {state: "CULPEPER - VA", price: 420, port: 1},
    {state: "DALLAS SOUTH - TX", price: 370, port: 3},
    {state: "DALLAS- TX", price: 370, port: 3},
    {state: "DANVILLE - VA", price: 445, port: 2},
    {state: "DAVENPORT - IA", price: 445, port: 5},
    {state: "DAYTON - OH", price: 650, port: 1},
    {state: "DENVER - CO", price: 620, port: 5},
    {state: "DENVER CENTRAL-CO", price: 620, port: 5},
    {state: "DENVER EAST - CO", price: 745, port: 3},
    {state: "DENVER SOUTH - CO", price: 620, port: 5},
    {state: "DES MOINES - IA", price: 380, port: 5},
    {state: "DETROIT - MI", price: 500, port: 5},
    {state: "DOTHAN - AL", price: 500, port: 2},
    {state: "Dream Rides", price: 420, port: 1},
    {state: "DREAM RIDES", price: 520, port: 4},
    {state: "DUNDALK - MD", price: 395, port: 1},
    {state: "DYER-IN", price: 320, port: 5},
    {state: "EARLINGTON-KY", price: 520, port: 5},
    {state: "EAST BAY (CA)", price: 495, port: 4},
    {state: "EAST BETHEL - MN", price: 670, port: 1},
    {state: "EL PASO - TX", price: 520, port: 3},
    {state: "ELDRIDGE - IA", price: 420, port: 5},
    {state: "ELK RIVER MN", price: 445, port: 5},
    {state: "ELKTON – MD", price: 370, port: 1},
    {state: "ENGLISHTOWN (NJ)", price: 245, port: 1},
    {state: "ERIE - PA", price: 595, port: 1},
    {state: "EUGENE - OR", price: 470, port: 6},
    {state: "Eugene OR", price: 870, port: 4},
    {state: "EXETER - RI", price: 395, port: 1},
    {state: "FAIR HAVEN - VT", price: 670, port: 1},
    {state: "FAIRBURN-GA", price: 345, port: 2},
    {state: "FARGO (ND)", price: 970, port: 5},
    {state: "FAYETTEVILLE - AR", price: 520, port: 3},
    {state: "FLINT - MI", price: 500, port: 5},
    {state: "FONTANA - CA", price: 320, port: 4},
    {state: "Fort Myers-FL", price: 420, port: 7},
    {state: "FORT WAYNE - IN", price: 370, port: 5},
    {state: "FORT WORTH NORTH (TX)", price: 395, port: 3},
    {state: "FREDERICKSBURG - VA", price: 420, port: 1},
    {state: "Fredericksburg-South - VA", price: 420, port: 1},
    {state: "FREETOWN - MA", price: 445, port: 1},
    {state: "FREMONT - CA", price: 445, port: 4},
    {state: "FRESNO - CA", price: 420, port: 4},
    {state: "FRUITLAND MD", price: 420, port: 1},
    {state: "FT.PIERCE - FL", price: 270, port: 7},
    {state: "FT.WORTH - TX", price: 345, port: 3},
    {state: "GASTON SC", price: 320, port: 2},
    {state: "GASTONIA-NC", price: 370, port: 2},
    {state: "GLASSBORO EAST - NJ", price: 270, port: 1},
    {state: "GLASSBORO WEST - NJ", price: 300, port: 1},
    {state: "GORHAM - ME", price: 520, port: 1},
    {state: "GRAHAM-WA", price: 370, port: 6},
    {state: "GRAND RAPIDS (MI)", price: 500, port: 5},
    {state: "GREENSBORO (NC)", price: 395, port: 2},
    {state: "GREENVILLE (SC)", price: 320, port: 2},
    {state: "GREER - SC", price: 295, port: 2},
    {state: "GRENADA (MS)", price: 570, port: 2},
    {state: "Gulf Coast (MS)", price: 520, port: 3},
    {state: "HAM LAKE MN", price: 420, port: 5},
    {state: "HAMMOND - IN", price: 270, port: 5},
    {state: "HAMPTON - VA", price: 420, port: 1},
    {state: "HARRISBURG - PA", price: 370, port: 1},
    {state: "HARTFORD - CT", price: 305, port: 1},
    {state: "HARTFORD SPRINGFIELD-CT", price: 305, port: 1},
    {state: "Hartford-South - CT", price: 310, port: 1},
    {state: "HAYWARD - CA", price: 470, port: 4},
    {state: "HELENA-MT", price: 870, port: 6},
    {state: "HIGH DESERT - CA", price: 250, port: 4},
    {state: "HONOLULU - HI", price: 2500, port: 4},
    {state: "HOUSTON - TX", price: 270, port: 3},
    {state: "HOUSTON EAST - TX", price: 300, port: 3},
    {state: "Houston South - TX", price: 300, port: 3},
    {state: "Houston-North - TX", price: 300, port: 3},
    {state: "HUDSON MA", price: 445, port: 1},
    {state: "INDIANAPOLIS - IN", price: 420, port: 5},
    {state: "IONIA - MI", price: 400, port: 5},
    {state: "JACKSON - MS", price: 445, port: 3},
    {state: "JACKSONVILLE EAST - FL", price: 270, port: 2},
    {state: "JACKSONVILLE NORTH -FL", price: 270, port: 2},
    {state: "JACKSONVILLE WEST - FL", price: 270, port: 2},
    {state: "JOBSTOWN NJ", price: 320, port: 1},
    {state: "KANSAS CITY - KS", price: 495, port: 5},
    {state: "Kansas City East - MO", price: 495, port: 5},
    {state: "KINCHELOE - MI", price: 850, port: 5},
    {state: "KNOXVILLE - TN", price: 470, port: 2},
    {state: "LAFAYETTE (LA)", price: 345, port: 3},
    {state: "LANCASTER CA", price: 320, port: 4},
    {state: "LANSING - MI", price: 600, port: 5},
    {state: "LAS VEGAS - NV", price: 520, port: 4},
    {state: "Laurel - MD", price: 420, port: 1},
    {state: "LEXINGTON EAST - KY", price: 445, port: 5},
    {state: "LEXINGTON SC", price: 345, port: 2},
    {state: "LEXINGTON WEST - KY", price: 445, port: 5},
    {state: "LINCOLN - NE", price: 520, port: 5},
    {state: "LITTLE ROCK - AR", price: 495, port: 3},
    {state: "LONG BEACH - CA", price: 220, port: 4},
    {state: "LONG ISLAND - NY", price: 320, port: 1},
    {state: "LONGVIEW - TX", price: 320, port: 3},
    {state: "LOS ANGELES - CA", price: 270, port: 4},
    {state: "Los Angeles South - CA", price: 320, port: 4},
    {state: "LOUISVILLE - KY", price: 495, port: 5},
    {state: "Louisville North - KY", price: 495, port: 5},
    {state: "LUBBOCK - TX", price: 495, port: 3},
    {state: "LUFKIN - TX", price: 295, port: 3},
    {state: "LUMBERTON -NC", price: 345, port: 2},
    {state: "LYMAN - ME", price: 520, port: 1},
    {state: "MACON - GA", price: 320, port: 2},
    {state: "MADISON - WI", price: 325, port: 5},
    {state: "MALVERN PA", price: 245, port: 1},
    {state: "Manchester (NH)", price: 470, port: 1},
    {state: "MARTINEZ - CA", price: 470, port: 4},
    {state: "MCALLEN - TX", price: 380, port: 3},
    {state: "ME - WINDHAM", price: 520, port: 1},
    {state: "MEBANE - NC", price: 370, port: 2},
    {state: "MEMPHIS - TN", price: 495, port: 5},
    {state: "MENTONE - CA", price: 320, port: 4},
    {state: "METRO DC", price: 395, port: 1},
    {state: "MIAMI CENTRAL - FL", price: 270, port: 7},
    {state: "MIAMI NORTH - FL", price: 270, port: 7},
    {state: "MIAMI SOUTH - FL", price: 270, port: 7},
    {state: "MILWAUKEE - WI", price: 350, port: 5},
    {state: "MILWAUKEE NORTH - WI", price: 350, port: 5},
    {state: "MILWAUKEE SOUTH - WI", price: 350, port: 5},
    {state: "MINNEAPOLIS - MN", price: 420, port: 5},
    {state: "MINNEAPOLIS NORTH - MN", price: 420, port: 5},
    {state: "MISSOULA(MT)", price: 770, port: 6},
    {state: "MOBILE - AL", price: 450, port: 2},
    {state: "MOCKSVILLE - NC", price: 370, port: 2},
    {state: "MODESTO CA", price: 520, port: 3},
    {state: "MONTGOMERY - AL", price: 475, port: 2},
    {state: "NASHVILLE - TN", price: 470, port: 2},
    {state: "NEW BRITAIN CT", price: 305, port: 1},
    {state: "NEW CASTLE - WY", price: 370, port: 1},
    {state: "NEW ORLEANS - LA", price: 470, port: 2},
    {state: "New Orleans East - LA", price: 470, port: 3},
    {state: "NEWBURGH - NY", price: 320, port: 1},
    {state: "NORTH BOSTON - MA", price: 445, port: 1},
    {state: "NORTH CHARLESTON", price: 295, port: 2},
    {state: "NORTH HOLYWOOD - СА", price: 270, port: 4},
    {state: "NORTH SEATTLE-WA", price: 320, port: 6},
    {state: "NORTHERN VIRGINIA (VA)", price: 470, port: 1},
    {state: "OCALA - FL", price: 345, port: 7},
    {state: "OGDEN- UT", price: 470, port: 4},
    {state: "OKLAHOMA CITY - OK", price: 595, port: 3},
    {state: "OMAHA (NE)", price: 445, port: 5},
    {state: "ORLANDO - FL", price: 345, port: 7},
    {state: "ORLANDO NORTH - FL", price: 295, port: 7},
    {state: "ORLANDO SOUTH - FL", price: 370, port: 2},
    {state: "Orleans - VT", price: 620, port: 1},
    {state: "Paducah - KY", price: 495, port: 5},
    {state: "PASCO - WA", price: 470, port: 6},
    {state: "PENNSBURG PA", price: 320, port: 1},
    {state: "PENSACOLA (FL)", price: 495, port: 7},
    {state: "Pensacola FL", price: 445, port: 2},
    {state: "PEORIA-IL", price: 345, port: 5},
    {state: "Permian Basin - TX", price: 520, port: 3},
    {state: "PHILADELPHIA - PA", price: 300, port: 1},
    {state: "PHILADELPHIA EAST", price: 300, port: 1},
    {state: "PHILADELPHIA EAST - SUBLOT - PA", price: 270, port: 1},
    {state: "PHOENIX - AZ", price: 420, port: 4},
    {state: "PITTSBURG SOUTH - PA", price: 545, port: 1},
    {state: "PITTSBURGH EAST - PA", price: 545, port: 1},
    {state: "PITTSBURGH NORTH - PA", price: 545, port: 1},
    {state: "PITTSBURGH WEST - PA", price: 545, port: 1},
    {state: "Port Murray - NJ", price: 320, port: 1},
    {state: "Portage WI", price: 425, port: 5},
    {state: "PORTLAND (OR)", price: 470, port: 6},
    {state: "PORTLAND GORHAM (ME)", price: 520, port: 1},
    {state: "PORTLAND NORTH - OR", price: 470, port: 6},
    {state: "PORTLAND SOUTH - OR", price: 470, port: 6},
    {state: "Providence - RI", price: 445, port: 1},
    {state: "PULASKI - TN", price: 520, port: 1},
    {state: "PUNTA GORDA - FL", price: 320, port: 7},
    {state: "PUYALLUP (WA)", price: 300, port: 6},
    {state: "RALEIGH - NC", price: 370, port: 2},
    {state: "RALEIGH NORTH-NC", price: 395, port: 2},
    {state: "RANCHO CUCAMONGA - CA", price: 270, port: 4},
    {state: "RAPID CITY - SD", price: 720, port: 5},
    {state: "REDDING - CA", price: 595, port: 4},
    {state: "RENO - NV", price: 620, port: 4},
    {state: "RICHMOND - VA", price: 470, port: 1},
    {state: "RICHMOND EAST-VA", price: 470, port: 1},
    {state: "Roanoke (VA)", price: 520, port: 1},
    {state: "ROCHESTER - NY", price: 470, port: 1},
    {state: "RUTLAND - VT", price: 670, port: 1},
    {state: "SACRAMENTO - CA", price: 445, port: 4},
    {state: "SAINT LOUIS MO", price: 420, port: 5},
    {state: "SALT LAKE CITY - UT", price: 545, port: 4},
    {state: "SAN ANTONIO - TX", price: 345, port: 3},
    {state: "San Antonio-South - TX", price: 345, port: 3},
    {state: "SAN BERNARDINO- CA", price: 270, port: 4},
    {state: "SAN DIEGO - CA", price: 370, port: 4},
    {state: "SAN JOSE - CA", price: 495, port: 4},
    {state: "SAN MARTIN-CA", price: 470, port: 4},
    {state: "SANTA PAULA CA", price: 270, port: 4},
    {state: "SAVANNAH - GA", price: 195, port: 2},
    {state: "SAYREVILLE (NJ)", price: 270, port: 1},
    {state: "SCRANTON - PA", price: 345, port: 1},
    {state: "Scranton PA", price: 345, port: 1},
    {state: "SEAFORD - DE", price: 370, port: 1},
    {state: "SEATTLE (WA)", price: 220, port: 6},
    {state: "SHADY SPRING-VW", price: 545, port: 2},
    {state: "SHREVEPORT - LA", price: 345, port: 3},
    {state: "SIKESTON - MO", price: 495, port: 5},
    {state: "SIOUX FALLS (SD)", price: 645, port: 5},
    {state: "SO SACRAMENTO - CA", price: 495, port: 4},
    {state: "SOMERVILLE - NJ", price: 245, port: 1},
    {state: "SOUTH BEND (IN)", price: 370, port: 5},
    {state: "SOUTH BOSTON - MA", price: 420, port: 1},
    {state: "SOUTHERN ILLINOIS - IL", price: 545, port: 5},
    {state: "SOUTHERN NEW JERSEY", price: 345, port: 1},
    {state: "SPANAWAY WA", price: 295, port: 6},
    {state: "SPARTANBURG - SC", price: 370, port: 2},
    {state: "Specialty Division IL", price: 420, port: 5},
    {state: "SPOKANE - WA", price: 420, port: 6},
    {state: "SPRINGFIELD - MO", price: 520, port: 5},
    {state: "ST. CLOUD - MN", price: 495, port: 5},
    {state: "ST. LOUIS - MO", price: 420, port: 5},
    {state: "STATEN ISLAND NY", price: 320, port: 1},
    {state: "Suffolk VA", price: 445, port: 1},
    {state: "SUN VALLEY - CA", price: 270, port: 4},
    {state: "SYRACUSE - NY", price: 390, port: 1},
    {state: "TALLAHASSEE - FL", price: 395, port: 2},
    {state: "Tampa - FL", price: 400, port: 2},
    {state: "Tampa North - FL", price: 400, port: 2},
    {state: "TAMPA SOUTH - FL", price: 400, port: 2},
    {state: "TANNER - AL", price: 500, port: 2},
    {state: "TAUNTON (MA)", price: 445, port: 1},
    {state: "TAYLOR TX", price: 395, port: 3},
    {state: "TEMPLETON (MA)", price: 420, port: 1},
    {state: "THONOTOSASSA FL", price: 420, port: 7},
    {state: "TIDEWATER (VA)", price: 470, port: 1},
    {state: "TIFTON - GA", price: 320, port: 2},
    {state: "TRENTON - NJ", price: 295, port: 1},
    {state: "TUCSON - AZ", price: 445, port: 4},
    {state: "TULSA - OK", price: 595, port: 3},
    {state: "VALLEJO - CA", price: 520, port: 4},
    {state: "VAN NUYS - CA", price: 270, port: 4},
    {state: "WACO - TX", price: 370, port: 3},
    {state: "WALTON - KY", price: 420, port: 4},
    {state: "WASHINGTON DC - MD", price: 395, port: 1},
    {state: "WAYLAND - MI", price: 450, port: 5},
    {state: "WEST MIFFLIN PA", price: 570, port: 1},
    {state: "WEST PALM BEACH - FL", price: 270, port: 7},
    {state: "WEST WARREN MA", price: 395, port: 1},
    {state: "Western Colorado - CO", price: 720, port: 5},
    {state: "WHEELING IL", price: 245, port: 5},
    {state: "WHITE MARSH MD", price: 420, port: 1},
    {state: "WICHITA - KS", price: 620, port: 3},
    {state: "Wilmington (NC)", price: 420, port: 2},
    {state: "WINDHAM (ME)", price: 520, port: 1},
    {state: "YORK HAVEN - PA", price: 370, port: 1},
    {state: "Calgary CA (Copart)", price: 1600, port: 8},
    {state: "Calgary CA (Impact)", price: 1500, port: 8},
    {state: "Edmonton CA (Copart)", price: 1600, port: 8},
    {state: "Edmonton CA (Impact)", price: 1500, port: 8},
    {state: "Halifax CA (Copart)", price: 1250, port: 8},
    {state: "Halifax CA (Impact)", price: 825, port: 8},
    {state: "Hamilton (CANADA)", price: 510, port: 8},
    {state: "Kenora", price: 1100, port: 8},
    {state: "London (CANADA)", price: 550, port: 8},
    {state: "Manitoba", price: 1200, port: 8},
    {state: "Moncton CA (Copart)", price: 1325, port: 8},
    {state: "MONCTON CA (Impact)", price: 725, port: 8},
    {state: "Montreal CA (Copart)", price: 600, port: 8},
    {state: "Montreal CA (Impact)", price: 250, port: 8},
    {state: "Ottawa CA (Copart)", price: 600, port: 8},
    {state: "Ottawa CA (Impact)", price: 325, port: 8},
    {state: "QUEBEC CITI CA (Copart)", price: 600, port: 8},
    {state: "QUEBEC CITY CA (Impact)", price: 350, port: 8},
    {state: "Rivieredu LOUP/QC CA (Copart)", price: 1200, port: 8},
    {state: "Rivieredu Loup/QC CA (Impact)", price: 750, port: 8},
    {state: "Saskatoon (CANADA)", price: 1500, port: 8},
    {state: "St Filibere/QC (CANADA)", price: 600, port: 8},
    {state: "ST JOHNS CA (Copart)", price: 2100, port: 8},
    {state: "St Johns Newfoundland CA (Impact)", price: 1500, port: 8},
    {state: "Stouffville", price: 450, port: 8},
    {state: "Sudbury (CANADA)", price: 750, port: 8},
    {state: "Toronto (CANADA)", price: 600, port: 8},
    {state: "Vancouver (CANADA)", price: 2150, port: 8},
    {state: "Winchester CA (Copart)", price: 600, port: 8},
    {state: "Winchester CA (Impact)", price: 325, port: 8},
    {state: "Winnipeg", price: 1500, port: 8}
];


let select_Body_State_America = document.querySelector(".select-body-State-America");
for (let i = 0; i < statesInfo.length; i++)
    select_Body_State_America.innerHTML += '<div class="select-item">' + statesInfo[i].state + '</div>';
const select_header_State_America = document.querySelector(".select-header-State-America");
const current_State_America = select_header_State_America.querySelector(".select-current");
const items_State_America = select_Body_State_America.querySelectorAll(".select-item");

select_header_State_America.addEventListener('click', () => {
    select_Body_State_America.style.width = select_header_State_America.offsetWidth + "px";
    select_Body_State_America.classList.toggle('is-active');
})

for (let i = 0; i < items_State_America.length; i++) {
    items_State_America[i].addEventListener('click', () => {
        current_State_America.innerText = items_State_America[i].innerText;
        america_state = i;
        select_Body_State_America.classList.toggle('is-active');
    })
}

let inputState = document.querySelector(".text-field__input_state");

inputState.addEventListener('input', () => {
    for (let i = 0; i < items_State_America.length; i++) {
        if (!items_State_America[i].innerText.toLowerCase().includes(inputState.value.toLowerCase()))
            items_State_America[i].style.display = "none";
        else
            items_State_America[i].style.display = "block";
    }
});

const btn_calc_America = calc_america.querySelector(".btn-calc-America-all-price");


btn_calc_America.addEventListener('click', () => {
    const autoPriceAmerica_label = calc_america.querySelector(".auto-Price-America");
    if (autoPriceAmerica_label.value == '') {
        autoPriceAmerica_label.focus();
        return;
    }
    const engineCapacityAmerica_label = calc_america.querySelector(".engine-Capacity-America");
    if (engineCapacityAmerica_label.value == '') {
        engineCapacityAmerica_label.focus();
        return;
    }
    const yearReleaseAmerica_label = calc_america.querySelector(".year-Release-America");
    if (yearReleaseAmerica_label.value == '') {
        yearReleaseAmerica_label.focus();
        return;
    }

    //Вартість авто + аук збiр + доставка до порту (+150) + 
    //Погрузка на автовоз (35) + доставка по морю (+800) + Вигрузка з порту (400) + 
    //доставка до України (1100) + брокерські послуги (250) + 
    //Вартість послуг (550) + Кнопка (135) + Розмитнення + Свiфт+

    let carPrice = Number(autoPriceAmerica_label.value); //Цiна авто
    let yearRelease = Number(yearReleaseAmerica_label.value); //Рiк випуску авто
    let engineCapacity = Number(engineCapacityAmerica_label.value); //Обьем двигуна

    const unloadPort = 400; //Вигрузка з порту
    const deliveryUK = 1100; //Доставка до укр.
    const button = 135; //Кнопка
    const broker = 250; //Брокер
    const service = 550; // Послуги
    const auctionFee = getAuctionAmerica(carPrice); //Аук збiр
    const deliverySea = getContainerPrice(statesInfo[america_state].port) + 800; //Доставка морем
    const loadAuto = 35; //Погрузка на автовоз

    const priceSwift = (100 + (0.032 * (carPrice + auctionFee))); //СВIФТ
    const deliveryPort = statesInfo[america_state].price + 150; //Доставка в порт
    const clearance = getClearance(carPrice, auctionFee, yearRelease, engineCapacity, america_fuel); //Мито

    console.log("Ціна авто: " + carPrice);
    console.log("Аук. збір: " + auctionFee);
    console.log("Доставка в порт: " + deliveryPort);
    console.log("Погрузка на автовоз: " + loadAuto);
    console.log("Доставка морем: " + deliverySea);
    console.log("Вигрузка з порту: " + unloadPort);
    console.log("Доставка до ук: " + deliveryUK);
    console.log("Брокер: " + broker);
    console.log("Послуги: " + service);
    console.log("Кнопка: " + button);
    console.log("Мито: " + clearance);
    console.log("Свіфт: " + priceSwift);

    const allPrice = carPrice + auctionFee + deliveryPort + loadAuto + deliverySea + unloadPort + deliveryUK + broker + service + button + clearance + priceSwift + 200 + 250;

    const ouptuts_Main_America = calc_america.querySelector(".outputs");
    const labelInfoForAuto = ouptuts_Main_America.querySelectorAll(".right-info");

    labelInfoForAuto[0].innerText = getFormatValue(Number(auctionFee) + Number(carPrice));
    labelInfoForAuto[1].innerText = getFormatValue(Number(broker));
    labelInfoForAuto[2].innerText = getFormatValue(Number(service));
    labelInfoForAuto[3].innerText = getFormatValue(Number(deliveryPort));
    labelInfoForAuto[4].innerText = getFormatValue(Number(deliverySea));
    labelInfoForAuto[5].innerText = getFormatValue(Number(priceSwift));
    labelInfoForAuto[6].innerText = getFormatValue(Number(clearance));
    labelInfoForAuto[7].innerText = getFormatValue(Number(allPrice));

    function getFormatValue(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
});


function getClearance(carPrice, auctionFee, yearRelease, engineCapacity, fuelType) {
    carPrice = carPrice + auctionFee + 1600;
    let basikExcise = 0; //Базовий акциз
    if (fuelType == 0) {
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
    const toll = carPrice * 0.1; //Мито
    const pdv = (carPrice + toll + excise) * 0.2;

    return toll + excise + pdv; //Розмитнення
}

function getContainerPrice(sity) {
    let price = 0;
    if (sity == 1) price = 650;
    if (sity == 2) price = 700;
    if (sity == 3) price = 800;
    if (sity == 4) price = 1200;
    if (sity == 5) price = 850;
    if (sity == 6) price = 750;
    if (sity == 7) price = 1350;
    if (sity == 8) price = 1200;
    return price;
}

function getAuctionAmerica(carPrise) {
    let auctionFee = [0, 0]; //Аук. збiр
    if (carPrise >= 0 && carPrise <= 49.99) auctionFee[0] = 1;
    if(carPrise >= 50 && carPrise <= 99.99) auctionFee[0] = 1;
    if(carPrise >= 100 && carPrise <= 199.99) auctionFee[0] = 25;
    if(carPrise >= 200 && carPrise <= 299.99) auctionFee[0] = 50;
    if(carPrise >= 300 && carPrise <= 349.99) auctionFee[0] = 75;
    if(carPrise >= 350 && carPrise <= 399.99) auctionFee[0] = 75;
    if(carPrise >= 400 && carPrise <= 449.99) auctionFee[0] = 110;
    if(carPrise >= 450 && carPrise <= 499.99) auctionFee[0] = 110;
    if(carPrise >= 500 && carPrise <= 549.99) auctionFee[0] = 125;
    if(carPrise >= 550 && carPrise <= 549.99) auctionFee[0] = 130;
    if(carPrise >= 600 && carPrise <= 699.99) auctionFee[0] = 140;
    if(carPrise >= 700 && carPrise <= 799.99) auctionFee[0] = 155;
    if(carPrise >= 800 && carPrise <= 899.99) auctionFee[0] = 170;
    if(carPrise >= 900 && carPrise <= 999.99) auctionFee[0] = 185;
    if(carPrise >= 1000 && carPrise <= 1199.99) auctionFee[0] = 200;
    if(carPrise >= 1200 && carPrise <= 1299.99) auctionFee[0] = 225;
    if(carPrise >= 1300 && carPrise <= 1399.99) auctionFee[0] = 240;
    if(carPrise >= 1400 && carPrise <= 1499.99) auctionFee[0] = 250;
    if(carPrise >= 1500 && carPrise <= 1599.99) auctionFee[0] = 260;
    if(carPrise >= 1600 && carPrise <= 1699.99) auctionFee[0] = 275;
    if(carPrise >= 1700 && carPrise <= 1799.99) auctionFee[0] = 285;
    if(carPrise >= 1800 && carPrise <= 1999.99) auctionFee[0] = 300;
    if(carPrise >= 2000 && carPrise <= 2399.99) auctionFee[0] = 325;
    if(carPrise >= 2400 && carPrise <= 2499.99) auctionFee[0] = 335;
    if(carPrise >= 2500 && carPrise <= 2999.99) auctionFee[0] = 350;
    if(carPrise >= 3000 && carPrise <= 3499.99) auctionFee[0] = 400;
    if(carPrise >= 3500 && carPrise <= 3999.99) auctionFee[0] = 455;
    if(carPrise >= 4000 && carPrise <= 4499.99) auctionFee[0] = 600;
    if(carPrise >= 4500 && carPrise <= 4999.99) auctionFee[0] = 625;
    if(carPrise >= 5000 && carPrise <= 5499.99) auctionFee[0] = 625;
    if(carPrise >= 5500 && carPrise <= 5999.99) auctionFee[0] = 625;
    if(carPrise >= 6000 && carPrise <= 6499.99) auctionFee[0] = 675;
    if(carPrise >= 6500 && carPrise <= 6999.99) auctionFee[0] = 675;
    if(carPrise >= 7000 && carPrise <= 7499.99) auctionFee[0] = 675;
    if(carPrise >= 7500 && carPrise <= 7999.99) auctionFee[0] = 690;
    if(carPrise >= 8000 && carPrise <= 8499.99) auctionFee[0] = 715;
    if(carPrise >= 8500 && carPrise <= 8999.99) auctionFee[0] = 715;
    if(carPrise >= 9000 && carPrise <= 9999.99) auctionFee[0] = 715;
    if(carPrise >= 10000 && carPrise <= 10499.99) auctionFee[0] = 720;
    if(carPrise >= 10500 && carPrise <= 10999.99) auctionFee[0] = 720;
    if(carPrise >= 11000 && carPrise <= 11499.99) auctionFee[0] = 720;
    if(carPrise >= 11500 && carPrise <= 11999.99) auctionFee[0] = 720;
    if(carPrise >= 12000 && carPrise <= 12499.99) auctionFee[0] = 720;
    if(carPrise >= 12500 && carPrise <= 14999.99) auctionFee[0] = 720;
    if(carPrise >= 15000) auctionFee[0] = (carPrise * 5.75 / 100);

    if (carPrise >= 0 && carPrise <= 99.99) auctionFee[1] = 0;
    if (carPrise >= 100 && carPrise <= 499.99) auctionFee[1] = 49;
    if (carPrise >= 500 && carPrise <= 999.99) auctionFee[1] = 59;
    if (carPrise >= 1000 && carPrise <= 1499.99) auctionFee[1] = 79;
    if (carPrise >= 1500 && carPrise <= 1999.99) auctionFee[1] = 89;
    if (carPrise >= 2000 && carPrise <= 3999.99) auctionFee[1] = 99;
    if (carPrise >= 4000 && carPrise <= 5999.99) auctionFee[1] = 109;
    if (carPrise >= 6000 && carPrise <= 7999.99) auctionFee[1] = 139;
    if (carPrise >= 8000) auctionFee[1] = 149;

    return auctionFee[0] + auctionFee[1] + 10 + 50 + 69;
}