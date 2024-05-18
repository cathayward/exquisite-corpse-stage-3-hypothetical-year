let images = [];
let flowerImages = [];
let numberOfImages = 26;
let numberOfFlowerImages = 12;
let imageWidth, imageHeight;
let currentImageIndex = 0; 
let daysPassed = 0;
let flowerData;
let monthNames = []; // Array to store month names
let monthData = {}; // Object to store flower data for each month

let monthSelect;
let daySelect;

let month = 1;
let day = 1;

let daysMapping = [
  0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 16
];

let sumDaysMapping = [];

for (let i = 0; i < daysMapping.length; i++) {
  sumDaysMapping[i] = daysMapping[i] + (sumDaysMapping[i - 1] || 0);
}

let days = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let sumDays = [0];

for (let i = 1; i < days.length; i++) {
  sumDays[i] = days[i] + sumDays[i - 1];
}

function preload() {
  // Load CSV data
  flowerData = loadTable('flowers.csv', 'csv', 'header')
  
  // Load images
  for (let i = 1; i <= numberOfImages; i++) {
    images.push(loadImage('images/h' + i + '.jpg'));
  }

  for(let i = 1; i <= numberOfFlowerImages; i++){
    flowerImages.push(loadImage('images/f' + i + '.png'))
  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  imageWidth = images[0].width;
  imageHeight = images[0].height;

  monthSelect = createSelect();
  for (let i = 1; i <= 12; i++) {
    monthSelect.option(i);
  }
  
  daySelect = createSelect();
  for (let i = 1; i <= days[1]; i++) {
    daySelect.option(i);
  }
  monthSelect.changed(monthSelected);
  daySelect.changed(daySelected);

  changeDays();
}

function monthSelected() {
  month = int(this.value());
  day = 1
  changeDays();

  if (month === 1){
    let januaryRow = flowerData.getRow(1); // Assuming January is the first row
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = januaryRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[0], 50, windowHeight - 300); // Images are zero-indexed, so use i - 1 to access the correct index in flowerImages array
      }
    }
  } else if (month === 2){
    let februaryRow = flowerData.getRow(2); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = februaryRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[1], 50, windowHeight - 300); 
      }
    }
  } else if (month === 3){
    let marchRow = flowerData.getRow(3); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = marchRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[2], 50, windowHeight - 300); 
      }
    }
  } else if (month === 4){
    let aprilRow = flowerData.getRow(4); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = aprilRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[3], 50, windowHeight - 300); 
      }
    }
  } else if (month === 5){
    let mayRow = flowerData.getRow(5); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = mayRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[4], 50, windowHeight - 300); 
      }
    }
  } else if (month === 6){
    let juneRow = flowerData.getRow(6); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = juneRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[5], 50, windowHeight - 300); 
      }
    }
  } else if (month === 7){
    let julyRow = flowerData.getRow(7); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = julyRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[6], 50, windowHeight - 300); 
      }
    }
  } else if (month === 8){
    let augustRow = flowerData.getRow(8); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = augustRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[7], 50, windowHeight - 300); 
      }
    }
  } else if (month === 9){
    let septemberRow = flowerData.getRow(9); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = septemberRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[8], 50, windowHeight - 300); 
      }
    }
  } else if (month === 10){
    let octoberRow = flowerData.getRow(10); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = octoberRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[9], 50, windowHeight - 300); 
      }
    }
  } else if (month === 11){
    let novemberRow = flowerData.getRow(11); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = novemberRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[10], 50, windowHeight - 300); 
      }
    }
  } else if (month === 12){
    let decemberRow = flowerData.getRow(12); 
    for (let i = 1; i <= numberOfFlowerImages; i++) {
      let flowerValue = decemberRow.getNum('f' + i);
      if (flowerValue > 0) {
        image(flowerImages[11], 50, windowHeight - 300); 
      }
    }
  }
  }


function daySelected() {
  day = int(this.value());
  changeDays(); // Call changeDays() when the day changes
}

function changeDays() {
  daysPassed = sumDays[month - 1] + day;
  daysPassed = (daysPassed + 153) % 366;
  
  currentImageIndex = 0;
  while (daysPassed > sumDaysMapping[currentImageIndex]) {
    currentImageIndex++;
  }
  currentImageIndex = currentImageIndex % numberOfImages;
}

function draw() {
  background(0);

  let x = width / 2 - imageWidth / 2;
  let y = height / 2 - imageHeight / 2;
  image(images[currentImageIndex], x, y);

  textSize(20);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(25);
  text("2024 /", width / 2, 20);
  monthSelect.position(width / 2 + 45, 20);
  text("/", width / 2 + 100, 20);
  daySelect.position(width / 2 + 110, 20);
}
