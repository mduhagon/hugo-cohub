window.addEventListener("DOMContentLoaded", function() {    
  var form = document.getElementById("contact-form");
  var button = document.getElementById("contact-form-button");
  var status = document.getElementById("contact-form-status");

  function success() {
    form.reset();
    button.style = "display: none ";
    status.innerHTML = "Danke! Das Kontaktformular wurde erfolgreich übermittelt.";
  }

  function error() {
    status.innerHTML = "Hoppla! Beim Absenden der Formulardaten ist ein Problem aufgetreten.";
  }

  // handle the form submission event
  if (form) {
    form.addEventListener("submit", function(ev) {
      ev.preventDefault();
      button.innerHTML = "Senden läuft...";
      grecaptcha.ready(function() {
        var siteKey = form.elements['captchaKey'].value;
        grecaptcha.execute(siteKey, {action: 'submit'}).then(function(token) {
            // Add your logic to submit to your backend server here.
            form.elements['token'].value = token;
            var data = new FormData(form);
            ajax(form.method, form.action, data, success, error);
        });
      });

    });
  }  
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(JSON.stringify(Object.fromEntries(data)));
}
