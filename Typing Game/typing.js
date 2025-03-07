const words = 'time year people way day man thing woman life child world school state family student group country problem hand part place case week company system program question work government number night point home water room mother area money story fact month lot right study book eye job word business issue side kind head house service friend father power hour game line end member law car city community name president team minute idea kid body information back parent face others level office door health person art war history party result change morning reason research girl guy moment air teacher force education foot boy age policy process music market value care series court center report mind church death event story industry project study class exam field product control king dream tree sun bank card food wife farm action chance blood heart face soldier peace wind trade culture lord capital market answer sex act ground door knowledge language memory song model sentence director heart mission character bed hospital color doctor measure decision weapon page boss soldier pressure style hope sound organization brother officer plan mission season movement top test minute trial spring winter summer sleep news date enemy search drive agreement feeling meeting region daughter island river feeling text spirit talk form goal picture chance glass land letter uncle purpose uncle dog sky shape population crime machine character trial love machine theory growth bar brother attack agency sign club idea design partner agency user ground drug fear aim size record image paper doctor quality dream effort item concept role debate drug function desire choice strategy coach fear plant coach respect survey environment pair minute argument expression traffic aspect attempt text box island democracy sample soldier shot player blood analysis spirit customer proposal answer skill medium blue weight strategy debate survey affair weight association lack status crisis volume procedure match peace pattern client adult argument fuel reader access possibility management aim length revolution union income ability sea politics danger device lawyer truck pool employment flight aim box language observation drink injury doctor blow length king queen currency opposition title lady soul manager crash criticism magazine asset attempt actor note insurance tear king conference copy region queen option signal emotion professor hall passion knowledge interaction storm entrance investigation base quarter oil planet intervention connection income assistant perspective noise dress principle tank device profit factor flight injury circle platform birth copy desk class rope topic quantity effort agent help prince text advantage kitchen milk philosophy lip noise coat release writing passage explanation disaster tension wood emphasis ring theory soul exam discipline reference crime snow energy cycle muscle shell gap blame proof vision context tradition flower tape balance credit corner notion jump aspect edge trick travel sky front university beach chicken concept rain plant respect drink flame coffee decision bread tongue mission chain poison entertainment explanation weakness coat memory rating stand writing highway dish theory flame village ice bus people conference tale judge fault fishing tail neck desert salmon analysis object request mechanism generation pop friend river aunt ad week player tail fun coat handle fold symbol ring progress string tourist promotion listener smile music fruit lead bus mode stretch opinion leaf fear button print thought bottom bedroom policy button earth prize director employer bus pause teaching queen marketing engineer meat cheek debate quote phrase wheel butter emotion gift theory relation soul pot valley mark bread dealer historian valley balance wine theory mark master crash mixture background chemistry earth topic president match food movie arm dad silver traffic comfort explanation steel stand organization chocolate thought injury classroom stranger bed selection flower half bread flower night tour leader reserve professor principle bathroom tale dealer gift assistant moment collapse energy ease transportation attack string schedule improvement flight gene emphasis height mud judge presence novel assistant share disaster tone budget ride guidance economy village estimate gesture ring college finding observation disk dust attack passage association resolution literature mixture childhood tale run joint virus figure virus local breakfast population basis tension setting egg childhood effort addition director savings channel location height chest instance craft sector football log poet gene knee steel buyer health principle count coat variety personnel concert stretch mode medicine estate rock perspective storm resolution software committee chocolate acid height union mixture beer relief border mail election milk coffee meal heat vehicle string invitation rope rule disk injury click surprise throat crop square message manager fuel midnight mode guess concert term depth failure energy vision shoulder death courage ring error draft tone actor mind'.split(' ');
const wordsCount = words.length;
const gameTime = 20*1000;
window.timer = null;
window.gameStart = null;
document.getElementById('newGameBtn').addEventListener('click',()=>{
    gameOver();
    newGame();
})

function addClass(el,name){
    el.className+=' '+name;
}
function removeClass(el,name){
    el.className = el.className.replace(name,'');
}

function randomWord(){
    const randomIndex = Math.ceil(Math.random()*wordsCount);
    return words[randomIndex-1];
}

function formatWord(word){
    return `<div class='word'><span class='letter'>${word.split('').join('</span><span class="letter">')}</span></div>`
}

function newGame(){
    document.getElementById('words').innerHTML = '';
    document.getElementById('info').innerHTML = (gameTime/1000) + '';
    for(let i=0; i<200; i++){
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }
    addClass(document.querySelector('.word'), 'current');
    addClass(document.querySelector('.letter'), 'current');
}

function gameOver(){
    clearInterval(window.timer);
    addClass(document.getElementById('game'),'over');
    document.getElementById('info').innerHTML = `WPM: ${getWpm()}`;
}

function getWpm(){
    const words = [...document.querySelectorAll('.word')];
    const lastTypedWord = document.querySelector('.word.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord);
    const typedWords = words.slice(0, lastTypedWordIndex);
    const correctWords = typedWords.filter(word=>{
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctLetters = letters.filter(letter => letter.className.includes('correct'));
        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    })
    return correctWords.length/gameTime * 60 * 1000;
}

document.getElementById('game').addEventListener('keyup', ev => {
    const key = ev.key;
    const currentLetter = document.querySelector('.letter.current');
    const currentWord = document.querySelector('.word.current');
    const expected = currentLetter?currentLetter.innerHTML:' ';
    const isLetter = key.length===1 && key!=' ';
    const isSpace = key===' ';
    const isBackspace = key==='Backspace';
    const isFirstLetter = currentLetter === currentWord.firstChild;
    console.log({key, expected});

    if(document.querySelector('#game.over')){
        return;
    }

    if(!window.timer && isLetter){
        window.timer = setInterval(() =>{
            if(!window.gameStart){
                window.gameStart = (new Date()).getTime();
            }
            const currentTime = (new Date()).getTime();
            const msPassed = currentTime - window.gameStart;
            if(msPassed>=gameTime){
                gameOver();
                return;
            }
            const sPassed = Math.ceil(msPassed/1000);
            document.getElementById('info').innerHTML=gameTime/1000-sPassed+' ';
        }, 1000);
    }
    if(isLetter){
        if(currentLetter){
            addClass(currentLetter, key===expected?'correct':'incorrect');
            removeClass(currentLetter, 'current');
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current');
            }
        }
        else{
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML=key;
            incorrectLetter.className='letter incorrect extra';
            currentWord.appendChild(incorrectLetter);
        }
    }
    if(isSpace){
        if(expected!==' '){
            const letterToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            letterToInvalidate.forEach(letter=>{
                addClass(letter, 'incorrect');
            })
        }
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if(currentLetter){
            removeClass(currentLetter, 'current');
        }
        addClass(currentWord.nextSibling.firstChild, 'current');
    }
    if(isBackspace){
        if(currentLetter && isFirstLetter){
            //make prev word current, last letter current
            removeClass(currentWord, 'current');
            addClass(currentWord.previousSibling, 'current');
            removeClass(currentLetter, 'current');
            addClass(currentWord.previousSibling.lastChild, 'current');
            removeClass(currentWord.previousSibling.lastChild, 'incorrect');
            removeClass(currentWord.previousSibling.lastChild, 'correct');
        }
        if(currentLetter && !isFirstLetter){
            removeClass(currentLetter, 'current');
            addClass(currentLetter.previousSibling, 'current');
            removeClass(currentLetter.previousSibling, 'incorrect');
            removeClass(currentLetter.previousSibling, 'correct');
        }
        if(!currentLetter){
            if(currentWord.lastChild.className.includes('extra')){
                currentWord.removeChild(currentWord.lastChild);
            }
            else{
                addClass(currentWord.lastChild,'current');
                removeClass(currentWord.lastChild, 'incorrect');
                removeClass(currentWord.lastChild, 'correct');    
            }
        }
    }
    if(currentWord.getBoundingClientRect().top>250){
        const words = document.getElementById('words');
        const margin = parseInt(words.style.marginTop || '0');
        words.style.marginTop = (margin-35) + 'px';
    }
});

newGame();
