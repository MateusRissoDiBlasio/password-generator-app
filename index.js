const passInput = document.getElementById('passInput');
const slider = document.getElementById('rangeSlider');
const passLength = document.getElementById('passLength');
const generateBtn = document.getElementById('generateBtn');

const lowercaseCheckbox = document.getElementById('lowercaseCheckbox');
const uppercaseCheckbox = document.getElementById('uppercaseCheckbox');
const numbersCheckbox = document.getElementById('numbersCheckbox');
const symbolsCheckbox = document.getElementById('symbolsCheckbox');

const tooWeak = document.getElementById('tooWeak');
const weak = document.getElementById('weak');
const medium = document.getElementById('medium');
const strong = document.getElementById('strong');
const passPower = document.getElementById('passPower');

const copyIcon =  document.getElementById('copyIcon');
const lengthErrorAlertMsg = document.getElementById('lengthErrorAlertMsg');
const checkboxUnselectedErrorMsg = document.getElementById('checkboxUnselectedErrorMsg');
const checkboxes = document.querySelectorAll('.customCheckBox');



function updateSliderProgress() {
  const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
  slider.style.background = `linear-gradient(90deg, hsl(127, 100%, 82%) ${percentage}%, hsl(248, 15%, 11%) ${percentage}%)`;
  passLength.innerText = slider.value;
  passLength.style.color = 'hsl(127, 100%, 82%)';
}

updateSliderProgress();
slider.addEventListener('input', updateSliderProgress);

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*_-=+";

var selectedCheckboxes = 0;

function generatePassword(length) {
    var charset = "";
    let password = "";
    if(lowercaseCheckbox.checked === true){
        charset = lowercase;
        selectedCheckboxes = selectedCheckboxes + 1;
    }
    if(uppercaseCheckbox.checked === true){
        charset = charset + uppercase;
        selectedCheckboxes = selectedCheckboxes + 1;
    }
    if(numbersCheckbox.checked === true){
        charset = charset + numbers;
        selectedCheckboxes = selectedCheckboxes + 1;
    }
    if(symbolsCheckbox.checked === true){
        charset = charset + symbols;
        selectedCheckboxes = selectedCheckboxes + 1;
    }
    for (let i = 0, n = charset.length; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
}

generateBtn.addEventListener('click', function(e){
    e.preventDefault();
    selectedCheckboxes = 0;
    tooWeak.className = '';
    weak.className = '';
    medium.className = '';
    strong.className = '';
    passPower.innerText = '';
    copyMsg.innerText = '';
    lengthErrorAlertMsg.innerText = '';
    if(slider.value > 5 && (lowercaseCheckbox.checked === true || uppercaseCheckbox.checked === true || numbersCheckbox.checked === true || symbolsCheckbox.checked === true)){
        const newPassword = generatePassword(slider.value);
        
        passInput.innerText = newPassword;
        passInput.style.color = 'hsl(252, 11%, 91%)';

        if(selectedCheckboxes === 1){
            tooWeak.classList.add('tooWeak');
            passPower.innerText = 'TOO WEAK!';
        }
        if(selectedCheckboxes === 2){
            tooWeak.classList.add('weak');
            weak.classList.add('weak');
            passPower.innerText = 'WEAK';
        }
        if(selectedCheckboxes === 3){
            tooWeak.classList.add('medium');
            weak.classList.add('medium');
            medium.classList.add('medium');
            passPower.innerText = 'MEDIUM';
        }
        if(selectedCheckboxes === 4){
            tooWeak.classList.add('strong');
            weak.classList.add('strong');
            medium.classList.add('strong');
            strong.classList.add('strong');
            passPower.innerText = 'STRONG';
        }
    }
    if(slider.value < 6){
        lengthErrorAlertMsg.innerText = 'At least 6 digits required';
        slider.style.background = 'hsl(0, 91%, 63%)';
        passLength.style.color = 'hsl(0, 91%, 63%)';
    }
    
    if(lowercaseCheckbox.checked === false && uppercaseCheckbox.checked === false && numbersCheckbox.checked === false && symbolsCheckbox.checked === false){
        checkboxUnselectedErrorMsg.innerText = 'At least 1 checkbox required';
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].classList.add('errorMsg');
        }
    } else{
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].classList.remove('errorMsg');
        }
        checkboxUnselectedErrorMsg.innerText = '';
    }
});

copyIcon.addEventListener('click', function(e){
    e.preventDefault();
    if(slider.value > 5 && (lowercaseCheckbox.checked === true || uppercaseCheckbox.checked === true || numbersCheckbox.checked === true || symbolsCheckbox.checked === true)){
        copyMsg.innerText = 'COPIED';
        navigator.clipboard.writeText(passInput.innerText);
    }
});