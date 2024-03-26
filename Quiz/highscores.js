const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Assuming your data is in the form of an array of objects with 'name' and 'score' properties

highScores.forEach(score => {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${score.name}</td>
      <td>${score.score}</td>
  `;
  highScoresList.appendChild(row);
});
