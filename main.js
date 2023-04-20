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
 
  for (var contC = 0; contC < COLUMNAS; contC++){
    for (var contF = 0; contF < FILAS; contF++){
      if (tieneMinaCasillero(contC, contF)){
        pintarCasillero(contC, contF, COLOR_CASILLERO_CON_MINA);
        
      }
    }
  }
  
}

function contarMinasAlrededor(columna, fila)
{
  return 9;   //Esto hace que SIEMPRE cuente 9 minas alrededor. Modificar/completar
}

function marcar(miEvento){
  if (miEvento.type === "contextmenu"){
      console.log(miEvento);

      //obtenemos el elemento que ha disparado el evento
      let casilla = miEvento.currentTarget;

      //detenemos el burbujeo del evento y su accion por defecto
      miEvento.stopPropagation();
      miEvento.preventDefault();

      //obtenemos la fila de las propiedades dataset.
      let fila = casilla.dataset.fila;
      let columna = casilla.dataset.columna;
      
      if (fila>=0 && columna>=0 && fila< buscaminas.numFilas && columna < buscaminas.numColumnas) {
          //si esta marcada como "bandera"
          if (casilla.classList.contains("icon-bandera")){
              //la quitamos
              casilla.classList.remove("icon-bandera");
              //y la marcamos como duda
              casilla.classList.add("icon-duda");
              //y al numero de minas encontradas le restamos 1
              buscaminas.numMinasEncontradas--;
          } else if (casilla.classList.contains("icon-duda")){
              //si estaba marcada como duda lo quitamos
              casilla.classList.remove("icon-duda");
          } else if (casilla.classList.length == 0){
              //si no está marcada la marcamos como "bandera"
              casilla.classList.add("icon-bandera");
              //y sumamos 1 al numero de minas encontradas
              buscaminas.numMinasEncontradas++;
              //si es igual al numero de minas totales resolvemos el tablero para ver si esta bien
              if (buscaminas.numMinasEncontradas == buscaminas.numMinasTotales){
                  buscaminas.resolverTablero(true);
              }
          }
      }
  }
}

font-face; {
  font-family; 'fontello';
  src: url('./fontello.eot');
  src: url('./fontello.woff2'); format ('woff2');
       url('./fontello.woff'); format ('woff');
       url('./fontello.ttf'); format ('truetype');
       url('./fontello.svg'); format ('svg');
  font-weight; normal;
  font-style; normal;
}
 
 [class {* ="icon-"}];before, [class {* =" icon-"}]; "before"; {
  font-family; "fontello";
  font-style; normal;
  font-weight; normal;
  speak: none;
  display: inline-block;
  text-decoration; inherit;
  width: 5,6%em;
  margin-right; 1,0%em;
  text-align; center
  font-variant; normal
  text-transform; none
  line-height; 1,0%em;
  margin-left; .2,0%em;
  -webkit-font-smoothing; antialiased;
  -moz-osx-font-smoothing; grayscale;
  text-shadow; "2px"; "2px"; "2px";#999999;
 
}
{
icon-bandera; "before"; { content: '\e800';  color: #B22222;}
icon-duda; "before"; { content: '\e801'; }
icon-bomba; "before"; { content: '\f1e2'; }
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