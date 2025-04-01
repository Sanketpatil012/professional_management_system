

let students= []

 document.addEventListener("DOMContentLoaded" , ()=>{
     fetch("./students.json").then((response) => response.json()).then((data) =>{ 
         students=data
         displayStudent(students)
 }).catch((err) =>  console.error("Error loading JSON:" , err))

 })

 function displayStudent(studentArray){
    const tbody=document.getElementById('studentTableBody')
    tbody.innerHTML=""

    studentArray.forEach((student) =>{
        const row = document.createElement('tr')
         row.innerHTML = `
             <td>${student.id} </td>
             <td> <img src="${student.img_src}"> ${student.first_name} ${student.last_name}</td>
             <td>${student.gender} </td>
             <td>${student.class} </td>
              <td>  ${student.marks} </td>
              <td> ${student.passing} </td>
              <td>${student.email} </td>
             `
          tbody.appendChild(row)
    })

 }
  
    function searchStudents() {
        const query = document.getElementById("searchInput").value.toLowerCase();
        const filteredStudents = students.filter(student => {
            const fullName = (student.first_name + " " + student.last_name).toLowerCase();
           return fullName.includes(query) || 
                   student.first_name.toLowerCase().includes(query) || 
                   student.last_name.toLowerCase().includes(query) || 
                   student.email.toLowerCase().includes(query);
        });
        displayStudent(filteredStudents);
    }


function sortAZ(){
      students.sort((a ,b) => (a.first_name +  a.last_name).localeCompare(b.first_name + b.last_name) )
      displayStudent(students)
}
function sortZA(){
     students.sort((a,b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name) )
     displayStudent(students)
}
function sortByMarks(){
     students.sort((a,b) => a.marks - b.marks)
     displayStudent(students)
}
function passingStudents(){
    students=  students.filter((element) => element.passing)
    displayStudent(students)
}

function sortByClass(){
    students.sort((a,b )=>  a.class - b.class)
     displayStudent(students)
}
function sortGender() {
    const males = students.filter(student => student.gender.toLowerCase() === "male");
    const females = students.filter(student => student.gender.toLowerCase() === "female");

    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "<tr><th colspan='8'>Male Students</th></tr>";
    males.forEach(student => appendRow(student, tbody));

    tbody.innerHTML += "<tr><th colspan='8'>Female Students</th></tr>";
    females.forEach(student => appendRow(student, tbody));
}

function appendRow(student, tbody) {
    const row = document.createElement("tr");
    row.innerHTML = `
        
             <td>${student.id} </td>
             <td> <img src="${student.img_src}"> ${student.first_name} ${student.last_name}</td>
             <td>${student.gender} </td>
             <td>${student.class} </td>
              <td>  ${student.marks} </td>
              <td> ${student.passing} </td>
              <td>${student.email} </td>
             
        
    `;
    tbody.appendChild(row);
}
