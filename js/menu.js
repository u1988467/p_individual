
$('#play').on('click',function(){
    window.location.assign("./html/game.html");
});

$('#options').on('click',function(){
    window.location.assign("./html/options.html");
});

$('#saves').on('click',function(){
    console.error("Opció no implementada");
});

$('#exit').on('click',function(){
    console.warn("No es pot sortir!");
});