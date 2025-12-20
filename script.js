const octocat = document.getElementById('octocat');
const text = document.querySelector('p');

//  Make the Octocat "jump" when clicked
octocat.addEventListener('click', () => {
  octocat.style.transition = "transform 0.1s";
  octocat.style.transform = "scale(1.2) translateY(-20px)";
  
  // Change text color temporarily
  text.style.color = "#4078c0"; 
  
  setTimeout(() => {
    octocat.style.transform = "scale(1) translateY(0)";
    text.style.color = "black";
  }, 200);
});

//  Add a hover effect that tilts the image
octocat.addEventListener('mousemove', (e) => {
  const rect = octocat.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  octocat.style.transform = `perspective(500px) rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;
});

// Reset tilt when mouse leaves
octocat.addEventListener('mouseleave', () => {
  octocat.style.transform = "rotateX(0deg) rotateY(0deg)";
});
