const accordion = document.getElementsByClassName("team-container-title");
console.log(accordion);

for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function () {
        this.nextElementSibling.classList.toggle('active');
        this.classList.toggle('active');
    })
}