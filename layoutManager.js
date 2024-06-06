function CHART_GENERATOR(HISTORY_DATA) {
    var CHART_URL = "https://quickchart.io/chart?c={type:%27bar%27,data:{labels:[2012,2013,2014,2015,2016],datasets:[{label:%27Dias%27,data:[120,60,50,180,120]}]}}";

    HISTORY_DATA.then(data => {
        var CHARTS_DIV = document.getElementById("prices_charts");
        CHARTS_DIV.innerHTML = ''; // Limpio el area de gráficos

        for(var i = 0; i < 5; i++) {
            let CHART_IMAGE = document.createElement("tr");
            var CHART_DATA = [];
            var CHART_LABELS = [];

            for(var j = 0; j < 10; j++) {
                CHART_DATA.push(data[i]["data"][j]["avg_price"]);
                CHART_LABELS.push((data[i]["data"][j]["timestamp"]).substring(0, 7));
            }

            console.log(CHART_DATA.toString());

            CHART_URL = "https://quickchart.io/chart?c={type:%27line%27, fill:%27false%27,data:{labels:[" + CHART_LABELS.toString() + "],datasets:[{label:%27"+ CIUDADES[i][0] +"%27,data:[" + CHART_DATA.toString() + "]}]}}";

            console.log(CHART_URL);

            CHART_IMAGE.innerHTML = `<img src="${CHART_URL}" width="500">`;
            CHARTS_DIV.appendChild(CHART_IMAGE);
        }
    })
}

function DISPLAY_PRICES(PRICE_DATA, ITEM_ID) {
    let PRECIOS = document.getElementById("prices_list");
    let ICONO = document.getElementById("found_image");

    ICONO.innerHTML = '<img src = "https://render.albiononline.com/v1/item/' + ITEM_ID + '" , width=100>';
    PRECIOS.replaceChildren();

    PRICE_DATA.then(data => {      
        for (let i = 0; i < 5; i++) {
            let city_price = document.createElement("li");

            city_price.classList.add("mini-box", CIUDADES[i][2]);
            city_price.innerText = CIUDADES[i][0] + ": "+ data[CIUDADES[i][1]]['sell_price_min'];
            PRECIOS.appendChild(city_price);
          } 
    })
}

function show_SEARCH(NOMBRE, DESCRIPCION, ID) {
    var element = document.getElementById("search-list");
    var nombre_item = document.getElementById("nombre-item");
    var descripcion = document.getElementById("descripcion");

    //element.textContent = "";
    nombre_item.textContent = NOMBRE;

    if (DESCRIPCION != null)
        descripcion.textContent = DESCRIPCION;    

    DISPLAY_PRICES(GET_API(PRICE, ID), ID);
    CHART_GENERATOR(GET_API(HISTORY, ID));
}

function fetch_SEARCH() {  
    const input = document.getElementById('searchbar').value.toLowerCase();
    const suggestionsContainer = document.getElementById('search-list');

    suggestionsContainer.innerHTML = '';
    
    fetch('./db/itemsDB.json')
        .then((response) => response.json())
        .then((json) => {
            if (input) {
                json.forEach(item => {
                    if ((item["LocalizedNames"] != null) && (item["LocalizedNames"]["ES-ES"].toLowerCase().startsWith(input))) {
                        // Create the necessary elements
                        let suggestionItem = document.createElement('li');
                        let suggestionImage = document.createElement('div');
                        //let suggestionContent = document.createElement('div');
                        //let suggestionName = document.createElement('h4');
                        //let suggestionDescription = document.createElement('p');

                        // Set the class for suggestionContent
                        //suggestionContent.classList.add('content');

                        // Add the image to suggestionImage
                        suggestionImage.innerHTML = '<img src="https://render.albiononline.com/v1/item/' + item["UniqueName"] + '" width="100">';
                        /*
                        // Set the name and description
                        suggestionName.textContent = item["LocalizedNames"]["ES-ES"];
                        suggestionDescription.textContent = item["LocalizedDescriptions"]["ES-ES"];
                        */

                        // Set the click event for the suggestion item
                        suggestionItem.onclick = () => show_SEARCH(item["LocalizedNames"]["ES-ES"], item["LocalizedDescriptions"]["ES-ES"], item["UniqueName"]);

                        // Append children elements to suggestionItem
                        suggestionItem.appendChild(suggestionImage);
                        //suggestionContent.appendChild(suggestionName);
                        //suggestionContent.appendChild(suggestionDescription);
                        //suggestionItem.appendChild(suggestionContent);

                        // Append suggestionItem to the suggestionsContainer
                        suggestionsContainer.appendChild(suggestionItem);
                    } 
                });
            } else {
                for (var i = 0; i < 102; i++) {
                    if (json[i]["LocalizedNames"] != null) {
                        // Create the necessary elements
                        let suggestionItem = document.createElement('li');
                        let suggestionImage = document.createElement('div');
                        //let suggestionContent = document.createElement('div');
                        //let suggestionName = document.createElement('h4');
                        //let suggestionDescription = document.createElement('p');

                        // Set the class for suggestionContent
                        //suggestionContent.classList.add('content');

                        // Add the image to suggestionImage
                        suggestionImage.innerHTML = '<img src="https://render.albiononline.com/v1/item/' + json[i]["UniqueName"] + '" width="100">';
                        /*
                        // Set the name and description
                        suggestionName.textContent = item["LocalizedNames"]["ES-ES"];
                        suggestionDescription.textContent = item["LocalizedDescriptions"]["ES-ES"];
                        */
                        // Set the click event for the suggestion item
                        suggestionItem.onclick = () => show_SEARCH(json[i]["LocalizedNames"]["ES-ES"], json[i]["LocalizedDescriptions"]["ES-ES"], json[i]["UniqueName"]);
                        
                        // Append children elements to suggestionItem
                        suggestionItem.appendChild(suggestionImage);
                        //suggestionContent.appendChild(suggestionName);
                        //suggestionContent.appendChild(suggestionDescription);
                        //suggestionItem.appendChild(suggestionContent);

                        // Append suggestionItem to the suggestionsContainer
                        suggestionsContainer.appendChild(suggestionItem);
                    } 
                }
            }
        });
}

function delay(fn, ms) {
  let timer = 0
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}

function classFilter_Button() {
    document.getElementById("classOptions").classList.toggle("show");
}

function tierFilter_Button() {
    document.getElementById("tierOptions").classList.toggle("show");
}

function classFilter_UPDATE(ARG) {
    var buttonClassFilter = document.getElementById("classFilter_BUTTON");
    switch (ARG) {
        case CLASS_RECURSO:
            buttonClassFilter.textContent = "Recurso";
            CLASS_FILTER_SELECTION = CLASS_RECURSO;
            break;
        case CLASS_MONTURA:
            buttonClassFilter.textContent = "Montura";
            CLASS_FILTER_SELECTION = CLASS_MONTURA;
            break;
        case CLASS_HERRAMIENTA:
            buttonClassFilter.textContent = "Herramienta";
            CLASS_FILTER_SELECTION = CLASS_HERRAMIENTA;
            break;
        default:
            buttonClassFilter.textContent = "Cualquiera";
            CLASS_FILTER_SELECTION = CLASS_CUALQUIERA;
            break;
    }
}

function tierFilter_UPDATE(ARG) {
    var buttonTierFilter = document.getElementById("tierFilter_BUTTON");
    switch (ARG) {
        case TIER_1:
            buttonTierFilter.textContent = "Tier I";
            break;
        case TIER_2:
            buttonTierFilter.textContent = "Tier II";
            break;
        case TIER_3:
            buttonTierFilter.textContent = "Tier III";
            break;
        case TIER_4:
            buttonTierFilter.textContent = "Tier IV";
            break;
        case TIER_5:
            buttonTierFilter.textContent = "Tier V";
            break;
        case TIER_6:
            buttonTierFilter.textContent = "Tier VI";
            break;
        case TIER_7:
            buttonTierFilter.textContent = "Tier VII";
            break;
        case TIER_8:
            buttonTierFilter.textContent = "Tier VIII";
            break;
        default:
            buttonTierFilter.textContent = "Todos los tier";
            break;
    }

    TIER_FILTER_SELECTION = ARG;
}
  
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
    }
    }
}
}