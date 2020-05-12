$(document).ready(function(){
    $('.btn-formulario').on('click', function(){
        var email = $('#email').val();
        var password = $('#password').val();
        var password1 = $('#password1').val();
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        
        if(password == password1){
            if(reg.test(email)){
            
            }else{
                return false;
            }
        }else{
            $('#password').addClass('is-invalid');
            $('#password1').addClass('is-invalid');

            return false;
        }

        $('#cadastrar').submit();

        console.log(email, password, password1);
    })
});