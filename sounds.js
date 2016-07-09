var sounds = {};

function loadSound(name, path){
    sounds[name] = new Howl({
      src: [path]
    });
}

function playSound(name){
    sounds[name].play();
}

loadSound("boxCollision", 'sound/boxCollision.wav')
