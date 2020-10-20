var i = 1;
var isLoading = false;

const LOADER_PATH = "./preloader.gif";
const DATA_BASE_PATH = "../data/cars";

const createLoader = () => {
    let loader = document.createElement("img");
    loader.classList.add("loader");
    loader.src = LOADER_PATH;
    return loader;
}

const createCarCell = (text) => {
    let carCell = document.createElement("div");
    carCell.classList.add("table__cell");
    carCell.innerText = text;
    return carCell;
}

const getCars = async () => {
    const DATA_PATH_TO_JSON = `${DATA_BASE_PATH}-${i}.json`;
    var result = [];
    await $.getJSON(DATA_PATH_TO_JSON, function (cars) {
        for (carIndex in cars) {
            let car = cars[carIndex];
            let carTableRow = document.createElement("div");
            carTableRow.classList.add("table__row");
            carTableRow.appendChild(createCarCell(car.Name));
            carTableRow.appendChild(createCarCell(car.Miles_per_Gallon));
            carTableRow.appendChild(createCarCell(car.Cylinders));
            carTableRow.appendChild(createCarCell(car.Displacement));
            carTableRow.appendChild(createCarCell(car.Horsepower));
            carTableRow.appendChild(createCarCell(car.Weight_in_lbs));
            carTableRow.appendChild(createCarCell(car.Acceleration));
            carTableRow.appendChild(createCarCell(car.Year));
            carTableRow.appendChild(createCarCell(car.Origin));
            result.push(carTableRow);
        }
    });
    i++;
    return result;
}

const loadData = async () => {
    if (i > 15) return;
    let table = $(".table");
    table.append(createLoader());
    let carsDivs = await getCars();
    for (divIndex in carsDivs) {
        table.append(carsDivs[divIndex]);
    }
    $('.loader').remove();
    isLoading = false;
}

$(document).ready(async (event) => {
    loadData();
});

const notDebouncedScroll = async (event) => {
    console.log("I'm fired");
    let table = $('.table');
    let tableHeight = table.height();
    if (tableHeight - 1000 <= window.scrollY && !isLoading) {
        isLoading = true;
        loadData();
    }
}

const debouncedScroll = _.debounce(notDebouncedScroll, 330);

$(window).scroll(debouncedScroll);
