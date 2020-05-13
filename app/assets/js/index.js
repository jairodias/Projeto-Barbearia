
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
})