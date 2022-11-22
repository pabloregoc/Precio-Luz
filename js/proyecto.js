"use strict";

// voy a leer el State (si tengo) en locastorage
const localStorageDataLuz = window.localStorage.getItem("dataLuz");

const dataLuz = {
  precios: localStorageDataLuz ? JSON.parse(localStorageDataLuz).precios : [],
  dataLastFetch: localStorageDataLuz
    ? JSON.parse(localStorageDataLuz).dataLastFetch
    : "",
};

const titleElement = document.querySelector("h1");

async function api() {
  const data = new Date();
  let fechaIgual = false;

  if (dataLuz.dataLastFetch !== "") {
    const dataLocalstorage = new Date(dataLuz.dataLastFetch);
    const strFechaLocalStorage = `${dataLocalstorage.getDay()}-${dataLocalstorage.getMonth()}-${dataLocalstorage.getFullYear()}`;
    const strFecha = `${data.getDay()}-${data.getMonth()}-${data.getFullYear()}`;
    if (strFecha === strFechaLocalStorage) {
      fechaIgual = true;
    }
  }

  if (dataLuz.precios === [] || fechaIgual === false) {
    const respuesta = await fetch(
      `https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB`
    );
    const datos = await respuesta.json();

    const ObjDatos = JSON.parse(datos.contents);

    dataLuz.precios = Object.values(ObjDatos);

    dataLuz.dataLastFetch = data.toISOString();

    window.localStorage.setItem("dataLuz", JSON.stringify(dataLuz));
  }
}

const main = async () => {
  await api();

  const divNevera = document.querySelector("div#nevera");
  divNevera.innerHTML = "";
  const imgNevera = document.createElement("img");
  imgNevera.setAttribute("src", "images/nevera.png");
  imgNevera.setAttribute("alt", "Nevera");
  imgNevera.setAttribute("class", "icono");
  divNevera.append(imgNevera);

  const divLavavajillas = document.querySelector("div#lavavajillas");
  divLavavajillas.innerHTML = "";
  const imgLavavajillas = document.createElement("img");
  imgLavavajillas.setAttribute("src", "images/lavavajillas.png");
  imgLavavajillas.setAttribute("alt", "Lavavajillas");
  imgLavavajillas.setAttribute("class", "icono");
  divLavavajillas.append(imgLavavajillas);

  const divLavadora = document.querySelector("div#lavadora");
  divLavadora.innerHTML = "";
  const imgLavadora = document.createElement("img");
  imgLavadora.setAttribute("src", "images/lavadora.png");
  imgLavadora.setAttribute("alt", "Lavadora");
  imgLavadora.setAttribute("class", "icono");
  divLavadora.append(imgLavadora);

  const divSecadora = document.querySelector("div#secadora");
  divSecadora.innerHTML = "";
  const imgSecadora = document.createElement("img");
  imgSecadora.setAttribute("src", "images/secadora.png");
  imgSecadora.setAttribute("alt", "Lavadora");
  imgSecadora.setAttribute("class", "icono");
  divSecadora.append(imgSecadora);

  const divHorno = document.querySelector("div#horno");
  divHorno.innerHTML = "";
  const imgHorno = document.createElement("img");
  imgHorno.setAttribute("src", "images/horno cocina.png");
  imgHorno.setAttribute("alt", "Horno");
  imgHorno.setAttribute("class", "icono");
  divHorno.append(imgHorno);

  const divVitro = document.querySelector("div#vitro");
  divVitro.innerHTML = "";
  const imgVitro = document.createElement("img");
  imgVitro.setAttribute("src", "images/vitro.png");
  imgVitro.setAttribute("alt", "Vitro");
  imgVitro.setAttribute("class", "icono");
  divVitro.append(imgVitro);

  const divBombilla = document.querySelector("div#bombilla");
  divBombilla.innerHTML = "";
  const imgBombilla = document.createElement("img");
  imgBombilla.setAttribute("src", "images/bombilla.png");
  imgBombilla.setAttribute("alt", "Bombilla");
  imgBombilla.setAttribute("class", "icono");
  divBombilla.append(imgBombilla);

  const divOrdenador = document.querySelector("div#ordenador");
  divOrdenador.innerHTML = "";
  const imgOrdenador = document.createElement("img");
  imgOrdenador.setAttribute("src", "images/computadora.png");
  imgOrdenador.setAttribute("alt", "Ordenador");
  imgOrdenador.setAttribute("class", "icono");
  divOrdenador.append(imgOrdenador);

  const divTotal = document.querySelector("#totalId");
  divTotal.textContent =
    "Seleccione los electrodomésticos que quiera para calcular el consumo total.";
  const arrayTotal = [];

  let arrayElectricidad = [];
  for (let i = 0; i < dataLuz.precios.length; i++) {
    arrayElectricidad.push(dataLuz.precios[i].price);
  }

  const copiaArray = [].concat(arrayElectricidad);

  copiaArray.sort(function (a, b) {
    return a - b;
  });

  let precioMaximo = copiaArray[23] / 1000;
  let precioMinimo = copiaArray[0] / 1000;
  let precioActual = "";
  let datoHora = new Date();
  let horaActual = datoHora.getHours();
  let x = "";

  x = arrayElectricidad[horaActual];

  precioActual = x / 1000;

  const posicionHoraMin = arrayElectricidad.indexOf(precioMinimo * 1000);

  const cabeceraMin = document.querySelector(`.precioMinimo`);
  cabeceraMin.innerHTML = "";
  const parrafo1 = document.createElement("p");
  const textoParrafo1 = document.createTextNode(
    `${precioMinimo} Kw/H entre las ${posicionHoraMin} h. y las ${
      posicionHoraMin + 1
    } h.`
  );
  parrafo1.appendChild(textoParrafo1);
  cabeceraMin.appendChild(parrafo1);

  const posicionHoraMax = arrayElectricidad.indexOf(precioMaximo * 1000);
  const cabeceraMax = document.querySelector(`.precioMaximo`);
  cabeceraMax.innerHTML = "";
  const parrafo2 = document.createElement("p");
  const textoParrafo2 = document.createTextNode(
    `${precioMaximo} Kw/H entre las ${posicionHoraMax} h. y las ${
      posicionHoraMax + 1
    } h.`
  );
  parrafo2.appendChild(textoParrafo2);
  cabeceraMax.appendChild(parrafo2);

  const cabeceraAct = document.querySelector(`.precioActual`);
  cabeceraAct.innerHTML = "";
  const parrafo3 = document.createElement("p");
  const textoParrafo3 = document.createTextNode(
    `${precioActual} Kw/H entre las ${horaActual}h y las ${horaActual + 1}h`
  );
  parrafo3.appendChild(textoParrafo3);
  cabeceraAct.appendChild(parrafo3);

  const horaNevera = [precioActual * 180] / 8760;
  const horaLavavajillas = precioActual * 0.246;
  const horaLavadora = precioActual * 0.579;
  const horaSecadora = precioActual * 0.27;
  const horaHorno = precioActual;
  const horaVitro = precioActual * 0.825;
  const horaBombilla = precioActual * 0.1;
  const horaOrdenador = precioActual * 2.2;
  let totalPrecio = 0;

  const hendlerNevera = (e) => {
    arrayTotal.push(horaNevera);
    document.getElementById("nevera").classList.add("encendido");
    divNevera.innerHTML = "";
    divNevera.append(imgNevera);
    const parrafo4 = document.createElement("p");
    const textoParrafo4 = document.createTextNode(
      `Mantener encendida su nevera le cuesta ${horaNevera} euros por hora. (Consumo medio de 180Kw/h año)`
    );
    parrafo4.appendChild(textoParrafo4);
    divNevera.appendChild(parrafo4);

    actualizaTotal(0, e.currentTarget);
  };

  const hendleLavavajillas = (e) => {
    arrayTotal.push(horaLavavajillas);
    document.getElementById("lavavajillas").classList.add("encendido");
    divLavavajillas.innerHTML = "";
    divLavavajillas.append(imgLavavajillas);
    const parrafo5 = document.createElement("p");
    const textoParrafo5 = document.createTextNode(
      `Mantener encendido su lavavajillas le cuesta ${horaLavavajillas} euros por hora. (Consumo medio de 246 W/hora) `
    );
    parrafo5.appendChild(textoParrafo5);
    divLavavajillas.appendChild(parrafo5);
    actualizaTotal(1, e.currentTarget);
  };

  const hendlerLavadora = (e) => {
    arrayTotal.push(horaLavadora);
    document.getElementById("lavadora").classList.add("encendido");
    divLavadora.innerHTML = "";
    divLavadora.append(imgLavadora);
    const parrafo6 = document.createElement("p");
    const textoParrafo6 = document.createTextNode(
      `Mantener encendida su lavadora le cuesta ${horaLavadora} euros por hora. (Consumo medio de 579 W/h)`
    );
    parrafo6.appendChild(textoParrafo6);
    divLavadora.appendChild(parrafo6);
    actualizaTotal(2, e.currentTarget);
  };

  const hendlerSecadora = (e) => {
    arrayTotal.push(horaSecadora);
    document.getElementById("secadora").classList.add("encendido");
    divSecadora.innerHTML = "";
    divSecadora.append(imgSecadora);
    const parrafo7 = document.createElement("p");
    const textoParrafo7 = document.createTextNode(
      `Mantener encendida su secadora le cuesta ${horaSecadora} euros por hora. (Consumo medio de 270 W/h)`
    );
    parrafo7.appendChild(textoParrafo7);
    divSecadora.appendChild(parrafo7);
    actualizaTotal(3, e.currentTarget);
  };

  const hendlerHorno = (e) => {
    arrayTotal.push(horaHorno);
    document.getElementById("horno").classList.add("encendido");
    divHorno.innerHTML = "";
    divHorno.append(imgHorno);
    const parrafo8 = document.createElement("p");
    const textoParrafo8 = document.createTextNode(
      `Mantener encendido su horno le cuesta ${horaHorno} euros por hora. (Consumo medio de 1000 W/h)`
    );
    parrafo8.appendChild(textoParrafo8);
    divHorno.appendChild(parrafo8);
    actualizaTotal(4, e.currentTarget);
  };

  const hendlerVitro = (e) => {
    arrayTotal.push(horaVitro);
    document.getElementById("vitro").classList.add("encendido");
    divVitro.innerHTML = "";
    divVitro.append(imgVitro);
    const parrafo9 = document.createElement("p");
    const textoParrafo9 = document.createTextNode(
      `Mantener encendido su vitrocerámica le cuesta ${horaVitro} euros por hora. (Consumo medio de 825 W/h)`
    );
    parrafo9.appendChild(textoParrafo9);
    divVitro.appendChild(parrafo9);
    actualizaTotal(5, e.currentTarget);
  };

  const hendlerBombilla = (e) => {
    arrayTotal.push(horaBombilla);
    document.getElementById("bombilla").classList.add("encendido");
    divBombilla.innerHTML = "";
    divBombilla.append(imgBombilla);
    const parrafo10 = document.createElement("p");
    const textoParrafo10 = document.createTextNode(
      `Mantener encendida una bombilla le cuesta ${horaBombilla} euros por hora. (Consumo medio de 100W/h)`
    );
    parrafo10.appendChild(textoParrafo10);
    divBombilla.appendChild(parrafo10);
    actualizaTotal(6, e.currentTarget);
  };

  const hendlerOrdenador = (e) => {
    arrayTotal.push(horaOrdenador);
    document.getElementById("ordenador").classList.add("encendido");
    divOrdenador.innerHTML = "";
    divOrdenador.append(imgOrdenador);
    const parrafo11 = document.createElement("p");
    const textoParrafo11 = document.createTextNode(
      `Mantener encendido su ordenador le cuesta ${horaOrdenador} euros por hora. (Consumo medio de 2.2 Kw/h)`
    );
    parrafo11.appendChild(textoParrafo11);
    divOrdenador.appendChild(parrafo11);
    actualizaTotal(7, e.currentTarget);
  };

  const arrayHendlerElectrodomesticos = [
    hendlerNevera,
    hendleLavavajillas,
    hendlerLavadora,
    hendlerSecadora,
    hendlerHorno,
    hendlerVitro,
    hendlerBombilla,
    hendlerOrdenador,
  ];

  divNevera.addEventListener("click", hendlerNevera);
  divLavavajillas.addEventListener("click", hendleLavavajillas);
  divLavadora.addEventListener("click", hendlerLavadora);
  divSecadora.addEventListener("click", hendlerSecadora);
  divHorno.addEventListener("click", hendlerHorno);
  divVitro.addEventListener("click", hendlerVitro);
  divBombilla.addEventListener("click", hendlerBombilla);
  divOrdenador.addEventListener("click", hendlerOrdenador);

  const actualizaTotal = (indiceElectrodomestico, electrodomesticoElement) => {
    const sumaArrayTotal = arrayTotal.reduce((a, b) => a + b);
    divTotal.innerHTML = "";
    document.getElementById("totalId").classList.add("encendido");
    const parrafoTotal = document.createElement("p");
    const textoParrafo12 = document.createTextNode(
      `Tus electrodomésticos consumen un total de ${sumaArrayTotal} euros por hora.`
    );
    parrafoTotal.appendChild(textoParrafo12);
    divTotal.appendChild(parrafoTotal);
    electrodomesticoElement.removeEventListener(
      "click",
      arrayHendlerElectrodomesticos[indiceElectrodomestico]
    );
  };
};

titleElement.addEventListener("click", () => {
  main();
});

main();
