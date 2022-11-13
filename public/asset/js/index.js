'use strict';

//*Selectors
const getCoursesBtn = document.querySelector('.getCorsesBtn');
const coursesTable = document.querySelector('.styled-table')
let courses = [];
const refreshBtn= document.querySelector('.refreshBtn')
refreshBtn.addEventListener('click', ()=>{
  location.reload();
})         



//*Functions
window.addEventListener('DOMContentLoaded', async (e) => {
  console.log('Loading content started');
  try {
    const response = await fetch('http://127.0.0.1:5000/api/courses')
    courses = await response.json()

    let headers = ['Id', 'Course Name', 'Description', 'Duration', 'Price','Actions'];
    let html = `<thead>
    <tr>`;
    await headers.forEach(element => {
      html += `<th>${element}</th>`
    });
    html += `</tr>
</thead>
<tbody>`
    coursesTable.innerHTML = html
    //*Create table
    await courses.forEach(element => {
      html += `<tr class='tableRowParent${element.Id}'><td>${element.Id}</td><td>${element.courseName}</td><td>${element.description}</td><td>${element.duration}</td><td>${element.price}$</td><td class="btnCell btnCell${element.Id}"><button type="button"class="editBtn"><i class="fa-regular fa-pen-to-square"></i></button><button type="button" class="deleteBtn" id='${element.Id}'><i class="fa-solid fa-trash"></i></i></button></td></tr>`
    })
    coursesTable.innerHTML = html


    deleteRowFunction()
    editRowFunction()
  } catch (err) {
    console.log(err);
  } finally {}

});



const deleteRowFunction = () => {
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  const popup = document.querySelector('.popup');
  const responseText = document.querySelector('.responseText')

  deleteBtn.forEach((element) => {
    element.addEventListener('click', async (element) => {
      const elementId = element.target.id
      const response = await fetch(`http://127.0.0.1:5000/api/courses/${elementId}`, {
        method: 'DELETE'
      })

      const deleteConfirm = await response.json()

      //* <!-- Delete Confirm -->
      popup.style.display = "block"
      setTimeout(() => {
        popup.style.display = "none"
        location.reload();
      }, 3000);


    })
  })
}

const editRowFunction = () => {
  const editBtn = document.querySelectorAll('.editBtn');
  const responseText = document.querySelector('.responseText');
  editBtn.forEach((element) => {
    element.addEventListener('click', ((e) => {
      const id = element.parentNode.parentNode.firstChild.textContent
      console.log(id);
      const tableRowParent = document.querySelector(`.tableRowParent${id}`);
      tableRowParent.childNodes.forEach((child)=>{
        child.setAttribute("contenteditable", "true");
        child.innerHTML+=` <span>*Edit</span>`
      })
      const actionsTableData = document.querySelector(`.btnCell${id}`);
      actionsTableData.innerHTML =`<button type="button"class="saveBtn"><i class="fa-regular fa-floppy-disk"></i></button><button type="button" class="deleteBtn" id='${id}'><i class="fa-solid fa-trash"></i></i></button>` 
tableRowParent.classList.add("active-row")
      saveRowFunction()
    }))
  })
}




const saveRowFunction = () => {
  const saveBtn = document.querySelectorAll('.saveBtn');
  saveBtn.forEach((element) => {
    element.addEventListener('click', ((e) => {
      console.log(e.target);
      const courseName = document.querySelector('.courseName').value;
      console.log(courseName);
    }))
  })
}