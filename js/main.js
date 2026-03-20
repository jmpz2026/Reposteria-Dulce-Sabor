const NORMAL_TEXT = document.querySelector('.normalText');
const PAPA = NORMAL_TEXT.querySelector('.papa');
console.log(NORMAL_TEXT);
console.log(PAPA);

console.log("----------");

Array.from(NORMAL_TEXT).forEach(text => {
    console.log(text.innerHTML);
})