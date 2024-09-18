import CryptoJS from  'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.js';

$(document).ready(function(){
  var link = $('<link>',{
    rel:'stylesheet',
    href:'http://localhost:3000/api/static/main.css',
    crossorigin:'anonymous'
});
$('head').append(link);


  $('#app').html(`
    <form id="credit-card-form" class="form-container">
      <input type="text" id="card-number" class="form-input" placeholder="Card Number">
      <input type="text" id="expiration-date" class="form-input" placeholder="MM/YY">
      <input type="text" id="cvv" class="form-input" placeholder="CVV">
      <input type="text" id="cardholder-name" class="form-input" placeholder="Cardholder Name">
      <button class='btn-submit-form' type="submit">Submit</button>
    </form>
    <div class='message-error'></div>
    <img class='img-test' />
  `);

 

  function validateCardNumber(cardNumber) {
      return /^\d{16}$/.test(cardNumber);
  }

  function validateExpirationDate(expirationDate) {
      if (!/^\d{2}\/\d{2}$/.test(expirationDate)) return false;
      const [month, year] = expirationDate.split('/').map(Number);
      const now = new Date();
      const currentYear = now.getFullYear() % 100;
      const currentMonth = now.getMonth() + 1;
      return (year > currentYear || (year === currentYear && month >= currentMonth));
  }

  function validateCVV(cvv) {
      return /^\d{3}$/.test(cvv);
  }

  function validateCardholderName(name) {
      return name.trim() !== "";
  }

  $('#credit-card-form').submit(function(event){
      event.preventDefault();
      let isValid = true;
      let message = "";

      const cardNumber = $('#card-number').val();
      const expirationDate = $('#expiration-date').val();
      const cvv = $('#cvv').val();
      const cardholderName = $('#cardholder-name').val();

      if (!validateCardNumber(cardNumber)) {
          isValid = false;
          message += "<p class='error'>Card number must be 16 digits.</p>";
      }

      if (!validateExpirationDate(expirationDate)) {
          isValid = false;
          message += "<p class='error'>Expiration date must be in MM/YY format and not in the past.</p>";
      }

      if (!validateCVV(cvv)) {
          isValid = false;
          message += "<p class='error'>CVV must be 3 digits.</p>";
      }

      if (!validateCardholderName(cardholderName)) {
          isValid = false;
          message += "<p class='error'>Cardholder name is required.</p>";
      }

      $('.message-error').html(message);
      $('.error').css('color', 'red');

      if (isValid) {
          $('#credit-card-form')[0].reset();
          $('#app').append(`
            <div class="card-info">
              <p>Card Number: ${cardNumber}</p>
              <p>Expiration Date: ${expirationDate}</p>
              <p>Cardholder Name: ${cardholderName}</p>
            </div>
          `);
      }
  });

  $('.img-test').attr('src', 'http://localhost:3000/api/static/goku.jpeg');
});