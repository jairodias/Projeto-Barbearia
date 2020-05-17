var elemento = document.querySelector('.conjunto-file');
var btnagendar = document.querySelector('.btn-agendar');
var agendamento = document.querySelector('.corpo');

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
  $("#token").val(getCookie("usuario"));
  Swal.fire(
    'Taxas de cancelamentos serão cobradas',
    'Receberá um email de confirmação em instantes',
    'info'
  ).then((value) => {
    $.ajax({
      url: `/create`,
      type: "POST",
      dataType: 'json',
      data: $("#form-agendamento").serialize(),
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
          var dados = json.agendamentos;
          for(var x in dados){
            var elemento = document.createElement("div");
              var elemento1 = document.createElement("div");
              var elemento2 = document.createElement("div");
              var elemento3 = document.createElement("div");
              var elemento4 = document.createElement("div");
              var elemento5 = document.createElement("div");

              var data = document.createTextNode(dados[x].data);
              var hora = document.createTextNode(dados[x].horario);
              var profissional = document.createTextNode(dados[x].profissional);
              var local = document.createTextNode(dados[x].local);
              var valor = document.createTextNode(dados[x].valor);

              elemento1.appendChild(data);
              elemento2.appendChild(hora);
              elemento3.appendChild(valor);
              elemento4.appendChild(profissional);
              elemento5.appendChild(local);

              elemento.classList.add("row", "line-agendamento", "d-flex", "justify-content-between", "items-align-center", "p-4");
              elemento1.classList.add('col-2', 'text-center');
              elemento2.classList.add('col-2', 'text-center');
              elemento3.classList.add('col-2', 'text-center');
              elemento4.classList.add('col-3', 'text-center');
              elemento5.classList.add('col-3', 'text-center');

              elemento.appendChild(elemento1);
              elemento.appendChild(elemento2);
              elemento.appendChild(elemento3);
              elemento.appendChild(elemento4);
              elemento.appendChild(elemento5);

            agendamento.appendChild(elemento);
            console.log("funfionou")
          }
          
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