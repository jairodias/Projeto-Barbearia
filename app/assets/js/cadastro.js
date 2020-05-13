$(document).ready(function(){
    $('.btn-formulario').on('click', function(){
        var email = $('#email').val();
        var password = $('#password').val();
        var password1 = $('#password1').val();
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var senha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        var flag = true;
        if((!senha.test(password)) || (!senha.test(password1))){
            flag = false;
            Swal.fire(
                'Ops!',
                'As senhas devem conter o mínimo de oito caracteres, pelo menos uma letra maiúscula, uma letra minúscula e um número',
                'error'
            )
        }

        if(!reg.test(email)){
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
                        alert('Ops, falha em enviar menssagem');
                    }
                }
            });
        }
    })
});