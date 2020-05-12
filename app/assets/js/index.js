
$(document).ready(function(){

    $('#close').on('click', function(){
       $('#open').removeAttr('hidden');
       $('#close').attr('hidden', true);
       $('#password').attr('type', 'text');
    })

    $('#open').on('click', function(){
        $('#close').removeAttr('hidden');
        $('#open').attr('hidden', true);
        $('#password').attr('type', 'password');
    })


})