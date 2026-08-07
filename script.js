document.addEventListener("DOMContentLoaded", function () {
  var button = document.getElementById("pet-counter");
  var STORAGE_KEY = "petCounter";
  var count = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;

  button.textContent = "Pet the Octocat: " + count;

  button.addEventListener("click", function () {
    count += 1;
    localStorage.setItem(STORAGE_KEY, count);
    button.textContent = "Pet the Octocat: " + count;
  });
});
