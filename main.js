import kaboom from "https://unpkg.com/kaboom@3000.0.1/dist/kaboom.mjs";
// initialize context
kaboom();
setGravity(1600);




loadSound('happy', './resurssit/sounds/happytune.wav')

//background 
loadSprite('background', './resurssit/kuvat/bg1.png')
loadSprite('start', './resurssit/kuvat/start2.png')

scene("landing", () => {
    add([
        sprite("background"),
        scale(width() / 180, height() / 100),
        pos(0, 0),
        

    ])

    add([
        sprite("start"),
        pos(width() / 2, height() / 2),
        scale(3),
        anchor("center"),
        
    ])

    onClick(() => go("game"));
});





//the whole game
scene("game", () => {


const music = play("happy", {
    volume: 0.8,
    loop: false,
})



add ([
    sprite('background'),
    scale(width() /180, height() / 100),
    pos(0, 0),
])
  


// load player sprite
loadSprite("cat", "./resurssit/kuvat/catwalk_nobg.gif");
loadSprite("catjump", "./resurssit/kuvat/catjump.png")
loadSprite("catland", "./resurssit/kuvat/catland.png" )
loadSprite("catAll", "./resurssit/kuvat/catAll.png" )
loadSound("meow", "./resurssit/sounds/meow2.mp3")

//player
const cat = add([
    sprite("cat"),
    pos(80, 40),
    area(),
    body(),

    
])
  


//can jump only when on ground/double jump seems to work!
let pressCount = 0;

onKeyPress("space", () => {


    play("meow"), { //put some delay here

    }

cat.use(sprite("catjump")) //changes the image

    if(cat.isGrounded()) {
    cat.jump(800) // Increase this number to make the jump higher
    pressCount++

    wait(.5,() => {

        cat.use(sprite("catland")); 
        wait(.54,() => {

            cat.use(sprite("cat"));  
           }); 
       });


       //superjump
    }else if(cat.isGrounded && pressCount >= 1){
        cat.jump(1000);
        pressCount = 0;

        wait(.5,() => {
            cat.use(sprite("catland")); 

            wait(15,() => { //no effect on forcejump, and even on ground sometimes is landing, FIX
    
                cat.use(sprite("cat"));  
               }); 
           });
    

    }



})    



  

//platform    
add([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(222, 176, 115)
]) 



//obstacle
loadSprite('ball', './resurssit/kuvat/pallo2.png')
loadSprite('mouse', './resurssit/kuvat/mouse1.png' )


//checklabel  --->
let check = 0;
const collideLabel = add ([
    text( "Hits: " + check),
    pos(24, 70),
    color(127, 200, 600),
   
])

//check if pallo and obstacle collide and what happens then
//loadSprite('flame', './resurssit/kuvat/flame1.gif')
cat.onCollide('obstacle', () => {


    const cat2 = add([
        sprite('cat'),
        pos(cat.pos),
        color(209, 209, 199), //blackkk
        shake(20),
       



    ])


    check +=1
    collideLabel.text ="Hits: " +  check 
    
    if(check === 3){
    go("lose")
    }


    wait(.8, () => {
        destroy(cat2)
    })
});








//looping obstacles
loop(5, () => {
    add([
        sprite('ball'),
        area(),
        outline(1), //?
        pos(width(), height() - 35), //to be just above the floor
        anchor("botleft"),
        scale(1.5),   
        move(LEFT, 540), 
        "obstacle",
    ])
    
    wait(2,() => {

     spawnObstacle();  //waits and then starts to spawn
    });
});

//obstacles spawn randomly
function spawnObstacle() {

     
    add([  //sama kuin obstacle
        sprite('mouse'),  
        area(),
        outline(1), //?
        pos(width(), height() - 42), //to be just above the floor
        anchor("botleft"),
        scale(2),  //bigger
        

        move(LEFT, 400),   
        "obstacle",
    ]);

 
    wait(rand(5, 10), () => {
        spawnObstacle();
    });

}










//lose
loadSprite('lose', './resurssit/kuvat/bgEnd.png')

scene("lose", () => {
    add([
        sprite("lose"),
        scale(width() /280, height() / 280),
        pos(0, 0),
    ])

    add([
        text("Game over", 24),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(224, 134, 16),
    ])


    add([
        text(`Final Score: ${score}`), // Replace `score` with your score variable
        pos(width() / 2, height() / 1.7), // Adjust the position as needed
        anchor("center"),
        color(127, 200, 100),
    ]);


    //restart
    const restartButton = add([
        text("Restart"),
        pos(width() / 2, height() / 1.5),
        anchor("center"),
        color(127, 200, 100),
    ]);


    music.paused = true

    onClick(() => go("game"));

});



//counter
let score = 0;
const scoreLabel = add ([
    text(score),
    pos(24,24),
])

onUpdate(() => {
    score++;
    scoreLabel.text = score;
})



      
 //scene ending bracket
}) 

onKeyPress("space", () => go("game"));
onClick(() => go("game"));


//game GO

go("landing"); //small function, and after clicking it go(game)
    
