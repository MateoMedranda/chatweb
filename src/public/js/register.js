const login = document.getElementById("login");

login.addEventListener("click", () =>{
    const user = document.getElementById("username").value;
    if(username != ""){
        document.cookie = `username=${user}`;
        navigation.href = "/";
    }else{
        alert("Ingrese un nombre de usuario");
    }
});