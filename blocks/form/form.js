export default function decorate(block) {
  console.log("form decorate", block);
  const input = block;
  const opts = {
    path: "form",
  };

  block.classList.add("form", "form-block");
  const textField = document.createElement("input");
  textField.setAttribute("type", "email");
  textField.setAttribute("placeholder", "Enter your email");

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Submit";

  block.appendChild(textField);
  block.appendChild(submitButton);
}
