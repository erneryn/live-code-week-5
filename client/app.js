
const userArea=$('#user-area')
const loginForm=$('#login-form')
const registerForm =$('#register-form')
const logOutbutton =$('#btn-logout')
const baseUrl = 'http://localhost:3000/'
const updateForm = $('#update-form')

start()


function start(){

  if(localStorage.getItem('token')){
    logOutbutton.show()
    registerForm.hide()
    loginForm.hide()
    userArea.show()
    showComic()
    updateForm.hide()
  }else{
    loginForm.show()
    logOutbutton.hide()
    registerForm.hide()
    userArea.hide()
  }
  
}

  
  $('#btn-logout').click(function (e) {
    localStorage.removeItem('token')
    start()
  })

    
  $('#show-register').click(function (e) {
    loginForm.hide()
    registerForm.show()
  })

  $('#login-register').click(function (e) {
    start()
  })


  registerForm.on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      url: `${baseUrl}register`,
      type: "POST",
      data: {
        name: $('#name-register').val(),
        email: $('#email-register').val(),
        password: $('#password-register').val()
      }
      
    }).done(function (response) { //
       
      start()
    });
  });
  



loginForm.on('submit', function (e) {
  e.preventDefault()
  $.ajax({
    url: `${baseUrl}login`,
    type: "POST",
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    }
  }).done(function (response) { 
    console.log(response)
    localStorage.setItem("token", response.token)
    start()
  });
});



function showComic(){

    $("#comics").empty();
    $.ajax({
      url: `${baseUrl}comics`,
      headers: { token: localStorage.getItem('token') },
      type: 'GET',
      success: function (res) {
      console.log(res)
        if (res) {
          res.forEach(data => {
            let html = `<div id="data-card" class="col-4 mb-4">
            <div class="card text-center">
              <img
                src="${data.imageUrl}"
                class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.author}</p>
                <button id="edit" class="btn btn-primary">Edit</button>
              </div>
            </div>
            </div>`
          

          
          // $html.on('click', '.delete-', function () {
          //   delete(data.id)
          // })

          $('#data-card').on('click', '#edit',function () {
            updateForm.show()
            updateForm(data.id)
          })
         

            
            $("#comics").append(html);
  
          });
        }
      }
    });

  function updateform(id) {
    updateForm.on('submit', function (e) {
      e.preventDefault()
      $.ajax({
        url: `${baseUrl}update`,
        type: "POST",
        data: {
          name: $('#name-register').val(),
          email: $('#email-register').val(),
          password: $('#password-register').val()
        }
        
      }).done(function (response) { //
        updateForm.hide()
        
      });
    });
  }

 
}

