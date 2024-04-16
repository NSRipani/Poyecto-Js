// Variables para inicio de operaciones
const productos = ["LUCES","GORROS","MASCARAS"];
const precios = [100.0, 150.0, 200.0];
const stock = [0,0,0];

// Lista para guardar el importe total por ventas de articulos
const importe_ventas = [0,0,0];

// Lista para guardar las cantidades vendidas
const cantidad_vend = [0,0,0];

// Variable utilizada para realizar el calculo de cada venta
let importe = 0;

// Sumar ventas por forma de pago
let total_cont = 0;

// Variable para controlar el ingreso de Stock y Mercaderia
let dia_anterior_cargado = false;

let opcionMenu = null;

function mensajeInicio(){
    let opcion = prompt("|-------------------------------------------------------------|\n" +
    "|-----------------  BIENVENIDO A ATS  ------------------------|\n" +
    "|-------------------------------------------------------------|\n" +
    "|-----------------  Menu de opciones  ------------------------|\n" +
    "|-------------------------------------------------------------|\n" +
    "| 1. Cargar stock del dia anterior\n" +
    "| 2. Cargar mercaderia ingresada\n" +
    "| 3. Cargar ventas diarias\n" +
    "| 4. Consulta de stock disponible y precio de un producto\n" +
    "| 0. Salir\n" +
    "|--------------------------------------------------------------\n"+
    "Seleccione una opción:");

    return opcion;
}

function CargarStock(mensaje) {
    let stock = Number(prompt(mensaje));

    while (Number.isNaN(stock) || stock < 0) {
        alert("\n-------------------------------------------------------------\n" +
        "Opcion invalida. Vuelva a intentar, debe ingresar mayor a '0'.\n" +
        "---------------------------------------------------------------\n");
        stock = Number(prompt(mensaje));
    }

    return stock;
}

function cargarMercaderia(mensaje){
    let mercaderia = Number(prompt(mensaje));

    while (Number.isNaN(mercaderia) || mercaderia < 0) {
        alert("\n-------------------------------------------------------------\n" +
        "Opcion invalida. Vuelva a intentar, debe ingresar mayor a '0'.\n" +
        "----------------------------------------------------------------\n");
        mercaderia = Number(prompt(mensaje));
    }

    return mercaderia;
}

function id_indice(){
    let op_prod = Number(prompt("-> ¿Qué producto desea cargar mercadería?\nIngrese el ID del producto o 'Salir': "));
    while (Number.isNaN(op_prod) || op_prod < 0 || op_prod > 3) {
        op_prod = Number(prompt("\n-------------------------------------------------------------\n" +
        "Opcion invalida. Vuelva a intentar, debe ingresar mayor a '0'.\n" +
        "----------------------------------------------------------------\n"+
        "Ingrese el ID del producto o 'Salir':"));
    }
    return op_prod
}


while (opcionMenu !== 0) {
    opcionMenu = mensajeInicio();
    
    switch (opcionMenu) {
        case '1':
            if (!dia_anterior_cargado) {
                // Ciclo for para agregar 'stock del dia anterior'
                for (i = 0; i < productos.length; i++) {
                    stock[i] += CargarStock(`Cargue stock para ${productos[i]}: `);
                }
                dia_anterior_cargado = true;
                alert("Stock disponible: " + stock.join("  |  "));

            }
            else alert("- El stock del dia anterior ya ha sido cargada");
            break;
        case '2':
            let salir = false
            while (salir === false){
                
                let mensajeMercaderia = "-----------------   CARGAR MERCADERIA     ------------------\n";
                // Visualizar lista de producto para la eleccion del producto 
                for (i=0;i<productos.length;i++){
                    mensajeMercaderia += `${i} - ${productos[i]}\n`;
                }
                mensajeMercaderia += `${productos.length}`+" - Salir";
                alert(mensajeMercaderia)      
            
                op_prod = id_indice();
                // Condicional para cargar mercaderia por producto
                if (op_prod < 3){
                    stock[op_prod] += cargarMercaderia(`Cargar de mercaderia ${productos[op_prod]}:`); 
                } else { 
                    // Variable de apoyo para SALIDA al ciclo WHILE
                    salir = true
                }
            }
            break
        case '3':
            let salirVenta = false
            while (salirVenta === false){
                let mesajeVenta = "-----------------   CARGAR VENTAS     ------------------\n";
                
                // Visualizar lista de producto para la eleccion del producto 
                for (i=0;i<productos.length;i++){
                    mesajeVenta += `${i} - ${productos[i]}\n`;
                }
                mesajeVenta += `${productos.length}`+" - Salir\n\n";
                mesajeVenta += "Ingrese el número del producto deseado:";

                let op_prod = Number(prompt(mesajeVenta));
        
                if (op_prod !== productos.length) {
                    if (op_prod >= 0 && op_prod < productos.length) {
                        let indice = op_prod;
                        let cantidad = Number(prompt("Ingrese cantidad requerida:"));
                        
                        if (cantidad <= 0 || isNaN(cantidad)) {
                            alert("Ingrese una cantidad válida.");
                            continue;
                        }
        
                        if (cantidad > stock[indice]) {
                            alert("No hay suficiente stock para el producto seleccionado.");
                            continue;
                        } 
                        
                        // Actualizar cantidad vendida y stock
                        cantidad_vend[indice] += cantidad;
                        stock[indice] -= cantidad;
                        
                        // Calcular importe
                        let importe = precios[indice] * cantidad;
                        
                        // Actualizar importe de ventas totales
                        importe_ventas[indice] += importe;
                        total_cont += importe;

                        alert(`Venta realizada: ${cantidad} ${productos[op_prod]} por $${importe}\n`+
                        `Venta Total: $${total_cont}`)
                    } else {
                        alert("Opción inválida.");
                        continue;
                    }
                } else {
                    salirVenta = true;
                }
            }
            break
        case '4':
            let mesajeStock = "--- CONSULTA DE STOCK DISPONIBLE Y PRECIO DE UN PRODUCTO ---\n";
            productos.forEach((producto, id) => {
                mesajeStock += `${id} - ${producto}\n`;
            });
            mesajeStock += "-> ¿Qué producto desea consultar?\nIngrese el ID del producto o 3 - 'Salir': ";
            let prod = Number(prompt(mesajeStock));

            while (Number.isNaN(prod) || prod < 0 || prod > 3) {
                prod = Number(prompt("\n-------------------------------------------------------------\n" +
                "Opcion invalida. Vuelva a intentar, debe ingresar '0', '1' o '2'.\n" +
                "---------------------------------------------------------------\n"+
                "Ingrese el ID del producto o 3 - 'Salir': "));
            }
            if(prod < 3){
                alert("|------------------------------------------------------------|\n"+
                "|-----------------     STOCK Y SU PRECIO    ---------------|\n"+
                "|------------------------------------------------------------|\n"+
                "|    PRODUCTO        |        STOCK     |     PRECIO         |\n"+
                "|       "+`${productos[prod]}`+"        |       "+`${stock[prod]}`+"      |          "+`${precios[prod]}`+"  |\n"+
                "|------------------------------------------------------------|\n");
            } 
            break
        case '0':
            alert('FIN');
            opcionMenu = 0;
            break;
    }
}