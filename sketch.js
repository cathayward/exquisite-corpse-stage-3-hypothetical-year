// Arrays to hold background and flower images
let images = [];
let flowerImages = [];
// Number of background and flower images
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

// Mapping of days corresponding to the year
let daysMapping = [
  0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 16
];

let sumDaysMapping = [];

// Calculate cumulative days for mapping
for (let i = 0; i < daysMapping.length; i++) {
  sumDaysMapping[i] = daysMapping[i] + (sumDaysMapping[i - 1] || 0);
}

// Days in each month
let days = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let sumDays = [0];

// Calculate cumulative days for each month
for (let i = 1; i < days.length; i++) {
  sumDays[i] = days[i] + sumDays[i - 1];
}

function preload() {
  // Load CSV data
  flowerData = loadTable('flowers.csv', 'csv', 'header');
  
  // Load background images
  for (let i = 1; i <= numberOfImages; i++) {
    images.push(loadImage('images/h' + i + '.jpg'));
  }

  // Load flower images
  for (let i = 1; i <= numberOfFlowerImages; i++) {
    flowerImages.push(loadImage('images/f' + i + '.png'));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageWidth = images[0].width;
  imageHeight = images[0].height;

  // Create and populate month select dropdown
  monthSelect = createSelect();
  for (let i = 1; i <= 12; i++) {
    monthSelect.option(i);
  }
  
  // Create and populate day select dropdown
  daySelect = createSelect();
  for (let i = 1; i <= days[1]; i++) {
    daySelect.option(i);
  }
  monthSelect.changed(monthSelected);
  daySelect.changed(daySelected);

  // Initialize day and month selections
  daySelected();
  changeDays();
  monthSelected();
}

function addFlowers() {
  // Get the selected month
  let selectedMonth = int(monthSelect.value());
  // Ensure the correct row is accessed for the selected month
  let row = flowerData.getRow(selectedMonth - 1);

  if (row !== null) {
    let flowerX = 50;
    let flowerY = height - 300;
    let flowerGap = windowWidth / 5 - 250;

    // Draw flower images based on data for the selected month
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
  // Calculate the number of days passed in the year
  daysPassed = sumDays[month - 1] + day;
  daysPassed = (daysPassed + 153) % 366;
  
  // Determine the current image index based on days passed
  currentImageIndex = 0;
  while (daysPassed > sumDaysMapping[currentImageIndex]) {
    currentImageIndex++;
  }
  currentImageIndex = currentImageIndex % numberOfImages;

  console.log("Days Passed:", daysPassed);
}

function monthSelected() {
  // Update the month and reset the day
  month = int(monthSelect.value());
  day = 1;
  daySelect.value(day);
  changeDays();
  addFlowers();
}

function daySelected() {
  // Update the day and change the background image
  day = int(daySelect.value());
  changeDays();
}

function draw() {
  background(0);

  // Calculate the position for the background image
  let x = width / 2 - imageWidth / 2;
  let y = height / 2 - imageHeight / 2;

  // Draw the background image
  image(images[currentImageIndex], x, y);

  // Draw the date and dropdown menus
  textSize(20);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(25);
  text("2024 /", width / 2, 20);
  monthSelect.position(width / 2 + 45, 20);
  text("/", width / 2 + 100, 20);
  daySelect.position(width / 2 + 110, 20);

  // Draw the flowers on top of the background image
  addFlowers();
}
