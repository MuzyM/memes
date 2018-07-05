var name, city, email, password, TestName, TestPassword;

function Reg() {
    var string = document.getElementById("name");
    name = string.value;
    if (name.length == 0) {
        alert("You forgot to enter a name");
        return 0;
    }

    string = document.getElementById("city");
    city = string.value;
    if (city.length == 0) {
        alert("You forgot to enter a city");
        return 0;
    }

    string = document.getElementById("email");
    email = string.value;
    if (email.length == 0) {
        alert("You forgot to enter a email");
        return 0;
    }

    string = document.getElementById("password");
    password = string.value;
    if (password.length < 4) {
        alert("The password must be longer than 4 characters");
        return 0;
    }
    alert("Вы успешно зарегистрировались");

    sessionStorage.setItem("NameReg",name);
    sessionStorage.setItem("Password",password);
    window.location.href = "login.html";
}

function Login() {
    name = sessionStorage.getItem("NameReg");
    password = sessionStorage.getItem("Password");

    var string = document.getElementById("name");
    TestName = string.value;

    string = document.getElementById("password");
    TestPassword = string.value;

    if(TestName == name) {
        if (TestPassword == password) alert("Welcome!")
        else alert("Wrong password");
    }
    else alert("User not found");
}

function returnReg() {
    window.location.href = "reg.html"
}

function ChekPassword() {
    var string = document.getElementById("password");
    var a = string.value;
    if (a.length < 7) {
        var elem = document.getElementById("password");
        elem.style.border = "1px solid Red";
    }
    else {
        var elem = document.getElementById("password");
        elem.style.border = "1px solid #43a0ff";
    }
}