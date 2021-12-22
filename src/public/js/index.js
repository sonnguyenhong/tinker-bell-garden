function checkConfirmPassword(){
    var confirmPassword = document.getElementById("confirm-password");
    var nextPassword = document.getElementById ("next-password");
    var msg = document.getElementById("checkValidate")
    if(confirmPassword != nextPassword){
        msg.textContent = "Mat khau ko trung nhau";
    }else{
        msg.textContent = '';
    }
}