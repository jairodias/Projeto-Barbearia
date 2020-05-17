var elemento = document.querySelector('.conjunto-file');
var btnagendar = document.querySelector('.btn-agendar');

$(".img-cliente").mouseover(function(){
  elemento.style.opacity = 0.7;
});

$(elemento).mouseover(function(){
  elemento.style.opacity = 0.7;
})

$(elemento).mouseout(function(){
  elemento.style.opacity = 0;
})

$(".img-cliente").mouseout(function(){
  elemento.style.opacity = 0;
})

$(btnagendar).on('click', function(){
  Swal.fire(
    'Taxas de cancelamentos serão cobradas',
    'Receberá um email de confirmação em instantes',
    'info'
  ).then((value) => {

  });
})

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  console.log(expires);
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// function checkCookie() {
//   var user=getCookie("token");
//   if (user != "") {
//     alert(user);
//     window.location.href = '/cliente?usuario=' + user;
//   }
// }

$(document).ready(function(){
  $.ajax({
    url: `/cliente`,
    type: "GET",
    dataType: 'json',
    data: {
      usuario: getCookie("usuario")
    },
    success: function (json) {
        if (json.status === 1) {
            
        } else {
            Swal.fire(
                'Ops!',
                json.menssage,
                'error'
            )
        }
    }
});

})