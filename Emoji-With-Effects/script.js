/* 
Features:
- Blinking Eyes
- Color Changing Eyes
- Eyes Follow Mouse
- Eyes Glow Change
- Teeth Show on Mouth Hover
- Expression Change on Keydown
*/


const face = document.getElementById('face');
const pupils = document.querySelectorAll('.pupil');
const leftEye = document.querySelector('.leftEye');
const rightEye = document.querySelector('.rightEye');

const move = (event) => {
    let x = (event.clientX / (window.innerWidth / 110));
    let y = (event.clientY / 7);
    let fX = (event.clientX / 20);
    let fY = (event.clientY / 20);

    face.style.transform = `translate(${fX}px, ${fY}px)`;
    document.body.style.backgroundColor = `rgba(${y}, ${fY}, 50%)`;
    
    for(const pupil of pupils){
        pupil.style.transform = `translate(${x}px, ${y}px)`;
    }
}

window.addEventListener("mousemove", move);

function blinkEyes() {
    // Generate a random delay for blinking between 2 and 6 seconds
    const blinkDelay = Math.random() * (6000 - 2000) + 2000;

    // Close the eyes after a short delay
    setTimeout(() => {
        leftEye.style.height = '5%';
        rightEye.style.height = '5%';
    }, 100);

    // Open the eyes after a short duration
    setTimeout(() => {
        leftEye.style.height = '45%';
        rightEye.style.height = '45%';

        // Call the function again after the blink delay
        setTimeout(blinkEyes, blinkDelay);
    }, 300);
}

// Start blinking initially
blinkEyes();

const mouth = document.querySelector('.mouth');

// Function to make the mouth open
function openMouth() {
    mouth.style.height = "25%";
}

// Function to reset the mouth to its default position
function resetMouth() {
    mouth.style.height = '15%';
}

// Event listener for click event to trigger opening mouth
mouth.addEventListener('mouseover', openMouth);

// Event listener for mouseout event to reset mouth position
mouth.addEventListener('mouseout', resetMouth);

let i = 0;

// Function to change eye color
function changeEyeColor() {
    const colors = ['#00ff00', '#ffff00', '#ffffff']; // List of colors
    const randomColor = colors[i];
    i++;
    i = i % colors.length;
    leftEye.style.backgroundColor = randomColor;
    rightEye.style.backgroundColor = randomColor;
}

// Event listener for click event to change eye color
leftEye.addEventListener('click', changeEyeColor);
rightEye.addEventListener('click', changeEyeColor);

// Function to add glow effect on mouseover
function addGlow() {
    leftEye.classList.add('glow');
    rightEye.classList.add('glow');
}

// Function to remove glow effect on mouseout
function removeGlow() {
    leftEye.classList.remove('glow');
    rightEye.classList.remove('glow');
}

// Event listener for mouseover event to add glow effect
leftEye.addEventListener('mouseover', addGlow);
rightEye.addEventListener('mouseover', addGlow);

// Event listener for mouseout event to remove glow effect
leftEye.addEventListener('mouseout', removeGlow);
rightEye.addEventListener('mouseout', removeGlow);


// Function to change mouth expression to smile
function smile() {
    mouth.classList.remove('frown', 'watch');
    mouth.classList.add('smile');
}

// Function to change mouth expression to frown
function frown() {
    mouth.classList.remove('smile', 'watch');
    mouth.classList.add('frown');
}

// Function to change mouth expression to watch
function watch() {
    mouth.classList.remove('smile', 'frown');
    mouth.classList.add('watch');
}

// Event listener for keydown event to change mouth expression
document.addEventListener('keydown', function(event) {
    if (event.key === 's') {
        smile();
    } else if (event.key === 'f') {
        frown();
    } else if (event.key === 'w') {
        watch();
    }
    // Add more conditions as needed
});
