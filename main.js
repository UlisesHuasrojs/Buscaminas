//Constantes del juego
const COLUMNAS = 10;
const FILAS = 10;
const CANTIDAD_MINAS = 10;

//Variables con colores para los casilleros (NO se pudieron declarar como constantes ya que  la fn color sólo está definida para el setup y el draw)
var COLOR_CASILLERO_CON_MINA;
var COLOR_CASILLERO_SIN_MINA;
var COLOR_CASILLERO_MARCADO;

//Variables controladas al hacer click con el mouse: mousePressed()
var columnaPresionada;
var filaPresionada;
var hizoClick = false;

//Otras variables
var casillerosSinDescubrir;


function setup()
{
  createCanvas(500, 500);   //crea un lienzo o panel donde estará el juego. El primer parámetro es el ancho y el segundo el alto del lienzo.
  laMagiaDeLosProfes();

  //Asigno colores que se utilizarán. La fn color solo está definida para el setup y el draw
  COLOR_CASILLERO_CON_MINA = color("#FF0000");
  COLOR_CASILLERO_SIN_MINA = color("#1CC932");
  COLOR_CASILLERO_MARCADO = color("#278EF2");


  {

    ponerMinaCasillero(5,5); //pone una mina en la columna 4, fila 5
    console.log(casillerosSinDescubrir)
    casillerosSinDescubrir = FILAS * COLUMNAS;
    ponerMinasTablero();
  }
}

function draw() {

  if (hizoClick == true)
  {
    if (mouseButton == LEFT)
    {
       if (tieneMinaCasillero(columnaPresionada, filaPresionada)){
         mostrarMinas();
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_CON_MINA);
        perder();
        
      }
        
        if (descubrirCasillero(columnaPresionada, filaPresionada)){
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_SIN_MINA); //pinta el casillero clickeado. Modificar/Completar
      }
      if (casillerosSinDescubrir == CANTIDAD_MINAS){
        ganoElJuego();
      }
      
    }
    else
    {
        pintarCasillero(columnaPresionada, filaPresionada, COLOR_CASILLERO_MARCADO);
        //poner bandera
    }

      //pintar el casillero clickeado. Modificado/Completado
    
    hizoClick = false;  //Indico que ya "procesé" el click del usuario. NO modificar
  }

}


function ganoElJuego()
{
  console.log("Victory")
  ganar();
  return true;   
}

// Modificar/completar
  //NumeroAletorio= floor(random(0, 100));
function ponerMinasTablero()
{
  for (let contador = 0; contador < CANTIDAD_MINAS; contador++)
  {
    var columnamina = floor(random(0, COLUMNAS));
    var filamina = floor(random(0, FILAS));
    if(tieneMinaCasillero(columnamina, filamina))
    {
      //esto se ejecuta si la columna 4, fila 5 tiene una mina
      contador=contador-1
    }
    else
    {
      //esto se ejecuta si la columna 4, fila 5 NO tiene una mina
      console.log(columnamina+" , "+filamina);
      ponerMinaCasillero(columnamina,filamina);
    }
  }
}

function mostrarMinas()
{
 
  for (let contadorC = 0; contadorC < COLUMNAS; contadorC++){
    for (let contadorF = 0; contadorF < FILAS; contadorF++){
      if (tieneMinaCasillero(contadorC, contadorF)){
        pintarCasillero(contadorC, contadorF, COLOR_CASILLERO_CON_MINA);
        
      }
    }
  }
  
}

function contarMinasAlrededor(columna, fila){
 let contadorMinas = 0;
  for (let x = columna - 1; x <= columna + 1; x++) {
    for (let y = fila - 1; y <= fila + 1; y++) {
      if ( x >= 0 && x < COLUMNAS && y >= 0 && y < FILAS && (x !== columna || y !==fila)){
        if (tieneMinaCasillero(x,y)) {
           contadorMinas++;
          }
        }
      }
    }     

  return contadorMinas;
}

/*
for i in range(1, 10):
  accion

for(var contador=0 ; contador < 50 ; contador++)
{
  acciones
}

for(inicializacion; condicion_mientras_que_se_cumple_lo_hace ; paso)
{

}
//estoy por el punto 18 //

*/