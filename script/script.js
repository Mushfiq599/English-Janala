const creatingElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
    return(htmlElements.join(" "));
}





// fetching the urls
const loadlessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displaylessons(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach((btn) => btn.classList.remove("active"))
}

const loadLevelWord = (id) => {
    // console.log(id)
    const url = fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        // console.log(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive()
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            // console.log(clickBtn)
            clickBtn.classList.add("active");
            displayLevelWords(data.data)
        })
}

const loadWordDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res = await fetch(url);
    const detail = await res.json()
    displayWordDetail(detail.data)
}

const displayWordDetail = (word) => {
    // console.log(word)
    const modalContainer = document.getElementById("modal-container")
    modalContainer.innerHTML = `<div class="">
                <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p>${word.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p>${word.sentence}</p>
                </div>
                <div class=" ">
                    <h2 class="font-bold">Synonyms</h2>
                    <div class="">${creatingElements(word.synonyms)}</div>
                </div>`
    document.getElementById("my_modal_5").showModal();
}

const displayLevelWords = (words) => {
    // console.log (words)
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center col-span-full space-y-5">
        <img class="mx-auto" src="./assets/alert-error.png">
            <p class="text-2xl font-medium text-gray-300 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="font-bold text-3xl">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        return
    }
    for (let word of words) {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="bg-sky-100 rounded-xl shadow-sm text-center py-10 px-5 space-y-8">
            <h2 class="font-bold text-4xl text-black">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-medium text-xl text-black">Meaning /Pronounciation</p>
            <div class="text-[#18181B] font-bangla text-4xl font-semibold">"${word.meaning ? word.meaning : "শব্দার্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "উচ্চারন পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="w-14 h-14  bg-[#1A91FF10] hover:bg-[#1A91FF] border rounded-lg"><i class="fa-solid fa-circle-info"></i></i></button>
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
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
        `
        levelContainer.append(btnDiv);
    }
}








loadlessons();