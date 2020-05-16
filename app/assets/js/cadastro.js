
function checkEmail(emailDigitado){
    var email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return email.test(emailDigitado.toLowerCase());
}

$(document).ready(function(){
    $('.btn-formulario').on('click', function(){
        var email = $('#email').val();
        var password = $('#password').val();
        var password1 = $('#password1').val();
        
        
        var flag = true;
        if((password.length < 8 ) || (password1.length < 8 )){
            flag = false;
            Swal.fire(
                'Ops!',
                'As senhas devem conter o mínimo de oito caracteres',
                'error'
            )
        }
        
        if(!checkEmail(email)){
            flag = false;
            Swal.fire(
                'Ops!',
                'Email não corresponde ao padrão xxxxx@xxxx.com',
                'error'
            )
        }

        if(password !== password1){
            flag = false;
            $('#password').addClass('is-invalid');
            $('#password1').addClass('is-invalid');

            $('#password').val('');
            $('#password1').val('');
            Swal.fire(
                'Ops!',
                'Senhas não conferem',
                'error'
            )
        }
        if(flag !== false){
            $.ajax({
                url: `/cadastrar`,
                type: "POST",
                dataType: 'json',
                data: $("#cadastrar").serialize(),
                success: function (json) {
                    if (json.status === 1) {
                        Swal.fire(
                            'Cadastrado com sucesso!',
                            'Você será redirecionado para a página principal',
                            'success'
                        ).then((result) => {
                            if(result.value){
                                window.location.href = '/';
                            }
                        });
                    } else {
                        Swal.fire(
                            json.message,
                            'Você será redirecionado para a página principal',
                            'error'
                        ).then((result) => {
                            if(result.value){
                                window.location.href = '/';
                            }
                        });
                    }
                }
            });
        }
    })
});