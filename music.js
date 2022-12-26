var audio = new Audio('8bit.mp3');
audio.volume = 0.2;
audio.loop = true;
var musicCounter=0;
var hapticsCounter = 0;
const musicSwitch = document.getElementById('music-switch')
const hapticsSwitch = document.getElementById('haptics-switch')

musicSetting = () =>{
    if(musicCounter%2){
        audio.pause();
        musicSwitch.style.backgroundColor = 'red';
        musicSwitch.style.textAlign = 'right';
        musicSwitch.textContent = "No"
        musicCounter++;
    }
    else{
        audio.play();
        musicSwitch.style.backgroundColor = 'green';
        musicSwitch.style.textAlign = 'left';
        musicSwitch.textContent = "Yes"
        musicCounter++;
    }
}

hapticsSetting = () =>{
    if(hapticsCounter%2){
        haptics=false;
        hapticsSwitch.style.backgroundColor = 'red';
        hapticsSwitch.style.textAlign = 'right';
        hapticsSwitch.textContent = "No"
        hapticsCounter++;
    }
    else{
        haptics=true;
        hapticsSwitch.style.backgroundColor = 'green';
        hapticsSwitch.style.textAlign = 'left';
        hapticsSwitch.textContent = "Yes"
        hapticsCounter++;
    }
}

closeSettings = () =>{
    document.getElementById('settings').style.display = 'none'
}



musicSwitch.addEventListener('click', musicSetting)
hapticsSwitch.addEventListener('click', hapticsSetting)
document.getElementById('close-settings').addEventListener('click', closeSettings)