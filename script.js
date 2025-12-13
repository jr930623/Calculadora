const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

/* Formatea el número con puntos de miles */
function formatNumber(value) {
  if (value === "") return "";
  const parts = value.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return parts.join(".");
}

/* Limpia el formato para poder calcular */
function cleanNumber(value) {
  return value.replace(/\./g, "");
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let value = btn.textContent;

    if (value === "AC") {
      display.value = "";
      return;
    }

    if (value === "⌫") {
      display.value = display.value.slice(0, -1);
      return;
    }

    if (value === "=") {
      try {
        const result = eval(cleanNumber(display.value));
        display.value = formatNumber(result.toString());
      } catch {
        display.value = "Error";
        display.classList.add("error");
        setTimeout(() => display.classList.remove("error"), 400);
      }
      return;
    }

    /* Operadores no se formatean */
    if (["+", "-", "*", "/", "%"].includes(value)) {
      display.value += value;
      return;
    }

    /* Números con formato */
    const rawValue = cleanNumber(display.value + value);
    display.value = formatNumber(rawValue);
  });
});

