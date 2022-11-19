'use strict';

//*Selectors
const getCoursesBtn = document.querySelector('.getCorsesBtn');
const coursesTable = document.querySelector('.styled-table')
let courses = [];
const refreshBtn = document.querySelector('.refreshBtn')
refreshBtn.addEventListener('click', () => {
  location.reload();
})
const addNewCourseBtn = document.querySelector('.addNewCourseBtn');

//*Functions
window.addEventListener('DOMContentLoaded', async (e) => {
  console.log('Loading content started');
  try {
    const response = await fetch('http://127.0.0.1:5000/api/courses')
    courses = await response.json()

    let headers = ['Id', 'Course Name', 'Description', 'Duration', 'Price', 'Actions'];
    let html = `<thead>
    <tr>`;

    headers.forEach(element => {
      html += `<th>${element}</th>`;
    });
    html += `</tr>
</thead>
<tbody>`
    coursesTable.innerHTML = html
    //*Create table
    await courses.forEach(element => {
      html += `<tr class='tableRowParent${element.Id}'><td class='courseId' name='Id'>${element.Id}</td><td name='courseName'>${element.courseName}</td><td name='description'>${element.description}</td><td name='duration'>${element.duration}</td><td name='price'>${element.price}$</td><td class="btnCell btnCell${element.Id}"><button type="button"class="editBtn"><i class="fa-regular fa-pen-to-square"></i></button><button type="button" class="deleteBtn" id='${element.Id}'><i class="fa-solid fa-trash"></i></i></button></td></tr>`
    })
    coursesTable.innerHTML = html

    deleteRowFunction()
    editRowFunction()

  } catch (err) {
    console.log(err);
  } finally {


  }

});



const deleteRowFunction = () => {
  const deleteBtn = document.querySelectorAll('.deleteBtn');
  const popup = document.querySelector('.popup');
  const responseText = document.querySelector('.responseText')

  deleteBtn.forEach((element) => {

    element.addEventListener('click', async (ele) => {
      const id = element.parentNode.parentNode.firstChild.textContent

      const response = await fetch(`http://127.0.0.1:5000/api/courses/${id}`, {
        method: 'DELETE'
      })

      const deleteConfirm = await response.json()
      responseText.innerHTML = deleteConfirm.message
      //* <!-- Delete Confirm -->
      popup.style.display = "block"
      setTimeout(() => {
        popup.style.display = "none"
        location.reload();
      }, 3000);


    })
  })
  return
}

const editRowFunction = () => {
  const editBtn = document.querySelectorAll('.editBtn');
  const responseText = document.querySelector('.responseText');
  editBtn.forEach((element) => {
    element.addEventListener('click', ((e) => {
      const id = element.parentNode.parentNode.firstChild.textContent
      const tableRowParent = document.querySelector(`.tableRowParent${id}`);
      tableRowParent.childNodes.forEach((child) => {
        if (child.classList.value !== 'courseId') {
          child.setAttribute("contenteditable", "true");
          child.innerHTML += `<span>*Edit</span>`
        } else {
          child.setAttribute("contenteditable", "false");
        }

      })
      const actionsTableData = document.querySelector(`.btnCell${id}`);
      actionsTableData.innerHTML = `<button type="button"class="saveBtn"><i class="fa-regular fa-floppy-disk"></i></button><button type="button" class="deleteBtn" id='${id}'><i class="fa-solid fa-trash"></i></i></button>`
      tableRowParent.classList.add("active-row")
      saveRowFunction()
      deleteRowFunction()

    }))
  })
}




const saveRowFunction = async () => {
  const saveBtn = document.querySelectorAll('.saveBtn');
  const data = {}
  saveBtn.forEach((element) => {
    element.addEventListener('click', ((e) => {
      // add popup to authorized the change

      const id = element.parentNode.parentNode.firstChild.textContent
      const tableRowParent = document.querySelector(`.tableRowParent${id}`);
      tableRowParent.childNodes.forEach(((child) => {
        if (child.textContent.includes('*Edit')) {
          child.textContent = child.textContent.replace('*Edit', "")
        }
        if (child.textContent !== "") {
          data[child.getAttribute("name")] = child.textContent
        }

      }))
      console.log(data);
      sendUpdateReq(data)
    }))
  })


}

const sendUpdateReq = async (data) => {
  console.log(data);
  console.log(data.Id);
  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  let response = await fetch(`http://localhost:5000/api/courses/${data.Id}`, options)
  const server = await response.json()
  console.log(server.message);

  //* <!-- Update Confirm -->
  const popup = document.querySelector('.popup');
  const responseText = document.querySelector('.responseText')
  responseText.innerHTML = server.message
  popup.style.display = "block"
  setTimeout(() => {
    popup.style.display = "none"
    location.reload();
  }, 3000);
}



const createNewCourseFunction = (e) => {
  console.log('Button Clicked');
  const tableBodyEle = document.querySelector('tbody');
  const firstTableRow = document.querySelector('tbody').firstChild
  const newTableRow = document.createElement('tr');
  newTableRow.innerHTML = `<td class='courseId' name='Id'></td><td name='courseName'>UX/UI</td><td name='description'>UX/UI, to interpret it. While using Python, it is easy to debug the code as there are no developing steps, and the cycle to test debugging is fast as well. Python is one of the</td><td name='duration'>6 months</td><td name='price'>450</td><td class="btnCell"><button type="button"class="saveBtn"><i class="fa-regular fa-floppy-disk"></i></button><button type="button" class="deleteBtn"><i class="fa-solid fa-trash"></i></i></button></td>`;
  newTableRow.className = 'tableRowParent';
  firstTableRow.parentNode.insertBefore(newTableRow, firstTableRow)
  newTableRow.classList.add("active-row")
  //* Need to get Auto increment from table
  //* Validation for TextContent before sending data
  
  newTableRow.childNodes.forEach((child) => {
    if (child.classList.value !== 'courseId' && child.classList.value !== 'btnCell') {
      child.setAttribute("contenteditable", "true");
      child.innerHTML += `<span>*Edit</span>`
    } else {
      child.setAttribute("contenteditable", "false");
    }

  })
  saveNewRowFunction()

  //* add Cancel Editing
}


const saveNewRowFunction = async () => {
  const saveBtn = document.querySelector('.saveBtn');
  const data = {}
  saveBtn.addEventListener('click', ((e) => {
    const tableRowParent = document.querySelector('.tableRowParent');
    tableRowParent.childNodes.forEach(((child) => {
      if (child.textContent.includes('*Edit')) {
        child.textContent = child.textContent.replace('*Edit', "")
      }
      if (child.textContent !== "") {
        data[child.getAttribute("name")] = child.textContent
      }

    }))
    console.log(data);
    sendPostReq(data)
  }))
}



const sendPostReq = async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  };

  let response = await fetch(`http://localhost:5000/api/courses`, options)
  const server = await response.json()
  console.log(server.message);

  //* <!-- Create new course Confirm -->
  const popup = document.querySelector('.popup');
  const responseText = document.querySelector('.responseText')
  responseText.innerHTML = server.message
  popup.style.display = "block"
  setTimeout(() => {
    popup.style.display = "none"
    location.reload();
  }, 3000);
}

addNewCourseBtn.addEventListener('click', createNewCourseFunction)