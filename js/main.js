var validar={
    isText: function(_string)
    {
        return (_string.match(/^[a-zA-Z]+$/));
    },
    isEmail:function(_string)
    {
        email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !email.test(_string) )
        {
            return false;
        }
        return true;
    },
    isValidPassword: function(_string)
    {
        var isValid= true;
        if(_string.length<6 || _string=='098754' || _string=='123456' || _string=='password')
            {
                isValid= false;
            }
        return isValid;
    },
    isVacio: function(_string)
    {
    if(_string=="")
    {
        return true;
    }
    return false;
    },
    isSelect: function(_string)
    {
        if(_string==0)
            return false
        else
            return true;
    }
}
function mayuscula(inputId){
    inputId = $('#' + inputId );
    var texto= inputId.val().split("");
    var primeraLetra = String(texto[0]);
    var mayuscula = primeraLetra.toUpperCase();
    var espacio = false;
        
    for(var i=1; i<texto.length; i++) {
         if(espacio){
            mayuscula +=texto[i].toUpperCase();
            espacio = false;
            } else {
                mayuscula += texto[i];
                if(texto[i] == " ")
                    espacio = true;
            }
        inputId.val(mayuscula);
        }
        return inputId.val();
}
function createMessage(inputId, message)
{
    var elemento= $('#' + inputId);
    if (!elemento.next()) {
        elemento.parent().append('<span>'+ message +'</span>');
    }
    else{
        if(elemento.next().is('span'))
        {
            elemento.next().html(message);
        }else{
            elemento.parent().find('span').remove();
                elemento.parent().append('<span>'+ message +'</span>');
            }
    }

}

function removeMessage(inputId)
{
    var elemento= $('#' + inputId);
    if (elemento.parent().find('span').length > 0) {
            elemento.parent().find('span').remove();
         }
}


function Valid(){
    var name= $('#name');
    var lastName= $('#lastname');
    var email= $('#input-email');
    var password= $('#input-password');
    var selector= $('#select').val();
    mayuscula('name');
    mayuscula('lastname');
    var isvalid=true;

    if (validar.isText(name.val())){
        removeMessage('name');
        }else{
            createMessage('name','el nombre no es válido');
            isvalid= false;
            }
    if (validar.isText(lastName.val())){
        removeMessage('lastname');
        }else{
            createMessage('lastname','el apellido no es válido');
            isvalid= false;
        }
    if (validar.isEmail(email.val())) {
        removeMessage('input-email');
        }else{
            createMessage('input-email','el email no es válido');
            isvalid= false;
        }
    if (validar.isValidPassword(password.val())) {
        removeMessage('input-password');
        }else{
            createMessage('input-password','el password no es válido');
            isvalid= false;
        }
    if (validar.isSelect(selector)) {
        removeMessage('select');
        }else{
            createMessage('select','no eligio una opcion');
            isvalid= false;
        }

    return isvalid;
}

function validateForm(){
    if(Valid()){
        alert("Formulario enviado");
    }else{
        alert("Llene correctamente el formulario");
    }
}

$( "form.form-signup" ).submit(function(event) {
    event.preventDefault();
});

$('.form-signup input').on('keyup',function(){
    Valid();  
})

$('.form-signup select').change(function(){
    Valid();  
});














/*
function validateName(_id){  
    var nombre = document.getElementById(_id);
    var textoNombre = "Debe ingresar su nombre";
    var textoNumero = "Los números no son válidos";
 
    
    if(nombre.value!=""){
       
        nombre.value = convertirMayus(nombre.value);
        
        if(/([0-9])/g.test(nombre.value)){
            mensaje(_id,textoNumero);
        } else {
            removeAviso(_id);
        }
    } else {
        mensaje(_id,textoNombre);
    }    
}

function validateEmail(_evt){

    var email= document.getElementById("input-email");
    var textoEmail = "Verifique su e-mail";

    if(/([a-zA-Z0-9(-_.)]+[@][a-zA-Z0-9]+[.][a-zA-Z]+)/g.test(email.value)){
        removeAviso("input-email"); 
    } else {
        if(email.value.length >= 0){
            mensaje("input-email",textoEmail);  
        }
    }
}

function validatePassword(_evt) {
    
    var password = document.getElementById("input-password");
    var textoPassword = "La contraseña debe tener al menos 6 caracteres";
    
    if(password.value === "098754" || password.value.length <= 6 || password.value === "123456" || password.value.toLowerCase() === "password" ) {
        mensaje("input-password",textoPassword); 
        
    } else {
        removeAviso("input-password");
    }
}

function validateType(_evt) {
    
    var seleccionar = document.getElementById("select");
    var textoSeleccionar = "Debes seleccionar al menos un tipo de bici";
    
    if(seleccionar.value == 0){
          mensaje("select",textoSeleccionar);
    } else { 
        if(seleccionar.value == "urbana" || seleccionar.value == "treking" || seleccionar.value == "electrica" || seleccionar.value == "estatica"){
        removeAviso("select");
        }
          
    }   
}

function validateForm(){
    var mensaje = document.getElementById("mensaje");
    var nombre = document.getElementById("name");
    var apellido = document.getElementById("lastname");
    var email = document.getElementById("input-email");
    var contraseña = document.getElementById("input-password");
    var seleccionar = document.getElementById("select");
    
    if(nombre.value.length==0 || apellido.value.length==0 || email.value.length==0 || contraseña.value.length==0 || seleccionar.value==0) {
        
        validateName('name');
        validateName('lastname');
        validateEmail();
        validatePassword();
        validateType();
        mensaje.innerHTML = "";
        
    } else {
            mensaje.innerHTML = "<br><h4>Enviado!</h4>";      
        } 
}

function mensaje(campo,texto){

    var elemento = document.getElementById(campo);
    
    if(elemento.nextSibling == null) {
        crearSpan(elemento,texto);    
    } else { 
        
        if(elemento.nextSibling.tagName == 'SPAN'){
            elemento.nextSibling.innerHTML = texto;
            
        } else {
            elemento.parentNode.removeChild(elemento.nextSibling); 
            crearSpan(elemento,texto);
        }        
    }
}

function removeAviso(campo){
    
    var elemento = document.getElementById(campo);
    
    if(elemento.nextSibling != null) {
        
        elemento.parentNode.removeChild(elemento.nextSibling);
    }
    
}

function convertirMayus(texto){
    
    var nombreArray = texto.split("");
    var primeraLetra = nombreArray[0];
    var mayuscula = primeraLetra.toUpperCase();
    var espacio = false;

    for(var i=1; i<nombreArray.length; i++) {

        if(espacio){
            mayuscula += nombreArray[i].toUpperCase();
            espacio = false;
        } else {
            mayuscula += nombreArray[i];
            if(nombreArray[i] == " ")
                espacio = true;
        }
    }
    
    return mayuscula;
}

function crearSpan(elementoInput,textoInput){
    
    var cajaNegra = document.createElement("span");
    var info = document.createTextNode(textoInput);
    cajaNegra.appendChild(info);
    var padre = elementoInput.parentNode;
    padre.appendChild(cajaNegra);
}
*/