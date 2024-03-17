let CCcountry = 0;
const CCprice = [1150, 1100, 1300, 1200, 1150, 1250, 1400, 1300, 1300, 1300];
const CCcollection = [597, 577, 587, 643, 637, 97, 703, 657, 797, 617];
let CWcountry = 0;
const CWprice = [600, 600, 600, 600, 600, 600, 800, 800, 800, 8000];
const CWcollection = [297, 277, 287, 343, 337, 297, 403, 357, 497, 317];

let calcCost = document.querySelector(".calc-cost");
let calcwh = document.querySelector(".calc-wholesale");

let tabMain = document.querySelectorAll(".tab-main");
for (let i = 0; i < tabMain.length; i++) {
    tabMain[i].addEventListener('click', () => {
        for (let j = 0; j < tabMain.length; j++)
            tabMain[j].classList.remove('active');
        tabMain[i].classList.add('active');
        if (i == 0) {
            calcCost.style.display = "flex";
            calcwh.style.display = "none";
            if (inputs.getBoundingClientRect().height < outputs.getBoundingClientRect().height) inputs.style.height = outputs.getBoundingClientRect().height + "px";
            else outputs.style.height = inputs.getBoundingClientRect().height + "px";
        } else {
            calcwh.style.display = "flex";
            calcCost.style.display = "none";
            if (CWinputs.getBoundingClientRect().height < CWoutputs.getBoundingClientRect().height) CWinputs.style.height = CWoutputs.getBoundingClientRect().height + "px";
            else CWoutputs.style.height = CWinputs.getBoundingClientRect().height + "px";
        }
    });
}

let CCselectHeader = calcCost.querySelector(".select-header");
let CCselectBody = calcCost.querySelector(".select-body");
let CCselectItem = calcCost.querySelectorAll(".select-item");
let CCselectCurrent = calcCost.querySelector(".select-current");
let CCBtnCalc = calcCost.querySelector(".btn-calc");

let inputs = calcCost.querySelector(".inputs");
let outputs = calcCost.querySelector(".outputs");

if (inputs.getBoundingClientRect().height < outputs.getBoundingClientRect().height) inputs.style.height = outputs.getBoundingClientRect().height + "px";
else outputs.style.height = inputs.getBoundingClientRect().height + "px";


CCselectHeader.addEventListener('click', () => {
    CCselectBody.style.width = CCselectHeader.getBoundingClientRect().width + "px";
    CCselectBody.classList.toggle("is-active");
});

for (let i = 0; i < CCselectItem.length; i++) {
    CCselectItem[i].addEventListener('click', () => {
        CCselectCurrent.innerText = CCselectItem[i].innerText;
        CCcountry = i;
        CCselectBody.classList.toggle("is-active");
    });
}

CCBtnCalc.addEventListener('click', () => {
    let textFieldInput = calcCost.querySelectorAll(".text-field__input");
    let rightInfo = calcCost.querySelectorAll(".right-info");
    for (let i = 0; i < textFieldInput.length; i++) {
        if (textFieldInput[i].value == '') {
            textFieldInput[i].focus();
            return;
        }
    }
    const priceCar = Number(textFieldInput[0].value);
    const priceColl = Number(CCcollection[CCcountry]);
    const priceDelivery = Number(CCprice[CCcountry]);
    const priceService =  Number(textFieldInput[1].value);
    const priceSwift = Number(5 * (priceCar + priceColl) / 100).toFixed(2);
    const priceAll = priceCar + priceColl + priceDelivery + priceService + Number(priceSwift) + 250 + 100 + 200;
    rightInfo[0].innerText = priceCar + priceColl + " €";
    rightInfo[1].innerText = priceDelivery + " €";
    rightInfo[3].innerText = priceService + " €";
    rightInfo[6].innerText = priceSwift + " €";
    rightInfo[7].innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(priceAll);
});



let CWselectHeader = calcwh.querySelector(".select-header");
let CWselectBody = calcwh.querySelector(".select-body");
let CWselectItem = calcwh.querySelectorAll(".select-item");
let CWselectCurrent = calcwh.querySelector(".select-current");
let CWBtnCalc = calcwh.querySelector(".btn-calc");

let CWinputs = calcwh.querySelector(".inputs");
let CWoutputs = calcwh.querySelector(".outputs");


CWselectHeader.addEventListener('click', () => {
    CWselectBody.style.width = CWselectHeader.getBoundingClientRect().width + "px";
    CWselectBody.classList.toggle("is-active");
});

for (let i = 0; i < CWselectItem.length; i++) {
    CWselectItem[i].addEventListener('click', () => {
        CWselectCurrent.innerText = CWselectItem[i].innerText;
        CWcountry = i;
        CWselectBody.classList.toggle("is-active");
    });
}

CWBtnCalc.addEventListener('click', () => {
    let textFieldInput = calcwh.querySelectorAll(".text-field__input");
    let rightInfo = calcwh.querySelectorAll(".right-info");
    for (let i = 0; i < textFieldInput.length; i++) {
        if (textFieldInput[i].value == '') {
            textFieldInput[i].focus();
            return;
        }
    }
    const priceCar = Number(textFieldInput[0].value);
    const priceColl = Number(CWcollection[CCcountry]);
    const priceDelivery = Number(CWprice[CCcountry]);
    const priceService =  Number(textFieldInput[1].value);
    const priceSwift = Number(2.5 * (priceCar + priceColl) / 100).toFixed(2);
    const priceAll = priceCar + priceColl + priceDelivery + priceService + Number(priceSwift) + 250 + 100 + 200;
    rightInfo[0].innerText = priceCar + priceColl + " €";
    rightInfo[1].innerText = priceDelivery + " €";
    rightInfo[3].innerText = priceService + " €";
    rightInfo[6].innerText = priceSwift + " €";
    rightInfo[7].innerHTML = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(priceAll);
});