const searchDiv = document.getElementsByClassName("search-container")
document.addEventListener('DOMContentLoaded', function () {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(navItem => navItem.style.backgroundColor = "");
            this.style.backgroundColor = "green";
        });
    });
});

