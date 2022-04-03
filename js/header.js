// EVENT LISTENERS
document.getElementById("nav-close-btn").addEventListener("click", closeNav);


function openNav() {
    document.getElementById("nav-sidebar").style.width = "250px";
  }
  
function closeNav() {
  document.getElementById("nav-sidebar").style.width = "0";
}