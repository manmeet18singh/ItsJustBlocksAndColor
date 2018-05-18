var canvas, lines, midRect, leftRect, rightRect, backColor, rectColor;

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    lines = new line1();
    midRect = new rectMid(lines.x);
    leftRect = new rectLeft(lines.x);
    rightRect = new rectRight(lines.x);
    backColor = '#FF2E4A';
    rectColor = '#41EAD4';
}

function draw() {
    // put drawing code here
    fill(rectColor);
    background(backColor);

    lines.grow();
    lines.drawIt();

    push();
    noStroke();
    if (lines.growth > windowHeight+300) {
        midRect.grow();
        midRect.drawIt();
    }
    pop();

    if (lines.growth >= windowHeight) {
        if (midRect.growth >= windowHeight) {

            push();
            noStroke();
            leftRect.grow();
            rightRect.grow();
            leftRect.drawIt();
            rightRect.drawIt();
            pop();

            if (leftRect.growth >= 0 && rightRect.growth >= windowWidth) {
                lines.growth = 0;
                lines.x = floor(random(50, windowWidth - 200));
                midRect.growth = 0;
                midRect.x = lines.x;

                leftRect.growth = 0;
                rightRect.growth = 0;
                leftRect.x = lines.x;
                rightRect.x = lines.x;

                if (backColor == '#FF2E4A') {
                    backColor = '#41EAD4';
                    rectColor = '#FDFFFC';
                } else if (backColor == '#41EAD4') {
                    backColor = '#FDFFFC';
                    rectColor = '#EF32A2';
                } else if (backColor == '#FDFFFC') {
                    backColor = '#EF32A2';
                    rectColor = '#002642';
                } else if (backColor == '#EF32A2') {
                    backColor = '#002642';
                    rectColor = '#FF2E4A';
                } else {
                    backColor = '#FF2E4A';
                    rectColor = '#41EAD4';
                }

                redraw();
            }
        }
    }
}

function line1() {
    this.x = floor(random(50, windowWidth - 200));
    this.y = 0;
    this.growth = 0;

    this.grow = function() {
        this.growth += 2;
    };

    this.drawIt = function() {
        line(this.x - 1, this.y, this.x - 1, this.growth);
        line(this.x + 200, this.y, this.x + 200, this.growth);
    };
}


function rectMid(lineX) {
    this.x = lineX;
    this.y = 0;
    this.w = 200;
    this.growth = 0;

    this.grow = function() {
        this.growth+=2;
    };

    this.drawIt = function() {
        rect(this.x, this.y, this.w, this.growth);
    };
}

function rectLeft(lineX) {
    this.x = lineX;
    this.y = 0;
    this.growth = 0;
    this.h = windowHeight;


    this.grow = function() {
        this.growth += 2;
    };

    this.drawIt = function() {
        rect(this.x, this.y, -this.growth, this.h);
    };
}

function rectRight(lineX) {
    this.x = lineX;
    this.y = 0;
    this.growth = 0;
    this.h = windowHeight;


    this.grow = function() {
        this.growth += 2;
    };

    this.drawIt = function() {
        rect(this.x + 200, this.y, this.growth, this.h);
    };
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
