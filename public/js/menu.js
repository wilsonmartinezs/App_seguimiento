var arrow = document.querySelectorAll(".arrow");
var sidebar = document.querySelector(".sidebar");
var sidebarBtn = document.querySelector(".bx-menu");

for (var i = 0; i < arrow.length; i++) {
    arrow[i].addEventListener("click", (e) => {
        let arrowParent = e.target.parentElement.parentElement;
        arrowParent.classList.toggle("showMenu");
    });
};

sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

window.onload = () => {
    sidebar.classList.add("close");
}



