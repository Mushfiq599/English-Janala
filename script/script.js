// fetching the urls
const url = () => {
fetch("https://openapi.programming-hero.com/api/levels/all")
.then((res) => res.json()) 
.then((json) => loadlessons(json.data));
};

const loadlessons = (lessons) => {
    // get parent element
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML="";
    for(let lesson of lessons){
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML= `
        <button class="btn btn-outline btn-primary "><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);
    }
}








url();