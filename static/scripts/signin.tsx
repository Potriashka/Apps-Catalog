if (checkCookie("username")) {
    alert("You are already signed in!");
    window.location.replace("/");
}

function signin() {
    let button = document.getElementById("buttonSignIn");
    button.innerHTML = "<i class=\"fa fa-spinner fa-spin\"></i> Sign In";
    let username = document.getElementById("usernameSignin").value;
    let password = document.getElementById("password").value;

    if (username == "" || password == "") {
        button.innerHTML = "Sign in";
        alert("You must fill in all input fields!")
    } else {
        firebase.database().ref("/user/" + username).on("value", function(snapshot) {
            if (snapshot.val() == undefined) {
                button.innerHTML = "Sign In";
                alert("Username or password is incorrect. Try again.");
            } else {
                if (snapshot.val()["Password"] == password) {
                    setCookie("username", username, 100);
                    setCookie("name", snapshot.val()["Name"], 100);
                    window.location.replace("/");
                } else {
                    button.innerHTML = "Sign In";
                    alert("Username or password is incorrect. Try again.");
                }
            }
        });
    }
}

document.getElementById("noAccount").onclick = () => {
    openRegisterDialog();
}

document.getElementById("alreadyAccount").onclick = () => {
    openSignInDialog();
}
