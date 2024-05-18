let images = [];
let flowerImages = [];
let numberOfImages = 26;
let numberOfFlowerImages = 12;
let imageWidth, imageHeight;
let currentImageIndex = 0; 
let currentFlowerImageIndex = 0;
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

let sumDaysMapping = []

for (let i = 0; i < daysMapping.length; i++) {
  sumDaysMapping[i] = daysMapping[i] + (sumDaysMapping[i - 1] || 0);
}

let days = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let sumDays = [0];

for (let i = 1; i < days.length; i++) {
  sumDays[i] = days[i] + sumDays[i - 1];
}

function preload() {
  flowerData = loadTable('flowers.csv', 'csv', 'header', loadData); // Load CSV data and call loadData function when done

  for (let i = 1; i <= numberOfImages; i++) {
    images.push(loadImage('images/h' + i + '.jpg'));
  }

  for(let i = 1; i <= numberOfFlowerImages; i++){
    flowerImages.push(loadImage('images/f' + i + '.png'))
  }

  console.log("Order of flower images:", flowerImages);
}

function loadData(data) {
  // Extract month names from the CSV file
  for (let i = 0; i < data.getRowCount(); i++) {
    monthNames.push(data.getString(i, 'Month'));
    let month = data.getString(i, 'Month');
    let flowerObj = {};
    flowerObj['Lilies'] = data.getNum(i, 'Lilies');
    flowerObj['Asters'] = data.getNum(i, 'Asters');
    flowerObj['Irises'] = data.getNum(i, 'Irises');
    flowerObj['Stock'] = data.getNum(i, 'Stock');
    flowerObj['Ranunculus'] = data.getNum(i, 'Ranunculus');
    flowerObj['Daffodils'] = data.getNum(i, 'Daffodils');
    flowerObj['Hyacinths'] = data.getNum(i, 'Hyacinths');
    flowerObj['Orchids'] = data.getNum(i, 'Orchids');
    flowerObj['Snapdragons'] = data.getNum(i, 'Snapdragons');
    flowerObj['Sunflowers'] = data.getNum(i, 'Sunflowers');
    flowerObj['Lavenders'] = data.getNum(i, 'Lavenders');
    flowerObj['Gardenias'] = data.getNum(i, 'Gardenias');
    monthData[month] = flowerObj;
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
  monthSelect.changed(monthSelected);
  
  daySelect = createSelect();
  for (let i = 1; i <= days[1]; i++) {
    daySelect.option(i);
  }
  daySelect.changed(daySelected);

  changeDays();
}

function monthSelected() {
  month = int(this.value());
  // Update the day select box options based on the selected month
  daySelect.remove();
  daySelect = createSelect();
  for (let i = 1; i <= days[month]; i++) {
    daySelect.option(i);
  }
  daySelect.changed(daySelected);
  
  // Ensure the currently selected day is valid for the selected month
  let selectedDay = int(daySelect.value());
  if (selectedDay > days[month]) {
    daySelect.value(days[month]); // Set the day to the maximum for the selected month
    day = days[month];
  } else {
    day = selectedDay;
  }
  
  changeDays(); // Call changeDays() when the month changes
}

function daySelected() {
  day = int(this.value());
  changeDays(); // Call changeDays() when the day changes
}

function changeDays() {
  daysPassed = sumDays[month - 1] + day;
  daysPassed = (daysPassed + 153) % 366;
  
  // Update the index of the flower image based on the current date
  currentFlowerImageIndex = 0;
  while (daysPassed > sumDaysMapping[currentFlowerImageIndex]) currentFlowerImageIndex++;
  currentFlowerImageIndex = currentFlowerImageIndex % numberOfFlowerImages;

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

  // Display the selected flower image
  let flowerX = width / 2 + 50; // Adjust the position of the flower image
  let flowerY = height / 2 - imageHeight / 2;
  image(flowerImages[currentFlowerImageIndex], 100, windowHeight - 300);

  textSize(20);
  fill(255);
  textAlign(CENTER, TOP);
  textSize(25);
  text("2024 /", width / 2, 20);
  monthSelect.position(width / 2 + 45, 20);
  text("/", width / 2 + 100, 20);
  daySelect.position(width / 2 + 110, 20);
}