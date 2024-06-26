const passImg = document.querySelector('#passwordImg')
const passwordType = document.querySelector('#password')
const confirmpassType = document.querySelector('#confirmPassword')

passImg.addEventListener('click', function(e) {
    if(passwordType.type == "text") {
        passwordType.type = "password"
        confirmpassType.type = "password"
        passImg.src = "./img/eye.png"
    } else {
        passwordType.type = "text"
        confirmpassType.type = "text"
        passImg.src = "./img/view.png"
    }

})



// file from Home

