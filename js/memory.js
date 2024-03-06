export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];
    const card = {
        current: back,
        clickable: true,
        goBack: function (){
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, time);
        },
        goFront: function (){
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };

    var options = JSON.parse(localStorage.options||JSON.stringify(default_options));
    var lastCard;
    var pairs = options.pairs;
    var time = timedifficulty(options);
    var pointsrested = pointsdifficulty(options);
    var points = 100; 

    function timedifficulty(options){
        if(options.difficulty === "easy") return 2000;
        else if(options.difficulty === "normal") return 1000;
        else if(options.difficulty === "hard") return 500;
    }

    function pointsdifficulty(options){
        if(options.difficulty === "easy") return 10;
        else if(options.difficulty === "normal") return 25;
        else if(options.difficulty === "hard") return 50;
    }

    return {
        init: function (call){
            var items = resources.slice(); // Copiem l'array
            items.sort(() => Math.random() - 0.5); // Aleatòria
            items = items.slice(0, pairs); // Agafem els primers
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5); // Aleatòria
            var cards = items.map(item => {
                var newCard = Object.create(card, {front: {value:item}, callback: {value:call}});
                newCard.element = document.createElement('div');
                newCard.element.classList.add('card'); // Agregar la clase .card
                return newCard;
            });
            for(let i = 0; i < cards.length; i++){
                cards[i].current = cards[i].front; // Mostra les cartes
                setTimeout(() => { // Després 1 seg la oculta
                    cards[i].current = back;
                    cards[i].clickable = true;
                    cards[i].callback();
                }, time);
            }
            return cards;
        },
        click: function (card){
            if (!card.clickable) return;
            card.goFront();
            if (lastCard){ // Segona carta
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        alert("Has guanyat amb " + points + " punts!");
                        window.location.replace("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=pointsrested;
                    if (points <= 0){
                        alert ("Has perdut");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card; // Primera carta
        }
    }
}();