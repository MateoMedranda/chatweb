const form = document.querySelector("form");

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    const user = document.getElementById("username").value.trim();
    if(user !== ""){
        document.cookie = `username=${user}; path=/`;
        window.location.href = "/";
    }else{
        alert("Ingrese un nombre de usuario");
    }
});