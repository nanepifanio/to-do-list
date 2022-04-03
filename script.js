const $ = document.querySelector.bind(document);
const input = $("#texto");
let storageKey = 0;

const setLocalStorage = (lista, text) => (localStorage[lista] = text);

const saveLocalStorage = () => {
  const localStorageKeys = Object.keys(localStorage);
  if (localStorageKeys.length) {
    const keyNumberList = localStorageKeys.map((key) =>
      Number(key.substr(-1, 1))
    );
    storageKey = Math.max(...keyNumberList);
    localStorageKeys.forEach((key) => {
      const cloneList = $(".lista").cloneNode(true);
      cloneList.querySelector(".tarefa").innerHTML = localStorage[key];
      cloneList.setAttribute("data-lista", `${key}`);
      $(".container").appendChild(cloneList);
    });
  }
};

saveLocalStorage();

const listar = () => {
  const text = input.value;
  input.value = "";
  if (text) {
    const cloneList = $(".lista").cloneNode(true);
    cloneList.querySelector(".tarefa").innerText = text;
    cloneList.setAttribute("data-lista", `lista${++storageKey}`);
    setLocalStorage(cloneList.getAttribute("data-lista"), text);
    $(".container").appendChild(cloneList);
  }
};

input.addEventListener("keypress", (event) => {
  const keyPressed = event.key;
  if (keyPressed === "Enter") listar();
});

const feito = (element) => {
  const paragraph = element.parentElement.previousElementSibling;
  paragraph.innerHTML = `<del>${paragraph.innerText}</del>`;
  const paragraphDel = paragraph.parentElement.getAttribute("data-lista");
  localStorage[paragraphDel] = paragraph.innerHTML;
};

const apagar = (element) => {
  const removeLista = element.parentElement.parentElement;
  const removedLista = removeLista.getAttribute("data-lista");
  delete localStorage[removedLista];
  removeLista.remove();
};

document.addEventListener("click", (event) => {
  const element = event.target;
  if (element.classList.contains("listar")) listar();
  if (element.classList.contains("feito")) feito(element);
  if (element.classList.contains("apagar")) apagar(element);
});
