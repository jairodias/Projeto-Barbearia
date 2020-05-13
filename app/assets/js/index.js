
$(document).ready(function(){

    $('.fa-eye-slash').on('click', function(){
       $('.fa-eye').removeAttr('hidden');
       $('.fa-eye-slash').attr('hidden', true);
       $('#password').attr('type', 'text');
       $('#password1').attr('type', 'text');
    })

    $('.fa-eye').on('click', function(){
        $('.fa-eye-slash').removeAttr('hidden');
        $('.fa-eye').attr('hidden', true);
        $('#password').attr('type', 'password');
        $('#password1').attr('type', 'password');
    })

    $(".btn-submit").on('click touch tap', function(){
        var password = $(this).val();

        if(checkPasswordForça(password)){
            $.ajax({
                url: `/login`,
                type: "POST",
                dataType: 'json',
                data: $("#login").serialize(),
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
    });
})