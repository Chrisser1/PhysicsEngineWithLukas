let objects: ObjectsManager;
let objectWidth: number;
let objectHeight: number;
let objectDiameter: number;
let sliderWidth: HTMLInputElement;
let sliderHeight: HTMLInputElement;
let sliderDiameter: HTMLInputElement;
let type: objectTypes;
let static: boolean;
let bulldozerMode: boolean;

// This function is called once when the program starts
function setup() {
  objects = new ObjectsManager();

  // Create the canvas
  let cnv = createCanvas(900, 500);
  cnv.position((windowWidth - width) / 2);

  // get the width, height and diameter from the HTML Slider
  sliderWidth = document.getElementById("sliderWidth") as HTMLInputElement;
  sliderHeight = document.getElementById("sliderHeight") as HTMLInputElement;
  sliderDiameter = document.getElementById(
    "sliderDiameter"
  ) as HTMLInputElement;


}

// This function is called every frame
function draw() {
  background(225);
  objects.tick();

  let ObjectType = document.getElementById("type") as HTMLInputElement;
  if (ObjectType.checked) {
    type = objectTypes.Circle;
  } else {
    type = objectTypes.Rect;
  }

  let objectDelete = document.getElementById("delete") as HTMLInputElement;
  bulldozerMode = objectDelete.checked;

  let objectIsStatic = document.getElementById("static") as HTMLInputElement;
  static = objectIsStatic.checked;

  if (bulldozerMode === false) {
    objectWidth = Number(sliderWidth.value);
    objectHeight = Number(sliderHeight.value);
    objectDiameter = Number(sliderDiameter.value);
    objects.preview(objectWidth, objectHeight, objectDiameter, type);
  }
}

/**
 * This function is called when the mouse is clicked.
 * @param event - The `MouseEvent` that is passed as an argument.
 */
function mouseClicked(event: MouseEvent) {
  if (bulldozerMode) {
    objects.deleteObject(mouseX, mouseY, type);
  } else {
    objects.createObject(
      objectWidth,
      objectHeight,
      objectDiameter,
      type,
      static
    );
  }
}
