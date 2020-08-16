(function () {
  const cols = document.querySelector('.cols')
  const rows = document.querySelector('.rows')
  const result = document.querySelector('.result')
  const btn = document.querySelector('.generate')
  btn.addEventListener("click", function () {
    result.innerHTML = '';
    let template = [];
    for (let i = 0; i < rows.value; i++) {
      template.push(1)
      console.log(rows.value)
    }
    console.log(template);
    result.appendChild(document.createTextNode(rows.value))
  })
}())
