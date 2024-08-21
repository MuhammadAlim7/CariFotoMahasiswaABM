document.addEventListener("DOMContentLoaded", function () {
  const formElements = {
    form: document.getElementById("formnpk"),
    submitButton: document.querySelector('button[type="submit"]'),
    resetButton: document.querySelector('button[type="reset"]'),
    inputs: Array.from(document.querySelectorAll('input[type="text"]')),
    imgTarget: document.getElementById("imgtarget"),
    npkTarget: document.getElementById("npktarget"),
    displayImg: document.getElementById("displayimg"),
  };

  const {
    form,
    inputs,
    submitButton,
    resetButton,
    imgTarget,
    npkTarget,
    displayImg,
  } = formElements;
  console.log(inputs);
  function cariMahasiswa() {
    let values = Array.from(inputs).map((input) => input.value || "");
    let npk = `${values[0]}.${values.slice(1, 5).join("")}.${values[5]}.${values.slice(6).join("")}`;
    let imgUrl = `https://scan.stie-mce.ac.id/photo/${npk}.jpg`;

    // Set the image source
    imgTarget.src = imgUrl;
    npkTarget.textContent = `${npk}`;
    displayImg.classList.remove("hidden");
    console.log(npk);

    // Add error handling for image loading
    imgTarget.onerror = () => {
      imgTarget.src = "../img/404.svg"; // Path to a default image
      npkTarget.textContent = "Not Found"; // Update text if needed
    };
  }

  function cekForm() {
    submitButton.disabled = !inputs.every((input) => input.value.trim());

    inputs.forEach((input, index) => {
      input.maxLength = 1;
      input.value =
        index === 0
          ? input.value
              .replace(/[^a-zA-Z]/g, "")
              .slice(0, 1)
              .toUpperCase()
          : input.value.replace(/[^0-9]/g, "").slice(0, 1);

      if (input.value.length === input.maxLength && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "" && index > 0) {
          inputs[index - 1].focus();
        }
      });
    });
  }

  inputs.forEach((element) => {
    element.addEventListener("input", cekForm);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    cariMahasiswa();
  });
  resetButton.addEventListener("click", function (event) {
    event.preventDefault();
    npkTarget.textContent = "";
    displayImg.classList.add("hidden");
    imgTarget.src = "";
    form.reset();
    cekForm();
  });
});
