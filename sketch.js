let images = [];
let flowerImages = [];
let numberOfImages = 26;
let numberOfFlowerImages = 12;
let imageWidth, imageHeight;
let currentImageIndex = 0; 
let daysPassed = 0;
let flowerData;

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
  flowerData = loadTable('flowers.csv', 'csv', 'header');
  
  // Load images
  for (let i = 1; i <= numberOfImages; i++) {
    images.push(loadImage('images/h' + i + '.jpg'));
  }

  for (let i = 1; i <= numberOfFlowerImages; i++) {
    flowerImages.push(loadImage('images/f' + i + '.png'));
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

  daySelected();
  changeDays();
  monthSelected();
}

function addFlowers() {
  let selectedMonth = int(monthSelect.value());
  let row = flowerData.getRow(selectedMonth-1);

  if (row !== null) {
    let flowerX = 50;
    let flowerY = height - 300;
    flowerGap = windowWidth / 5 - 250;
 
    for (let flowerType of flowerData.columns) {
     let count = row.get(flowerType);
     if (count > 0) {
        let imageIndex = flowerData.columns.indexOf(flowerType);
        for (let i = 0; i < count; i++) {
          image(flowerImages[imageIndex], flowerX, flowerY);
          flowerX += flowerImages[imageIndex].width + flowerGap;
        }
      }
    }
  }
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

function monthSelected() {
  month = int(monthSelect.value());
  day = 1;
  daySelect.value(day);
  changeDays();
  addFlowers();
}

function daySelected() {
  day = int(daySelect.value());
  changeDays(); // Call changeDays() when the day changes
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

  addFlowers();
  
}
