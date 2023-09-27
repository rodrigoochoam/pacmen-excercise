var pos = 0;
const pacArray = [
    ['images/PacMan1.png', 'images/PacMan2.png'],
    ['images/PacMan3.png', 'images/PacMan4.png']
];
var direction = 0; // 0 for right, 1 for left
var timeSinceImageChange = 0; // Track time for image change
const pacMen = [[], []]; // Two arrays: one for moving in one direction, one for changing direction

function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale
    };
}

function makePac() {
    let velocity = setToRandom(10);
    let position = setToRandom(200);
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = pacArray[0][direction];
    newimg.width = 100;

    newimg.style.left = position.x + 'px';
    newimg.style.top = position.y + 'px';

    game.appendChild(newimg);

    return {
        position,
        velocity,
        newimg
    };
}

function checkCollisions(item) {
  if (
      item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
      item.position.x + item.velocity.x < 0 ||
      item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
      item.position.y + item.velocity.y < 0
  ) {
      // Change direction when hitting the edge
      item.velocity.x = -item.velocity.x;
      item.velocity.y = -item.velocity.y;
      direction = 1 - direction; // Change direction
      timeSinceImageChange = 0;
  }
}


function update() {
    pacMen[0].forEach((item) => {
        checkCollisions(item);

        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;

        if (timeSinceImageChange >= 1000) {
            item.newimg.src = pacArray[1][direction]; // Use 'PacMan3.png' and 'PacMan4.png' when touching the edge
        } else {
            item.newimg.src = pacArray[0][direction]; // Use 'PacMan1.png' and 'PacMan2.png' otherwise
        }

        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';

        timeSinceImageChange += 20; // Increase time elapsed
    });

    pacMen[1].forEach((item) => {
        checkCollisions(item);

        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.src = pacArray[1][direction]; // Always use 'PacMan3.png' and 'PacMan4.png' when changing direction

        item.newimg.style.left = item.position.x + 'px';
        item.newimg.style.top = item.position.y + 'px';
    });

    setTimeout(update, 20);
}

function makeOne() {
    pacMen[0].push(makePac()); // Add a PacMan to the first array (moving in one direction)
    pacMen[1].push(makePac()); // Add a PacMan to the second array (changing direction)
}

// Start the game loop
update();
