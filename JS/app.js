const ingresos =[
    
];

const egresos=[
    
];

let cargarApp =()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}
let totalIngresos=()=>{
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}
let totalEgresos=()=>{
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso= totalEgresos() / totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML=formatoPorcentaje( porcentajeEgreso);
    document.getElementById('ingresos').innerHTML=formatoMoneda( totalIngresos());
    document.getElementById('egresos').innerHTML=formatoMoneda( totalEgresos());
}

// Modificamos la manera en la que se muestran los valores
const formatoMoneda =(valor)=>{
   return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
}

// Modificamos la manera en la que se muestra el porcentaje
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent',minimumFractionDigits:2})
}

const cargarIngresos=()=>{
    let ingresosHTML ='';
    for(let ingreso of ingresos){
        ingresosHTML+= crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML=(ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion"> ${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor"> + ${formatoMoneda(ingreso.valor)} </div>
            <div class="elemento_eliminar">
                <button class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-outline"
                    onclick="eliminarIngreso(${ingreso.id})"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    
    `;
    return ingresoHTML;
}

const cargarEgresos=()=>{
    let egresosHTML ='';
    for(let egreso of egresos){
        egresosHTML+= crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const eliminarIngreso=(id)=>{
    // Busqueda de un valor por ID - con metodo FindIndex
    let indiceEliminar = ingresos.findIndex(ingreso=> ingreso.id === id);
    // Metodo splice para eliminar un elemento o valor html
    ingresos.splice(indiceEliminar,1)
    cargarCabecero()
    cargarIngresos()
}
const crearEgresoHTML=(egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
        <div class="elemento_eliminar">
            <button class="elemento_eliminar--btn">
                <ion-icon name="close-circle-outline"
                onclick="eliminarEgreso(${egreso.id})"></ion-icon>
            </button>
        </div>
    </div>
    </div>
    `;
    return egresoHTML;
}
const eliminarEgreso=(id)=>{
    // Busqueda de un valor por ID - con la funcion FindIndex
    let indiceEliminar = egresos.findIndex(egreso=> egreso.id === id);
    // Funcion splice para eliminar un elemento o valor html
    egresos.splice(indiceEliminar,1)
    cargarCabecero()
    cargarEgresos()
}

const agregarDato=()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value!==''&& valor.value !== ''){
        if(tipo.value == 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value,+valor.value))
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value == 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarEgresos();
        }
    }
}