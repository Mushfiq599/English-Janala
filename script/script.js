// fetching the urls
const loadlessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displaylessons(json.data));
};
const loadLevelWord = (id) => {
    // console.log(id)
    const url = fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    // console.log(url)
    .then((res) => res.json())
    .then((data) => displayLevelWords(data.data))
}

const displayLevelWords = (words) => {
    // console.log (words)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML="";
    for(let word of words) {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-sky-100 rounded-xl shadow-sm text-center py-10 px-5 space-y-8">
            <h2 class="font-bold text-4xl text-black">${word.word}</h2>
            <p class="font-medium text-xl text-black">Meaning /Pronounciation</p>
            <div class="text-[#18181B] font-bangla text-4xl font-semibold">"${word.meaning} / ${word.pronunciation}"</div>
            <div class="flex justify-between items-center">
                <button class="w-14 h-14  bg-[#1A91FF10] hover:bg-[#1A91FF] border rounded-lg"><i class="fa-solid fa-circle-info"></i></i></button>
                <button class="w-14 h-14  bg-[#1A91FF10] hover:bg-[#1A91FF] border rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card)
    };

}

const displaylessons = (lessons) => {
    // get parent element
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";
    for (let lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary "><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);
    }
}








loadlessons();