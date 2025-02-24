document.addEventListener("DOMContentLoaded", () => {
    fetch("grossing_films.json")
        .then(response => response.json())
        .then(data => {
            displayFilms(data);
            document.getElementById("search").addEventListener("input", () => filterFilms());
        });
});

function displayFilms(films) {
    const tbody = document.querySelector("#filmTable tbody");
    tbody.innerHTML = "";
    films.forEach(film => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><a href="${film.url}" target="_blank">${film.title}</a></td>
            <td>${film.release_year}</td>
            <td>${film.director}</td>
            <td>${film.box_office}</td>
            <td>${film.country}</td>
        `;
        tbody.appendChild(row);
    });
}

function filterFilms() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#filmTable tbody tr");
    rows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        row.style.display = title.includes(searchValue) ? "" : "none";
    });
}

// Keeps track of sort order for each column
let sortOrder = {};

function sortTable(columnIndex) {
    const tbody = document.querySelector("#filmTable tbody");
    let rows = Array.from(tbody.rows);
    const isAscending = !sortOrder[columnIndex];
    sortOrder[columnIndex] = isAscending;

    rows.sort((a, b) => {
        let valA = a.cells[columnIndex].textContent.trim();
        let valB = b.cells[columnIndex].textContent.trim();

        return isAscending ? valA.localeCompare(valB) 
                           : valB.localeCompare(valA);
    });

    document.querySelectorAll("th").forEach(th => th.classList.remove("sorted-asc", "sorted-desc"));
    document.querySelectorAll("th")[columnIndex].classList.add(isAscending ? "sorted-asc" : "sorted-desc");

    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}