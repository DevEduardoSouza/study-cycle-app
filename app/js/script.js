/*------------{Selecionar Elementos}------------*/
const matterSettings = {
  name: '',
  importance: 0 
}

const inputValueMatter = document.querySelector('#name-matter');
const btnSave = document.querySelector('.container-btn-save button');
const selectElement = document.querySelector("#importance");
const containerListMatter = document.querySelector(".list-matter-added ul");
let btnRemoveMatter;
let matter;

/*------------{Funções}------------*/

const clearForm = () =>{
  inputValueMatter.value = '';
  selectElement.selectedIndex = 0;
} 


const updateObjMatter = () => {
  matterSettings.name = inputValueMatter.value;

  const value = selectElement.value; 
  console.log(value);

  // selectElement.style = `
  //       border: 0px solid red;
  //   `;
  
  
  switch (value) {
    case 'low':
      matterSettings.importance = 1;
      break;
    case 'moderate':
      matterSettings.importance = 2;
      break;
    case 'high':
      matterSettings.importance = 3;
      break;
    case 'very-high':
      matterSettings.importance = 4;
      break;
    case 'critical':
      matterSettings.importance = 5;
      break;
    default:
      // selectElement.style = `
      //   border: 1px solid red;
      // `;
      return;
  }
}


const createMatter = (matter) => {

  if(matter.name && matter.importance != 0){

    const li = document.createElement('li');
    

    const spanName = document.createElement('span');
    spanName.innerText = `${matter.name}`;

    li.appendChild(spanName);

    const spanBtn = document.createElement('span');
    spanBtn.classList.add('btn-remove');

    spanBtn.innerHTML= `<i class="bi bi-x"></i>`;
    li.appendChild(spanBtn);

    spanBtn.addEventListener('click', ()=>{
      spanBtn.parentElement.remove();
    });

    containerListMatter.appendChild(li);
  }else return li;

}



/*------------{Eventos}------------*/
btnSave.addEventListener(('click'), (e)=>{
  e.preventDefault();

  updateObjMatter();
  createMatter(matterSettings);
  console.log(matterSettings);
  clearForm();
})


