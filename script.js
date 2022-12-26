var lvl = 1;
var code = 1;
var coffes = 1;
var upgrade = 1;
var codeConverter = 1;
var upgradeCost = 10;
var upgradeConverter = 1.2;
const buttons = document.getElementsByClassName('clicker-btn')
const clicks = [];
var passiveIncome = 0;
var lvlUpAvailable = false;
var counter=0;
const winningStrike = [];
const winning = ['q', 'w', 'e']
var haptics = false;



//Generating winning keys 
winningKeys = () =>{
    for(let i=0; i<3; i++){
        winningStrike.push(winning[Math.floor(Math.random()*3)])
    }
    for(let i = 0; i<document.getElementsByClassName('win-key').length; i++){
        document.getElementsByClassName('win-key')[i].innerHTML = winningStrike[i].toUpperCase();
        document.getElementsByClassName('win-key')[i].classList.add(winningStrike[i]);
    }
}

winningKeys()


//Keys changer 
keysChanger = () =>{
    if(counter<=30){
        document.getElementById('winning-progress').value = counter/30
        document.getElementById('winning-time').innerHTML = 30-counter+"s 3x Multiple Time"
        counter++;
    }
    else{
        counter=0
        for(let i = 0; i<document.getElementsByClassName('win-key').length; i++){
            document.getElementsByClassName('win-key')[i].classList.remove(winningStrike[i]);
        }
        winningStrike.length = 0;
        clicks.length = 0;
        winningKeys()
    }
}

//Upgrade clicks
upgradion = () =>{
    if(upgradeCost<=code){
        code-=upgradeCost
        upgradeCost*=upgradeConverter
        codeConverter*=1.2
        coffes++;
    }
}


//Counting clicks and boost 
clicked = (key) =>{
    clicks.push(key)
    if(haptics==true){
        navigator.vibrate(100)
    }
    if(clicks.length<=3){
        if(winningStrike.toString()==clicks.toString()){
            code+=3*codeConverter
            clicks.length = 0;
        }
        else{
            code+=1*codeConverter;
        }
    }
    else{
        code+=1*codeConverter;
        clicks.length = 0;
    }
}

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", pulse = () =>{
        buttons[i].style.animationIterationCount = "1";
    })
}

document.getElementById('upgrade-pc').addEventListener("click", upgradion)



//Timer 0,1 sec (fast rendering required)
setInterval(()=>{
    document.getElementById('code').innerHTML = 'Code: '+Math.floor(code)
    document.getElementById('coffes').innerHTML = 'Coffes: '+Math.floor(coffes)
    document.getElementById('upgrade-cost').innerHTML = 'Cost: '+ Math.floor(upgradeCost)
    document.getElementById('upgrade-pc-progress').value = code/upgradeCost;
},100)



//1 sec refresh 
setInterval(()=>{
    document.getElementById('lvl').innerHTML = "Level: "+lvl
    upgradeButton()

    for(let i=0; i<employees.length; i++){
        affordEmployee(employees[i].cost, employees[i].name, employees[i].id)
    }
    code+=passiveIncome
    nextLvl()
    keysChanger()
},1000)



// Upgrade button
upgradeButton = () =>{
    if(upgradeCost<code){
        document.getElementById('upgrade-pc-progress').style.display = "none";
        document.getElementById('upgrade-btn').style.display = "block";
    }
    else{
        document.getElementById('upgrade-pc-progress').style.display = "block";
        document.getElementById('upgrade-btn').style.display = "none";
    }
}



//Generating employees 
generatingEmployees = () =>{
    for(let i = 0; i<employees.length; i++){


        let hireSection = document.createElement('div')
        document.getElementsByClassName('hire-section')[0].appendChild(hireSection)
        hireSection.classList.add('job')
        hireSection.classList.add('blocked-employee')
        hireSection.id = employees[i].name
    
        let img = document.createElement('div')
        let info = document.createElement('div')
        let cost = document.createElement('div');
    
        
        document.getElementsByClassName('job')[i].appendChild(img)
        img.classList.add('employee-img')
        document.getElementsByClassName('job')[i].appendChild(info)
        info.classList.add('employee-info')
        document.getElementsByClassName('job')[i].appendChild(cost)
        cost.classList.add('employee-cost')
    
        let employeeName = document.createElement('p')
        let employeeCost = document.createElement('p')
        let employeeProduction = document.createElement('p')
        let employeeImage = document.createElement('div')
        
        document.getElementsByClassName('employee-info')[i].appendChild(employeeName)
        employeeName.textContent = employees[i].name;
        document.getElementsByClassName('employee-info')[i].appendChild(employeeProduction)
        employeeProduction.textContent = employees[i].efficiency +"c/s";
        employeeProduction.id= employees[i].name+"-efficiency"
    
        document.getElementsByClassName('employee-cost')[i].appendChild(employeeCost)
        employeeCost.textContent = employees[i].cost+" Coffes";
        employeeCost.id = employees[i].name+"-cost"
    }
    
}

generatingEmployees()



//Checking if you are able to buy employee
affordEmployee = (cost, name, id) =>{
    if(cost<=coffes){
        document.getElementById(name).classList.remove('blocked-employee')
        if(employees[id].active == false){
            employees[id].active = true
        }
        else{
            document.getElementById(name).classList.remove('blocked-employee')
        }
    }
    if(employees[id].active==false){
        document.getElementById(name).classList.add('blocked-employee')
        document.getElementById(employees[id].name+"-cost").innerHTML = employees[id].cost+" Coffes"
        document.getElementById(employees[id].name+"-efficiency").innerHTML = employees[id].efficiency+"c/s"

    }
}


//Buy employee
buyEmployees = () =>{
    for(let i = 0; i<document.getElementsByClassName('job').length; i++){
        if(employees[i].active==true&&employees[i].bought==false){
            employees[i].bought=true;
            coffes-=employees[i].cost
            passiveIncome += employees[i].efficiency
            document.getElementById(employees[i].name+"-cost").innerHTML = "Working..."
        }
    }
}

for(let i = 0; i<document.getElementsByClassName('job').length; i++){
    document.getElementsByClassName('job')[i].addEventListener("click", buyEmployees)
}


//Lvl up
nextLvl = () =>{
    for(let i = 0; i<employees.length; i++){
        if(employees[i].bought==true){
            lvlUpAvailable = true;
        }
        else{
            lvlUpAvailable = false;
        }
    }
    if(lvlUpAvailable==true){
        document.getElementById('lvlup-popup').style.display = 'block';
        document.getElementById('upgrade-yes').addEventListener('click', lvlup)
        document.getElementById('upgrade-no').addEventListener('click', waitToLvlUp)
    }
}
var waitingTime = false;

//Reseting stats and upgrade level bonuses
lvlup = () =>{
    lvl++;
    code=0;
    lvlUpAvailable = false;
    upgrade = 1;
    codeConverter = codeConverter*1.2;
    upgradeCost+=100;
    upgradeConverter = 1.2;
    passiveIncome = 0;
    for(let i=0; i<employees.length; i++){
        employees[i].active = false;
        employees[i].bought = false;
        employees[i].cost=employees[i].cost*2;
        employees[i].efficiency=employees[i].efficiency*2;
    }
    document.getElementById('lvlup-popup').style.display = 'none';
}

//If you dont want level up now :) 
waitToLvlUp = () =>{
    document.getElementById('lvlup-popup').style.display = 'none';
    setTimeout(()=>{
        lvlup();
    },300)
}



//Keypresses
document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    if(name == 'q' || name == 'Q'){
        clicked('q');
    }

    if(name == 'w' || name == 'W'){
        clicked('w');
    }

    if(name == 'e' || name == 'E'){
        clicked('e');
    }

  }, false);



// Settings 
openSettings = () =>{
    document.getElementById('settings').style.display = 'flex';
}

document.getElementById('options').addEventListener('click', openSettings)