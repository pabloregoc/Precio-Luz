"use strict";

// voy a leer el State (si tengo) en locastorage
const localStorageDataLuz = window.localStorage.getItem("dataLuz");

const dataLuz = {
  precios: localStorageDataLuz ? JSON.parse(localStorageDataLuz).precios: [] ,
  dataLastFetch: localStorageDataLuz ? JSON.parse(localStorageDataLuz).dataLastFetch: "",
};

console.log(dataLuz);

const divNevera = document.querySelector("div.nevera");
const imgNevera = document.createElement("img");
imgNevera.setAttribute("src", "images/nevera.png" );
imgNevera.setAttribute("alt", "Nevera" );
divNevera.append(imgNevera);

const divLavavajillas = document.querySelector("div.lavavajillas");
const imgLavavajillas = document.createElement("img");
imgLavavajillas.setAttribute("src", "images/lavavajillas.png" );
imgLavavajillas.setAttribute("alt", "Lavavajillas" );
divLavavajillas.append(imgLavavajillas);

const divLavadora = document.querySelector("div.lavadora");
const imgLavadora = document.createElement("img");
imgLavadora.setAttribute("src", "images/lavadora.png" );
imgLavadora.setAttribute("alt", "Lavadora" );
divLavadora.append(imgLavadora);

const divSecadora = document.querySelector("div.secadora");
const imgSecadora = document.createElement("img");
imgSecadora.setAttribute("src", "images/secadora.png" );
imgSecadora.setAttribute("alt", "Lavadora" );
divSecadora.append(imgSecadora);

const divHorno = document.querySelector("div.horno");
const imgHorno = document.createElement("img");
imgHorno.setAttribute("src", "images/horno cocina.png" );
imgHorno.setAttribute("alt", "Horno" );
divHorno.append(imgHorno);

const divVitro = document.querySelector("div.vitro");
const imgVitro = document.createElement("img");
imgVitro.setAttribute("src", "images/vitro.png" );
imgVitro.setAttribute("alt", "Vitro" );
divVitro.append(imgVitro);

const divBombilla = document.querySelector("div.bombilla");
const imgBombilla = document.createElement("img");
imgBombilla.setAttribute("src", "images/bombilla.png" );
imgBombilla.setAttribute("alt", "Vitro" );
divBombilla.append(imgBombilla);

const divOrdenador = document.querySelector("div.ordenador");
const imgOrdenador = document.createElement("img");
imgOrdenador.setAttribute("src", "images/computadora.png" );
imgOrdenador.setAttribute("alt", "Vitro" );
divOrdenador.append(imgOrdenador);

async function api() {
  // la fetch la hago si:
  // - cambio de dia
  // - pasaron 5 minutos (300000 ms)
  const data = new Date();

  let fechaIgual = false
  let pasaronCincoMinutos = false;

  if(dataLuz.dataLastFetch !== ""){
    const dataLocalstorage = new Date(dataLuz.dataLastFetch)
    const strFechaLocalStorage = `${dataLocalstorage.getDay()}-${dataLocalstorage.getMonth()}-${dataLocalstorage.getFullYear()}`
    const strFecha = `${data.getDay()}-${data.getMonth()}-${data.getFullYear()}`
    if(strFecha === strFechaLocalStorage){
      fechaIgual = true
    }
  }

  if( dataLuz.precios === [] || fechaIgual === false ){
    const respuesta = await fetch(
      `https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB`
      );
      const datos = await respuesta.json();
      
      const ObjDatos = JSON.parse(datos.contents);
      //console.log(ObjDatos);
      dataLuz.precios = Object.values(ObjDatos);
      //console.log(dataLuz.precios);
      // guardo el json del State en localstorage
      dataLuz.dataLastFetch = data.toISOString();
      
      window.localStorage.setItem("dataLuz", JSON.stringify(dataLuz) )
  }

  let arrayElectricidad = [];
  for (let i = 0; i < dataLuz.precios.length; i++) {
    arrayElectricidad.push(dataLuz.precios[i].price);
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

  divNevera.addEventListener("click", () => {  
    divNevera.innerHTML = "";
    divNevera.append(imgNevera);
    const parrafo4 = document.createElement("p");
    const textoParrafo4 = document.createTextNode(
      `Mantener encendida su nevera le cuesta ${horaNevera} céntimos de euro por hora`
    );
    parrafo4.appendChild(textoParrafo4);
    divNevera.appendChild(parrafo4);
  });

  divLavavajillas.addEventListener("click", () => {
   divLavavajillas.innerHTML = "";
   divLavavajillas.append(imgLavavajillas);
    const parrafo5 = document.createElement("p");
    const textoParrafo5 = document.createTextNode(
      `Mantener encendido su lavavajillas le cuesta ${horaLavavajillas} céntimos de euro por hora`
    );
    parrafo5.appendChild(textoParrafo5);
    divLavavajillas.appendChild(parrafo5);
  });

  divLavadora.addEventListener("click", () => {
    divLavadora.innerHTML = "";
    divLavadora.append(imgLavadora);
     const parrafo6 = document.createElement("p");
     const textoParrafo6 = document.createTextNode(
       `Mantener encendida su lavadora le cuesta ${horaLavadora} céntimos de euro por hora`
     );
     parrafo6.appendChild(textoParrafo6);
     divLavadora.appendChild(parrafo6);
   });

   divSecadora.addEventListener("click", () => {
    divSecadora.innerHTML = "";
    divSecadora.append(imgSecadora);
     const parrafo7 = document.createElement("p");
     const textoParrafo7 = document.createTextNode(
       `Mantener encendida su secadora le cuesta ${horaSecadora} céntimos de euro por hora`
     );
     parrafo7.appendChild(textoParrafo7);
     divSecadora.appendChild(parrafo7);
   });

   divHorno.addEventListener("click", () => {  
    divHorno.innerHTML = "";
    divHorno.append(imgHorno);
    const parrafo8 = document.createElement("p");
    const textoParrafo8 = document.createTextNode(
      `Mantener encendido su horno le cuesta ${horaHorno} céntimos de euro por hora`
    );
    parrafo8.appendChild(textoParrafo8);
    divHorno.appendChild(parrafo8);
  });

  divVitro.addEventListener("click", () => {  
    divVitro.innerHTML = "";
    divVitro.append(imgVitro);
    const parrafo9 = document.createElement("p");
    const textoParrafo9 = document.createTextNode(
      `Mantener encendido su vitrocerámica le cuesta ${horaVitro} céntimos de euro por hora`
    );
    parrafo9.appendChild(textoParrafo9);
    divVitro.appendChild(parrafo9);
  });

  divBombilla.addEventListener("click", () => {  
    divBombilla.innerHTML = "";
    divBombilla.append(imgBombilla);
    const parrafo10 = document.createElement("p");
    const textoParrafo10 = document.createTextNode(
      `Mantener encendida una bombilla le cuesta ${horaBombilla} céntimos de euro por hora`
    );
    parrafo10.appendChild(textoParrafo10);
    divBombilla.appendChild(parrafo10);
  });

  divOrdenador.addEventListener("click", () => {  
    divOrdenador.innerHTML = "";
    divOrdenador.append(imgOrdenador);
    const parrafo11 = document.createElement("p");
    const textoParrafo11 = document.createTextNode(
      `Mantener encendido su ordenador le cuesta ${horaOrdenador} céntimos de euro por hora`
    );
    parrafo11.appendChild(textoParrafo11);
    divOrdenador.appendChild(parrafo11);
  });

}

api();

//let objetoGuardar = JSON.stringify(ObjDatos);
//let objetoGuardar2 = JSON.stringify(objetoGuardar);
//const stringApi = localStorage.setItem("date", objetoGuardar2);

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
