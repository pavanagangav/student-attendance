let students=JSON.parse(localStorage.getItem('students')) || []
function addStudent(){
    let name=document.getElementById('StudentName').value
    if(name.trim()===''){
        alert("Please Enter valid Student name")
        return
    }
    students.push({name,attendance:"Absent"})
    localStorage.setItem('students',JSON.stringify(students))
    document.getElementById('StudentName').value=''
    renderTable()
}

function markAttendance(index,status){
    students[index].attendance=status
    localStorage.setItem('students',JSON.stringify(students))
    renderTable()
}

function editStudent(index){
    let newName=prompt("Enter new name :",students[index].name)
    if(newName&&newName.trim()!==''){
        students[index].name=newName
        localStorage.setItem('students',JSON.stringify(students))
        renderTable()
    }
}

function removeStudent(index){
    if(confirm("Are you sure delete :")){
        students.splice(index,1)
        localStorage.setItem('students',JSON.stringify(students))
renderTable()
    }
}

function renderTable(){
    let tableBody=document.getElementById('StudentTable')
    tableBody.innerHTML=""
    students.forEach((student,index)=>{
        tableBody.innerHTML+=`
        <tr>
        <td>${index+1}</td>
        <td>${student.name}</td>
        <td>
        <button class='btn btn-success' onclick="markAttendance(${index},'Present')">Present</button>
        <button class='btn btn-primary' onclick="markAttendance(${index},'Absent')">Absent</button>
        </td>
          <td>
        <button class='btn btn-warning' onclick="editStudent(${index})">Edit</button>
        <button class='btn btn-danger' onclick="removeStudent(${index})">Delete</button>
        </td>
        </tr>
        `
    })
    updateSummary()

}

function filterAttendence(status){
    let tableBody=document.getElementById('StudentTable')
    tableBody.innerHTML=''
    students.filter(student=>student.attendance===status).forEach((student,index)=>{
        tableBody.innerHTML+=`
        <tr>
        <td>${index+1}</td>
        <td>${student.name}</td>
        <td>${student.attendance}</td>
        </tr>
        `
    })
}
function showAll(){
    renderTable()
}

function updateSummary(){
    document.getElementById('totalStudents').innerText=students.length
    document.getElementById('presentCount').innerText=students.filter(s=>s.attendance==='Present').length
    document.getElementById('absentCount').innerText=students.filter(s=>s.attendance==='Absent').length
}


function clearAll(){
    if(confirm("Are you sure clear data..")){
        students=[]
        localStorage.removeItem('students')
        renderTable()
    }
}
//document.addEventListener('DOMContentLoaded',renderTable)

