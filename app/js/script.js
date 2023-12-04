/*------------{Selecionar Elementos}------------*/
const matterSettings = {
  name: "",
  importance: 0,
  hours: 0,
  id: 0,
};

const inputValueMatter = document.querySelector("#name-matter");
const btnSave = document.querySelector(".container-btn-save button");
const selectElement = document.querySelector("#importance");
const containerListMatter = document.querySelector(".list-matter-added ul");
const selectTime = document.querySelector("#time");
const selectDay = document.querySelector("#days");
const btnGenerate = document.querySelector("#btn-generate");
const listMatte = document.querySelector(".list-matter");

let listMattes = [];

/*------------{Funções}------------*/

const clearForm = () => {
  inputValueMatter.value = "";
  selectElement.selectedIndex = 0;
};

const updateObjMatter = () => {
  matterSettings.name = inputValueMatter.value;

  const value = selectElement.value;

  switch (value) {
    case "low":
      matterSettings.importance = 1;
      break;
    case "moderate":
      matterSettings.importance = 2;
      break;
    case "high":
      matterSettings.importance = 3;
      break;
    case "very-high":
      matterSettings.importance = 4;
      break;
    case "critical":
      matterSettings.importance = 5;
      break;
    default:
      return;
  }
};

const validateMatter = (matter) => {
  return matter.name.trim() && matter.importance != 0 ? true : false;
};

const createMatter = (matter) => {
  const li = document.createElement("li");

  const spanName = document.createElement("span");
  spanName.innerText = `${matter.name}`;

  li.appendChild(spanName);

  const spanBtn = document.createElement("span");
  spanBtn.classList.add("btn-remove");

  spanBtn.innerHTML = `<i class="bi bi-x"></i>`;
  li.appendChild(spanBtn);

  spanBtn.addEventListener("click", () => {
    spanBtn.parentElement.remove();
  });

  containerListMatter.appendChild(li);
};

const gerarNumeroAleatorio = () => {
  const numeroAleatorio = Math.random();
  return numeroAleatorio;
};

function gerarCheckboxes() {
  const listMatte = document.querySelector(".list-matter");
  listMatte.innerHTML = ""; // Limpar o conteúdo antes de recriar

  for (let i = 0; i < listMattes.length; i++) {
    const matte = listMattes[i];

    const containerListMatter = document.createElement("div");
    containerListMatter.classList.add("matter");

    const checkboxesHTML = [];

    for (let j = 0; j < matte.hours; j++) {
      // Usar o índice 'i' e 'j' como parte do ID para garantir a unicidade
      const id = `checkbox_${i}_${j}`;

      checkboxesHTML.push(`
        <input type="checkbox" id="${id}">
        <label for="${id}"></label>
      `);
    }

    containerListMatter.innerHTML = `
      <span class="name">${matte.name}</span>
      <div class="checklists">
        <form>
          ${checkboxesHTML.join("")}
        </form>
      </div>
    `;

    listMatte.appendChild(containerListMatter);
  }
}

const calculateHours = () => {
  const total = +selectTime.value * +selectDay.value;
  console.log(total);
  let id = 0;

  const sumImportance = listMattes.reduce(
    (totalImportance, matter) => (totalImportance += matter.importance),
    0
  );

  const valueFinal = total / sumImportance;

  listMattes.map((matter) => {
    matter.hours = Math.round(matter.importance * valueFinal);
  });
};

/*------------{Eventos}------------*/
btnSave.addEventListener("click", (e) => {
  e.preventDefault();

  updateObjMatter();

  // Criar uma cópia independente do objeto matterSettings usando spread operator
  const matterCopy = { ...matterSettings };

  if (!validateMatter(matterCopy)) {
    console.log("Erro: Os campos não podem está vazios");
    return;
  }

  createMatter(matterCopy);

  listMattes.push(matterCopy);

  clearForm();
});

btnGenerate.addEventListener("click", (e) => {
  e.preventDefault();

  calculateHours();

  // console.log(listMattes);
  gerarCheckboxes();
});
