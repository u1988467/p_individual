var game = {
    lastCard: null,
    allowedErrors: 3
}

export function clickCard(name){
    if (!game.lastCard){ // Primera carta clicada
        game.lastCard = name;
    }
    else{ // Teníem carta prèvia
        if (game.lastCard === name) 
            alert ("Carta " + name + " encertada!");
        else {
            alert ("Has fallat");
            game.allowedErrors--;
            if (game.allowedErrors < 0){
                alert ("Has perdut");
                window.location.assign("../");
            }
        }
        game.lastCard = null;
    }
}