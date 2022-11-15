"use strict";
async function api() {
  const respuesta = await fetch(
    `https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all?zone=PCB`
  );
  const datos = await respuesta.json();

  const ObjDatos = JSON.parse(datos.contents);
  const ObjetoCentral = Object.values(ObjDatos);
  let arrayElectricidad = [];
  for (let i = 0; i < ObjetoCentral.length; i++) {
    arrayElectricidad.push(ObjetoCentral[i].price);
  }
  const arrayPorHoras = [].concat(arrayElectricidad);
  console.log(arrayElectricidad.sort());
  console.log(arrayPorHoras);

  let precioMaximo = arrayElectricidad.sort()[23] / 1000;
  console.log(precioMaximo);
  let precioMinimo = arrayElectricidad.sort()[0] / 1000;
  console.log(precioMinimo);
  let precioActual = "";
  let datoHora = new Date();
  let horaActual = datoHora.getHours();
  let x = "";
  switch (horaActual) {
    case "00":
      x = arrayPorHoras[0];
      break;
    case "01":
      x = arrayPorHoras[1];
      break;
    case "02":
      x = arrayPorHoras[2];
      break;
    case "03":
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
    case "09":
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
  }
  precioActual = x / 1000;

  console.log(x);

  const cabeceraMin = document.querySelector(`.precioMinimo`);
  const parrafo1 = document.createElement("p");
  const textoParrafo1 = document.createTextNode(precioMinimo);
  parrafo1.appendChild(textoParrafo1);
  cabeceraMin.appendChild(parrafo1);

  const cabeceraMax = document.querySelector(`.precioMaximo`);
  const parrafo2 = document.createElement("p");
  const textoParrafo2 = document.createTextNode(precioMaximo);
  parrafo2.appendChild(textoParrafo2);
  cabeceraMax.appendChild(parrafo2);

  const cabeceraAct = document.querySelector(`.precioActual`);
  const parrafo3 = document.createElement("p");
  const textoParrafo3 = document.createTextNode(precioActual);
  parrafo3.appendChild(textoParrafo3);
  cabeceraAct.appendChild(parrafo3);
}

api();

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
