
//Create a class to store pixel data
class Pixel{
    constructor(num, leftBound, rightBound){
        this.num = num;
        this.leftBound = leftBound;
        this.rightBound = rightBound;
        this.signalList = []
        this.signalTotal = 0
    }
}

//Create a function to derfine the shape of the object in question
function shapeFunction(x, y) { 
    // console.log("Target X " + x + " squared is " + x**2)
    // console.log("Target Y " + y + "squared is " + y**2)
    // console.log("Their sum is " + (x**2 + y**2))
    return x**2 + y**2
}

//Create a function to randomly develp + or - values to generate a target signal X or Y coordinate
function signVal () {
    let val = Math.random()
    if (val < 0.5){
        return val = -1
    }
    else{
        return val = 1
    }
}

//Create a function to randomly generate signal X,Y coordinates
function createTargetValues(boundary){
    let targetCoordinates = []
    let coordsUnacceptable = true
    let loopIndex = 0
    //Create a loop to run until the coordinates are within parameters
    while(coordsUnacceptable){
        // console.log("Coordinates will pass? " + !coordsUnacceptable)
        // console.log("Entering Loop for the " + loopIndex + " time.")
        // console.log("Sign value is " + signVal())
        //Randomly create a X coordinate within set boundaries
        const targetX = Math.random() * boundary * signVal()
        // console.log("X is " + targetX)
        //Randomly create a Y coordinate within set boundaries
        const targetY = (1 - targetX **2) **0.5 * signVal() * Math.random()
        // console.log("Y is " + targetY)
        const shapeTest = shapeFunction(targetX, targetY)
        // console.log("Shape results " + shapeTest + " which must be less than " + boundary)
        // console.log("Logic test result is " + (shapeTest <= boundary))
        //Test if the coordinates can be within the shape. If not, rerun themllop. If so, exit the loop
        if(shapeTest <= boundary){
            targetCoordinates.push(targetX, targetY)
            console.log("Coordinates are " + targetCoordinates)
            coordsUnacceptable = false
        }
        loopIndex = loopIndex + 1
        if(loopIndex > 50){
            break
        }
    }
    return targetCoordinates
}

//Create a function to calculate the X,Y coordinates of a sample
function detectShapePoint(lateralPos, distFromDetector, angle){
    const xCoord = (lateralPos * Math.cos(angle) - distFromDetector * Math.sin(angle))
    const yCoord = (lateralPos * Math.sin(angle) + distFromDetector * Math.cos(angle))
    return [xCoord, yCoord]
}

//Define constants for the shape
const radius = 1

//Create random X,Y target coordinates for the 
const targetVals = createTargetValues(radius)

//Define cosntants for the detector
const steps = 60
const rotationAngle = 360/steps
const maxUnit = radius * 2
const onePercent = maxUnit/100
const detectorLength = 3
const pixelTotal = 32
const pixelLength = detectorLength / pixelTotal
const pixelHolder = new Map()

//Define the pixel location [left boundary, right boundary]
let pixelLoc = [-detectorLength/2, ((-detectorLength/2)+pixelLength)]

//Create a series of pixels held in a map for fast operation
for (let pixelNum = 1; pixelNum <= pixelTotal; pixelNum++){
    pixelHolder.set(pixelNum, new Pixel(pixelNum, pixelLoc[0], pixelLoc[1]))
    pixelLoc = [pixelLoc[0]+pixelLength, pixelLoc[1]+pixelLength]
}

//Iterate trhough each rotation
for(let angle = 0; angle <= 360; angle +=rotationAngle){
    //Iterate through each pixel, collecting data
    // console.log("Currently working on angle, " + angle)
    for(let pixelNum = 1; pixelNum < pixelTotal+1; pixelNum++){
        const pixel = pixelHolder.get(pixelNum)
        const angleMap = new Map()
        const signalForAngle = []
        // console.log("Current Pixel is: " + pixel)
        // console.log("leftBound = " + pixel.leftBound)
        // console.log("rightBound = " + pixel.rightBound)
        // console.log("Current signal values " + typeof(pixel.signal))
        //Gather the datafor each lateral ray eminating from each pixel (along the axis of the detector)
        for(let lateralPos = pixel.leftBound; lateralPos < pixel.rightBound; lateralPos+=(pixelLength/0.1)){
            // console.log("Gathering lateral data")
            // console.log("Gathering lateral pos " + lateralPos)
            //Gather each point along the lateral ray moving from the detector to the end of the object
            for(let distFromDetector = 0; distFromDetector < 2; distFromDetector+=0.1){
                let sampleCoords = detectShapePoint(lateralPos, distFromDetector, angle)
                // console.log("Sample coordinates " + sampleCoords)
                // console.log("Target coordindates " + targetVals)
                if((Math.abs(sampleCoords[0]) -  Math.abs(targetVals[0])) < 0.001 && (Math.abs(sampleCoords[1]) -  Math.abs(targetVals[1])) < 0.001){
                    signalForAngle.push(1)
                    pixel.signalTotal+= 1
                }
                else{
                    signalForAngle.push(0)
                }
            }
        }
        angleMap.set(angle, signalForAngle)
        pixel.signalList.push(angleMap)
    }
}

//Test the data to see what it looks like
for(let index = 1; index < 33; index++){
    console.log(pixelHolder.get(index))
}




console.log("Program terminated")
