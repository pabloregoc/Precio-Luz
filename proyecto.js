"use strict";

// voy a leer el State (si tengo) en locastorage

async function api() {
  // la fetch la hago si:
  // - cambio de dia
  // - pasaron 5 minutos (300000 ms)
  const tiempoTranscurrido = Date.now();
  const hoy = new Date(tiempoTranscurrido);
  //console.log(hoy.toLocaleDateString());
  const fechaString = hoy.toLocaleDateString("es-ES");
  const fechaComparacionApi = fechaString.replace("/", "-");
  const fechaComparacionApi2 = fechaComparacionApi.replace("/", "-");

  console.log(fechaComparacionApi2);
  const respuesta = await fetch(
    `https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB`
  );
  const datos = await respuesta.json();

  const ObjDatos = JSON.parse(datos.contents);
  console.log(ObjDatos);
  const ObjetoCentral = Object.values(ObjDatos);
  console.log(ObjetoCentral);
  // guardo el json del State en localstorage
  const State = {
    precios: ObjetoCentral,
    timestampLastFetch: Date.now(),
  };

  let arrayElectricidad = [];
  for (let i = 0; i < ObjetoCentral.length; i++) {
    arrayElectricidad.push(ObjetoCentral[i].price);
  }
  const arrayPorHoras = [].concat(arrayElectricidad);

  let precioMaximo = arrayElectricidad.sort()[23] / 1000;
  let precioMinimo = arrayElectricidad.sort()[0] / 1000;
  let precioActual = "";
  let datoHora = new Date();
  let horaActual = datoHora.getHours();
  let x = "";
  console.log(horaActual);

  x = arrayPorHoras[horaActual];
  console.log(x);

  precioActual = x / 1000;

  const cabeceraMin = document.querySelector(`.precioMinimo`);
  const parrafo1 = document.createElement("p");
  const textoParrafo1 = document.createTextNode(`${precioMinimo} Kw/H `);
  parrafo1.appendChild(textoParrafo1);
  cabeceraMin.appendChild(parrafo1);

  const cabeceraMax = document.querySelector(`.precioMaximo`);
  const parrafo2 = document.createElement("p");
  const textoParrafo2 = document.createTextNode(`${precioMaximo} Kw/H`);
  parrafo2.appendChild(textoParrafo2);
  cabeceraMax.appendChild(parrafo2);

  const cabeceraAct = document.querySelector(`.precioActual`);
  const parrafo3 = document.createElement("p");
  const textoParrafo3 = document.createTextNode(`${precioActual} Kw/H`);
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

  const diviNevera = document.querySelector("div.nevera");
  diviNevera.addEventListener("click", () => {
    const divNevera = document.querySelector(`.nevera`);
    const parrafo4 = document.createElement("p");
    const textoParrafo4 = document.createTextNode(
      `Mantener encendida tu nevera te cuesta ${horaNevera} céntimos por hora`
    );
    parrafo4.appendChild(textoParrafo4);
    divNevera.appendChild(parrafo4);
  });

  const diviLavavajillas = document.querySelector("div.lavavajillas");
  const funLavava = () => {
    const divLavavajillas = document.querySelector(`.lavavajillas`);
    const parrafo5 = document.createElement("p");
    const textoParrafo5 = document.createTextNode(
      `Mantener encendido tu lavavajillas te cuesta ${horaLavavajillas} céntimos por hora`
    );
    parrafo5.appendChild(textoParrafo5);
    divLavavajillas.appendChild(parrafo5);
  };
  diviLavavajillas.addEventListener("click", funLavava);
  diviLavavajillas.removeEventListener("click", funLavava);

  const diviLavadora = document.querySelector("div.lavadora");
  diviLavadora.addEventListener("click", () => {
    const divLavadora = document.querySelector(`.lavadora`);
    const parrafo6 = document.createElement("p");
    const textoParrafo6 = document.createTextNode(
      `Mantener encendida tu lavadora te cuesta ${horaLavadora} céntimos por hora`
    );
    parrafo6.appendChild(textoParrafo6);
    divLavadora.appendChild(parrafo6);
  });

  const diviSecadora = document.querySelector("div.secadora");
  diviSecadora.addEventListener("click", () => {
    const divSecadora = document.querySelector(`.secadora`);
    const parrafo7 = document.createElement("p");
    const textoParrafo7 = document.createTextNode(
      `Mantener encendida tu secadora te cuesta ${horaSecadora} céntimos por hora`
    );
    parrafo7.appendChild(textoParrafo7);
    divSecadora.appendChild(parrafo7);
  });

  const diviHorno = document.querySelector("div.horno");
  diviHorno.addEventListener("click", () => {
    const divHorno = document.querySelector(`.horno`);
    const parrafo8 = document.createElement("p");
    const textoParrafo8 = document.createTextNode(
      `Mantener encendida tu horno te cuesta ${horaHorno} céntimos por hora`
    );
    parrafo8.appendChild(textoParrafo8);
    divHorno.appendChild(parrafo8);
  });

  const diviVitro = document.querySelector("div.vitro");
  diviVitro.addEventListener("click", () => {
    const divVitro = document.querySelector(`.vitro`);
    const parrafo9 = document.createElement("p");
    const textoParrafo9 = document.createTextNode(
      `Mantener encendida tu vitrocerámica te cuesta ${horaVitro} céntimos por hora`
    );
    parrafo9.appendChild(textoParrafo9);
    divVitro.appendChild(parrafo9);
  });

  const diviBombilla = document.querySelector("div.bombilla");
  diviBombilla.addEventListener("click", () => {
    const divBombilla = document.querySelector(`.bombilla`);
    const parrafo10 = document.createElement("p");
    const textoParrafo10 = document.createTextNode(
      `Mantener encendida cada bombilla te cuesta ${horaBombilla} céntimos por hora`
    );
    parrafo10.appendChild(textoParrafo10);
    divBombilla.appendChild(parrafo10);
  });

  const diviOrdenador = document.querySelector("div.ordenador");
  diviOrdenador.addEventListener("click", () => {
    const divOrdenador = document.querySelector(`.ordenador`);
    const parrafo11 = document.createElement("p");
    const textoParrafo11 = document.createTextNode(
      `Mantener encendido tu ordenador te cuesta ${horaOrdenador} céntimos por hora`
    );
    parrafo11.appendChild(textoParrafo11);
    divOrdenador.appendChild(parrafo11);
  });

  let objetoGuardar = JSON.stringify(ObjDatos);
  let objetoGuardar2 = JSON.stringify(objetoGuardar);
  const stringApi = localStorage.setItem("date", objetoGuardar2);
}

api();

//localStorageApi = window.localStorage.setItem(date);
//console.log(localStorageApi);
/*const tiempo = () => document.getElementbyId(`hora`);
const intervaloHora = setInterval(() => {
  const local = new Date();
  tiempo.innerHTML = local.toLocaleTimeString(`es-ES`);
}, 1000);*/

//console.log(ObjDatos);
// console.log(ObjDatos);
//const keys = ObjDatos.keys;
//console.log(ObjDatos.GetOwnPropertyNames);
//console.log(keys);
// console.log(Object.values(ObjDatos)); ++
//console.log(precios);

// console.log(arrayVacio);
//console.log(ObjetoCentral[0].hour);++
// console.log(ObjetoCentral[1]);++

// console.log(respuesta);
//console.log(datos);

//console.log(x);

//console.log(precioMaximo);
//console.log(precioMinimo);
//console.log(arrayElectricidad.sort());
// console.log(arrayPorHoras);

/*
  switch (horaActual) {
    case 0:
      x = arrayPorHoras[0];
      break;
      case 1:
        x = arrayPorHoras[1];
        break;
        case 2:
          x = arrayPorHoras[2];
          break;
          case "0:
            x = arrayPorHoras[3];
            break;
            case "04":
              x = arrayPorHoras[4];
              break;
              case "05":
                x = arrayPorHoras[5];
                break;
                case "06":
                  x = arrayPorHoras[6];
                  break;
                  case "07":
                    x = arrayPorHoras[7];
                    break;
                    case "08":
                      x = arrayPorHoras[8];
                      break;
                      case 9:
                        console.log("HOLAAAAAAA")
                        x = arrayPorHoras[9];
                        break;
                        case 10:
      x = arrayPorHoras[10];
      break;
      case 11:
        x = arrayPorHoras[11];
      break;
      case 12:
        x = arrayPorHoras[12];
        break;
        case 13:
          x = arrayPorHoras[13];
          break;
          case 14:
            x = arrayPorHoras[14];
      break;
    case 15:
      x = arrayPorHoras[15];
      break;
      case 16:
        x = arrayPorHoras[16];
        break;
        case 17:
          x = arrayPorHoras[17];
          break;
          case 18:
            x = arrayPorHoras[18];
            break;
            case 19:
              x = arrayPorHoras[19];
              break;
              case 20:
                x = arrayPorHoras[20];
                break;
                case 21:
      x = arrayPorHoras[21];
      break;
      case 22:
        x = arrayPorHoras[22];
        break;
        case 23:
          x = arrayPorHoras[23];
          break;
        } */

//console.log(objetoGuardar2);
