async function getResult() {

    const usn = document.getElementById("usn").value;

    const response = await fetch(
        `https://student-result-portal-1-8rze.onrender.com/result/${usn}`
    );

    const data = await response.json();

    // show marks card
    document.querySelector(".container").style.display 
    = "block";

    // student details
    document.getElementById("student-usn").innerText = data.usn;
    document.getElementById("student-name").innerText = data.name;
    document.getElementById("semester").innerText = data.semester;

    // table body
    let tableRows = "";

    data.subjects.forEach(subject => {

        let result = subject.marks >= 35 ? "P" : "F";

        tableRows += `
        <tr>
            <td>${subject.subjectCode}</td>
            <td>${subject.subjectName}</td>
            <td>${subject.marks}</td>
            <td>${result}</td>
        </tr>
        `;
    });

    document.getElementById("marks-body").innerHTML = tableRows;
}
