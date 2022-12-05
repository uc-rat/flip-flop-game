
let found_array = [];
let flipped_array = [];
let img_shown_array = [];
let series = 2;
const hidden_image_url = './assets/images/undisplayed.PNG';
let a = [];
let b = [];
let c = [];
let d = [];
const translation = ['a', 'b', 'c', 'd'];
let time = 0;
let playing = false;
let num1 = 0;
let num2 = 0;
let num3 = 0;
let game_board = document.querySelector(".game-board");
const cards4 = ['0','1','2','3','4','5',
                '0', '1', '2', '3', '4', '5',
                '0', '1', '2', '3', '4', '5',
                '0', '1', '2', '3', '4', '5'];
const cards3 = ['0','1','2','3','4','5',
                '6', '7', '0', '1', '2', '3',
                '4', '5', '6', '7', '0', '1',
                '2', '3', '4', '5', '6', '7'];
const cards2 = ['0','1','2','3','4','5',
                '6', '7', '8', '9', '10', '11',
                '0', '1', '2', '3', '4', '5',
                '6', '7', '8', '9', '10', '11'];

// it generates matrix
function generateMatrix() {
    for (let x = 0; x < 4; x++) {
        game_board.innerHTML += `<div class='row-${x + 1} row'>
                        </div>`;
        let row_long = document.querySelector(`.row-${x + 1}`);
        row_long.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            row_long.innerHTML += `<img src="./assets/images/undisplayed.PNG" id="${x + 1}${i + 1}" onclick="flip_image('${x + 1}','${i + 1}')">`;
        }
    }
}

// resets everything
function reset() {
    //Resetting everything
    flipped_array = [];
    img_shown_array = [];
    found_array = [];
    // close popups c - close, w - win, l - lost
    load_popup('cl');
    load_popup('cw');
    //Flipping board to hidden
    for (let r = 1; r < 5; r++) {
        for (let v = 1; v < 7; v++) {
            let img_to_flip_r = r.toString();
            let img_to_flip_v = v.toString();
            let img_to_flip_id = img_to_flip_r.concat('', img_to_flip_v);
            document.getElementById(img_to_flip_id).src = hidden_image_url;
        }
    }
    set_up_imgs();
}

function start_game() {
    reset();
    document.getElementById('2pic').disabled = true;
    document.getElementById('3pic').disabled = true;
    document.getElementById('4pic').disabled = true;
    playing = true;
}

// this is for changing series 2, 3, 4
function change_mode(mode) {
    series = mode;
    start_game();
}

// this is to flip all 
function flip_all() {
    flipped_array = [];
    img_shown_array = [];
    for (let r = 1; r < 5; r++) {
        for (let v = 1; v < 7; v++) {
            let img_to_flip_r = r.toString();
            let img_to_flip_v = v.toString();
            let img_to_flip_id = img_to_flip_r.concat('', img_to_flip_v);

            document.getElementById(img_to_flip_id).src = hidden_image_url;
        }
    }
    upturn_found();
}

function upturn_found() {
    for (let r = 1; r < 5; r++) {
        for (let v = 1; v < 7; v++) {
            let img_to_flip_r = r.toString();
            let img_to_flip_v = v.toString();
            let img_to_flip_id = img_to_flip_r.concat('', img_to_flip_v);
            if(found_array.includes(img_to_flip_id)) {
                if(img_to_flip_r == 1) {
                    image_to_show = a[img_to_flip_v];
                } else if(img_to_flip_r == 2) {
                    image_to_show = b[img_to_flip_v];
                } else if(img_to_flip_r == 3) {
                    image_to_show = c[img_to_flip_v];
                } else if(img_to_flip_r == 4) {
                    image_to_show = d[img_to_flip_v];
                }
                const base_url = './assets/images/flipped/';
                const full_url = base_url + image_to_show + '.png';
                document.getElementById(img_to_flip_id).src = full_url;
            }
        }
    }
}

// this function is for flip image - chosen_image_hor means it is not flipped horizontal and chosen_image_vert means its currently flipped
function flip_image(chosen_image_hor, chosen_image_vert) {
    if(playing) {
        const chosen_image_id = chosen_image_hor.concat('', chosen_image_vert);
        console.log('Image chosen: ' + chosen_image_id);
        if(!flipped_array.includes(chosen_image_id)) {
            let image_to_show;
            if(chosen_image_hor == 1) {
                image_to_show = a[chosen_image_vert];
            } else if(chosen_image_hor == 2) {
                image_to_show = b[chosen_image_vert];
            } else if(chosen_image_hor == 3) {
                image_to_show = c[chosen_image_vert];
            } else if(chosen_image_hor == 4) {
                image_to_show = d[chosen_image_vert];
            }
            console.log(chosen_image_vert);
            const base_url = './assets/images/flipped/';
            const full_url = base_url + image_to_show + '.png';
            document.getElementById(chosen_image_id).src = full_url;
            if(flipped_array.length >= series) {
                flip_all();
            } else {
                flipped_array.push(chosen_image_id);
                img_shown_array.push(parseInt(image_to_show));
            }
            console.log(img_shown_array[0]);
            console.log(img_shown_array[1]);
            //checking if there is a win in series of 2
            if(img_shown_array[0] == img_shown_array[1]) {
                if(series == 2) {
                    found();
                } else if(img_shown_array[1] == img_shown_array[2]) {
                    if(series == 3) {
                        found();
                    } else if(img_shown_array[2] == img_shown_array[3]) {
                        found();
                    }   
                }
            }
            if(found_array.length >= 24) {
                win();
            }
        } else {
            window.alert("Image is already flipped!");
        }
    }
}

// this function is to call mix function and setup the matrix board
function set_up_imgs() {
    let array_shuffled;
    if(series == 2) {
        array_shuffled = mix(cards2);
    } else if(series == 3) {
        array_shuffled = mix(cards3);
    } else {
        array_shuffled = mix(cards4);
    }
    for(let x = 0; x < 4; x++) {
        for(let y = 1; y < 7; y++) {
            if(x == 0) {
                a[y] = array_shuffled[((x * 6) - 1) + y];
            } else if(x == 1) {
                b[y] = array_shuffled[((x * 6) - 1) + y];
            } else if(x == 2) {
                c[y] = array_shuffled[((x * 6) - 1) + y];
            } else {
                d[y] = array_shuffled[((x * 6) - 1) + y];
            }
        }
    }
}

// this mix function is to mix and shuffle cards and position
function mix(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

// this function is for pushing matched images to array
function found() {
    for(let x = 0; x < flipped_array.length; x++) {
        found_array.push(flipped_array[x]);
    }
    flipped_array = [];
    img_shown_array = [];
}

// win message
function win() {
    load_popup('w');
    playing = false;
}

// this shows help popup alert
function display_help() {
    load_popup('h');
}

// this function flips all the image to show solution
function show_solution() {
    for (let r = 1; r < 5; r++) {
        for (let v = 1; v < 7; v++) {
            let img_to_flip_r = r.toString();
            let img_to_flip_v = v.toString();
            let img_to_flip_id = img_to_flip_r.concat('', img_to_flip_v);
            if(img_to_flip_r == 1) {
                image_to_show = a[img_to_flip_v];
            } else if(img_to_flip_r == 2) {
                image_to_show = b[img_to_flip_v];
            } else if(img_to_flip_r == 3) {
                image_to_show = c[img_to_flip_v];
            } else if(img_to_flip_r == 4) {
                image_to_show = d[img_to_flip_v];
            }
            const base_url = './assets/images/flipped/';
            const full_url = base_url + image_to_show + '.png';
            document.getElementById(img_to_flip_id).src = full_url;
        }
    }
}

// this function is for displaying popups - alert and messages
function load_popup(popup) {
    // for help button popup
    if(popup == 'h') {
        if(document.getElementById("inst").style.display == "none") {
            alert('This is a simple memory game. Try and uncover all of the cards in under 60 seconds! You can choose to either try and guess 2, 3 or 4 cards at a time. Give it a go by clicking on one of the radio buttons!');
        } else {
            // to hide help popup
            document.getElementById("inst").style.display = "none";
        }
    } else if(popup == 'w') { // for win popup
        document.getElementById("w").style.display = "block";
    } else if(popup == 'cw') { // to close win popup
        document.getElementById("w").style.display = "none";
    } else if(popup == 'l') { // for lost popup alert
        alert('Lost :( Better Luck Next Time!');
    } else if(popup == 'cl') { // to close/hide lost popup
        document.getElementById("l").style.display = "none";
    }
}

// this is for countdown timer
function count() {
    if(playing) {
        time++;
        // if time is up then load lost 'l' popup and reset
        if(time >= 60) {
            load_popup('l');
            playing = false;
            load_base();
        }
    }
}

// this loads restart game
function load_base() {
    reset();
    playing = false;
    time = 0;
    document.getElementById('2pic').disabled = false;
    document.getElementById('3pic').disabled = false;
    document.getElementById('4pic').disabled = false;
}
setInterval(count, 1000);