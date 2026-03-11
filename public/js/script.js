// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("taxToggle");
  const prices = document.querySelectorAll(".price-value");
  const taxInfo = document.querySelectorAll(".tax-info");

  toggle.addEventListener("change", () => {

    prices.forEach((price) => {

      const basePrice = Number(price.dataset.price);

      if (isNaN(basePrice)) return;

      const taxPrice = Math.round(basePrice * 1.18);

      if (toggle.checked) {
        price.innerText = "₹ " + taxPrice.toLocaleString("en-IN");
      } else {
        price.innerText = "₹ " + basePrice.toLocaleString("en-IN");
      }

    });

    taxInfo.forEach((info) => {
      info.style.display = toggle.checked ? "inline" : "none";
    });

  });

});

const btn = document.getElementById("mobileSearchBtn");
const form = document.getElementById("mobileSearchForm");

btn.addEventListener("click", () => {
  form.classList.toggle("active");
});
