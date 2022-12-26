
nextLvl = () =>{
    for(let i = 0; i<employees.length; i++){
        if(employees[i].bought==true){
            lvlUpAvailable = true;
        }
        else{
            lvlUpAvailable = true;
        }
    }
    if(lvlUpAvailable==true){
        document.getElementById('lvlup-popup').style.display = 'block';
    }
}

lvlup = () =>{
    lvl++;
    lvlUpAvailable = false;
    code = 1;
    coffes = 1;
    upgrade = 1;
    codeConverter = 2;
    upgradeCost = 100;
    upgradeConverter = 1.2;
    passiveIncome = 0;
    for(let i=0; i<employees.length; i++){
        employees[i].active = false;
        employees[i].bought = false;
    }
}


lvlup()
