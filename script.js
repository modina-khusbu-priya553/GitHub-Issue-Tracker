// signin to home page

const signinBtn = document.getElementById("signinBtn");
signinBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if(!username || !password ){
        alert("Please provide valid username and password");
    } else if (username === "admin" && password === "admin123"){
        window.location.href = "./home.html";

    }else{
        alert("Invalid username or password");
    }
});