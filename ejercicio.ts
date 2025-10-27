class Stock {  // Clase para las acciones
    constructor( //Inicializa los valores del constructor al instanciar la clase
      public symbol: string,  //Simbolo que representa a la accion GOOG, META,TSLA, etc.
      public shares: number,  //Cantidad de acciones que se posee
      private currentPrice: number //Precio actual de la accion en el mercado
    ) {}
  
    getValue(): number { //Obtiene el balance total que se tiene en la accion invertida
      return this.shares * this.currentPrice; // cantidad de acciones multiplicado por el valor de la accion
    }

    getCurrentPrice(): number { //obtiene el valor actual de la accion en el mercado
        return this.currentPrice;
    }

    setCurrentPrice(price: number) { // modifica el valor actual de la accion en el mercado
        this.currentPrice = price;
    }
  }

class Portafolio { // Clase Portafolio.
    constructor(
        public stocks: Stock[], // Array de stocks que posee el portafolio
        public portafolio: Record<string, number> // Distribución deseada del portafolio (%)
      ) {}
    

      getTotalBalance(): number { // Calcula el valor total del portafolio
        let balance = 0;
        this.stocks.forEach(stock => {
            balance += stock.getValue(); // va sumando el balance de cada acción que se tiene
        })
        return balance;
    }

    rebalanceMethod(): void {

        const portafolioBalance = this.getTotalBalance(); //Se obtiene el balance total que se tiene en el portafolio

        this.stocks.forEach(stock => { //Se va a ir trabajando por cada accion individual para ver si se tiene que vender o comprar mas de ella
            let stockBalance = stock.getValue(); //se obtiene el balance total de la accion
            let desiredPercent = this.portafolio[stock.symbol]; // obtiene el porcentaje deseado de la accion en el portafolio

            if(!desiredPercent) { //verifica que exista el la accion elegida en el portafolio, si no existe se retorna
                return
            }
            let currentPercent = stockBalance * 100/ portafolioBalance; //obtiene el porcentaje actual de la accion en el portafolio
            if(currentPercent > desiredPercent) { //si el porcentaje actual en el portafolio es mayor al del deseado, se debe vender parte de esa accion, se entra al if
                let valueToSell = portafolioBalance * (currentPercent - desiredPercent) //obtiene el valor a vender en pesos
                let sharesToSell = valueToSell / stock.getCurrentPrice(); //obtiene la cantidad de acciones a vender
                console.log('debes vender ', sharesToSell, 'acciones de ', stock.symbol) //imprime el resultado
            }
            else if(currentPercent < desiredPercent) { //si el porcentaje actual en el portafolio es menor al del deseado, se debe comprar de esa accion, se entra al if
                let valueToBuy = portafolioBalance * (desiredPercent - currentPercent) //obtiene el valor a comprar en pesos
                let sharesToBuy = valueToBuy / stock.getCurrentPrice(); //obtiene la cantidad de acciones a comprar
                console.log('debes comprar ', sharesToBuy, 'acciones de ', stock.symbol) //imprime el resultado
            }
            else { //en caso de que el porcentaje ya este balanceado, no se debe hacer nada con esa accion
                console.log(stock.symbol, ' ya esta balanceado!')
            }
            
        })
    }
    
}

/**
 * Cómo usar:
 * 1. Crear instancias de Stock: `new Stock(symbol, shares, currentPrice)`
 * 2. Crear instancia de Portafolio con los stocks y la distribución deseada (%):
 *    `new Portafolio([stock1, stock2], {AAPL: 20, META: 80})`
 * 3. Llamar `rebalanceMethod()` para ver qué acciones comprar o vender
 * 4. Actualizar precios si cambian usando `setCurrentPrice(newPrice)`
 */

const stock1 = new Stock("AAPL", 10, 180);
const stock2 = new Stock("META", 5, 300);
const stock3 = new Stock("MELI", 2, 400);

const portafolio = new Portafolio([stock1, stock2, stock3],{AAPL: 20, META: 10, MELI: 70})

portafolio.rebalanceMethod()

console.log('----------------------------')

stock1.setCurrentPrice(160);
stock2.setCurrentPrice(322);
stock3.setCurrentPrice(400);

console.log('----------------------------')

portafolio.rebalanceMethod();