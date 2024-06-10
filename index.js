
function shapeFunction(x, y) { 
    console.log("Target X " + x + " squared is " + x**2)
    console.log("Target Y " + y + "squared is " + y**2)
    console.log("Their sum is " + (x**2 + y**2))
    return x**2 + y**2
}

function signVal () {
    let val = Math.random()
    if (val < 0.5){
        return val = -1
    }
    else{
        return val = 1
    }
}

function createTargetValues(boundary){
    let targetCoordinates = []
    let coordsUnacceptable = true
    let loopIndex = 0
    while(coordsUnacceptable){
        console.log("Coordinates will pass? " + !coordsUnacceptable)
        console.log("Entering Loop for the " + loopIndex + " time.")
        console.log("Sign value is " + signVal())
        const targetX = Math.random() * boundary * signVal()
        console.log("X is " + targetX)
        const targetY = (1 - targetX **2) **0.5 * signVal() * Math.random()
        console.log("Y is " + targetY)
        const shapeTest = shapeFunction(targetX, targetY)
        console.log("Shape results " + shapeTest + " which must be less than " + boundary)
        console.log("Logic test result is " + (shapeTest <= boundary))
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

function orientDetector(){

}

function summatePixelSpace(){

}

const radius = 1
const targetVals = createTargetValues(radius)

const detectorLength = 3
const pixelTotal = 32
const pixelLength = detectorLength / pixelTotal
const pixelCenter = pixelLength / 2
const pixelHolder = new Map()
const pixelObjs = []
for (var pixelNum = 1; pixelNum <= pixelTotal; pixelNum++){
    pixelHolder.set(pixelNum, [])
}

const steps = 60
const rotationAngle = 360/steps
const maxUnit = radius * 2
const onePercent = maxUnit/100

for(var angle = 0; angle <= 360; angle +=rotationAngle){
    pixelHolder.forEach(pixel =>{
        
    })
}






console.log("Program terminated")