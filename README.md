# Portfolio Rebalance - TypeScript Exercise

Este proyecto implementa un portafolio de acciones con un método para rebalancear según la distribución deseada.

## Requisitos

* Node.js (versión 16 usada en este proyecto)
* npm
* nvm (opcional, recomendado para gestionar la versión de Node.js)

## Instalación y ejecución

Sigue estos pasos para instalar y correr el ejercicio:

1. Seleccionar la versión de Node.js usando nvm:

```bash
nvm use 16
```

2. Inicializar proyecto npm:

```bash
npm init -y
```

3. Instalar dependencias necesarias:

```bash
npm install typescript ts-node @types/node
```

4. Inicializar TypeScript:

```bash
npx tsc --init
```

5. Ejecutar el ejercicio:

```bash
npx ts-node ejercicio.ts
```

Esto mostrará en consola:

* El balance total del portafolio.
* Qué acciones comprar o vender para rebalancear según la distribución deseada.
* Permite actualizar precios con `setCurrentPrice` y volver a rebalancear.

## Ejemplo de uso

```ts
const stock1 = new Stock("AAPL", 10, 180);
const stock2 = new Stock("META", 5, 300);
const stock3 = new Stock("MELI", 2, 400);

const portafolio = new Portafolio(
  [stock1, stock2, stock3],
  { AAPL: 20, META: 10, MELI: 70 }
);

portafolio.rebalanceMethod();

// Actualizar precios
stock1.setCurrentPrice(160);
stock2.setCurrentPrice(322);
stock3.setCurrentPrice(400);

portafolio.rebalanceMethod();
```

## Notas

* Las proporciones en el portafolio deben ser porcentajes enteros (ej. `50` para 50%).
* Los resultados se imprimen en consola.
* Este proyecto demuestra programación orientada a objetos y rebalanceo de portafolio financiero en TypeScript.
* EL README.md de este proyecto se hizo con IA, mas no asi el codigo.
