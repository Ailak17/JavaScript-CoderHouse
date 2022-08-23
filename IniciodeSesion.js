function guardarlocal(){
    var form = document.getElementById('forms').elements;
    for(var i = 0; i<= form.length - 1; i++){
        if(form[i].type == 'text',"email","pasword"){

            console.log(form[i].value);
            localStorage.setItem(form[i].id, JSON.stringify(form[i].value));
        }
    }
    console.log(localStorage);
}
function cambiar() {
    document.getElementById("forms").innerHTML = "<h1>Registro exitoso! Continua con tu compra!</h1> " ;
}

document.getElementById("boton").onclick = function (){
    guardarlocal()
    cambiar();
    setTimeout(() => {
        window.location = "./paginadebordados.html"
    },2000)
    
} ;
