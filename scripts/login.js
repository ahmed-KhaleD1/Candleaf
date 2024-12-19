let usrInputElement = document.getElementById("usr");
let usrEmailInputElement = document.getElementById("usrEmail");
let passwordElement = document.getElementById("password");
let confirmPasswordElement = document.getElementById("confirmPassword");
let submitBtnElement = document.getElementById("submitBtn");
let ErrorSpanElement = document.querySelectorAll(".spanError");

let usrInputElementValidateFlag = false;
let usrEmailInputElementFlag = false;
let passwordFlag = false;
let confirmPasswordFlag = false;

submitBtnElement.addEventListener("click", function (event) {
    event.preventDefault();
    if (!usrInputElement.value) {
        ErrorSpanElement[0].style.display = "block";
        ErrorSpanElement[0].innerText = "Please Enter Your Name";
        usrInputElementValidateFlag = false;
    } else {
        ErrorSpanElement[0].style.display = "none";
        usrInputElementValidateFlag = true;
    }

    if (!/[a-z0-9\._%+!$&*=^|~#%'?{}/\-]+@([a-z0-9\-]+\.){1,}([a-z]{2,16})/.test(
        usrEmailInputElement.value)
    ) {
        ErrorSpanElement[1].style.display = "block";
        ErrorSpanElement[1].innerText = "Please Enter valid Email";
        usrEmailInputElementFlag = false;
    } else {
        ErrorSpanElement[1].style.display = "none";
        usrEmailInputElementFlag = true;
    }

    if ( passwordElement.value.length < 8) {
        ErrorSpanElement[2].style.display = "block";
        ErrorSpanElement[2].innerText = "Please Enter valid Password ";
        passwordFlag = false;
    } else {
        ErrorSpanElement[2].style.display = "none";
        passwordFlag = true;
    }

    if ( confirmPasswordElement.value.length < 8) {
        ErrorSpanElement[3].style.display = "block";
        ErrorSpanElement[3].innerText = "Please Enter valid Confirm Password";
        confirmPasswordFlag = false;
    } else {
        ErrorSpanElement[3].style.display = "none";
        confirmPasswordFlag = true;
    }

    if (confirmPasswordElement.value !== passwordElement.value) {
            ErrorSpanElement[4].style.display = "block";
            ErrorSpanElement[4].innerText = "Password and Confirm Password Not Matched!";
            confirmPasswordFlag=false;
        
    } else {
        ErrorSpanElement[4].style.display = "none";
        confirmPasswordFlag = true;
    }

    if (usrEmailInputElementFlag && usrInputElementValidateFlag && passwordFlag && confirmPasswordFlag) {
        localStorage.setItem("name", usrInputElement.value);
        localStorage.setItem("email", usrEmailInputElement.value);
        window.location.href = "homePage.html";
    }
});