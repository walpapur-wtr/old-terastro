$(document).ready(function(){
    $('.header_burger').click(function(event){
        $('.header_burger, .header_menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});


const slidersOne = document.querySelectorAll(".slider_one .slide");
const slidersTwo = document.querySelectorAll(".slider_two .slide");
const slidersTree = document.querySelectorAll(".slider_tree .slide");
const slidersFour = document.querySelectorAll(".slider_four .slide");
const slidersFive = document.querySelectorAll(".slider_five .slide");
const slidersAstrophoto = document.querySelectorAll(".slider_astrophoto .slide");
// *******************
let currentSlideOne = 0;
let currentSlideTwo = 0;
let currentSlideTree = 0;
let currentSlideFour = 0;
let currentSlideFive = 0;
let currentSlideAstrophoto = 0;

function showSlideOne(slideIndex) {
    slidersOne.forEach((slide) => slide.classList.remove("active"));
    slidersOne[slideIndex].classList.add("active");
}

function showSlideTwo(slideIndex) {
    slidersTwo.forEach((slide) => slide.classList.remove("active"));
    slidersTwo[slideIndex].classList.add("active");
}

function showSlideTree(slideIndex) {
    slidersTree.forEach((slide) => slide.classList.remove("active"));
    slidersTree[slideIndex].classList.add("active");
}

function showSlideFour(slideIndex) {
    slidersFour.forEach((slide) => slide.classList.remove("active"));
    slidersFour[slideIndex].classList.add("active");
}

function showSlideFive(slideIndex) {
    slidersFive.forEach((slide) => slide.classList.remove("active"));
    slidersFive[slideIndex].classList.add("active");
}

function showSlideAstrophoto(slideIndex) {
    slidersAstrophoto.forEach((slide) => slide.classList.remove("active"));
    slidersAstrophoto[slideIndex].classList.add("active");
}


// **************************************

function nextSlideOne() {
    currentSlideOne = (currentSlideOne + 1) % slidersOne.length;
    showSlideOne(currentSlideOne);
}

function nextSlideTwo() {
    currentSlideTwo = (currentSlideTwo + 1) % slidersTwo.length;
    showSlideTwo(currentSlideTwo);
}

function nextSlideTree() {
    currentSlideTree = (currentSlideTree + 1) % slidersTree.length;
    showSlideTree(currentSlideTree);
}

function nextSlideFour() {
    currentSlideFour = (currentSlideFour + 1) % slidersFour.length;
    showSlideFour(currentSlideFour);
}

function nextSlideFive() {
    currentSlideFive = (currentSlideFive + 1) % slidersFive.length;
    showSlideFive(currentSlideFive);
}

function nextSlideAstrophoto() {
    currentSlideAstrophoto = (currentSlideAstrophoto + 1) % slidersAstrophoto.length;
    showSlideAstrophoto(currentSlideAstrophoto);
}


// ********************************

function prevSlideOne() {
    currentSlideOne = (currentSlideOne - 1 + slidersOne.length) % slidersOne.length;
    showSlideOne(currentSlideOne);
}

function prevSlideTwo() {
    currentSlideTwo = (currentSlideTwo - 1 + slidersTwo.length) % slidersTwo.length;
    showSlideTwo(currentSlideTwo);
}

function prevSlideTree() {
    currentSlideTree = (currentSlideTree - 1 + slidersTree.length) % slidersTree.length;
    showSlideTree(currentSlideTree);
}

function prevSlideFour() {
    currentSlideFour = (currentSlideFour - 1 + slidersFour.length) % slidersFour.length;
    showSlideFour(currentSlideFour);
}

function prevSlideFive() {
    currentSlideFive = (currentSlideFive - 1 + slidersFive.length) % slidersFive.length;
    showSlideFive(currentSlideFive);
}

function prevSlideAstrophoto() {
    currentSlideAstrophoto = (currentSlideAstrophoto - 1 + slidersAstrophoto.length) % slidersAstrophoto.length;
    showSlideAstrophoto(currentSlideAstrophoto);
}


// *************************************

showSlideOne(currentSlideOne);
showSlideTwo(currentSlideTwo);
showSlideTree(currentSlideTree);
showSlideFour(currentSlideFour);
showSlideFive(currentSlideFive);
// showSlideAstrophoto(currentSlideAstrophoto);

// *****************************************

setInterval(nextSlideOne, 2000);
setInterval(nextSlideTwo, 2000);
setInterval(nextSlideTree, 2000);
setInterval(nextSlideFour, 2000);
setInterval(nextSlideFive, 2000);
setInterval(nextSlideAstrophoto, 2000);

///////////////////////////////////