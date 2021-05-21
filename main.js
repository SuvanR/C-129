sound = " ";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    sound = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("Posenet is Intialized");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#DC143C');
    stroke('#DC143C');
    
    if(score_leftwrist > 0.2){
    circle(leftWristX,leftWristY,20);
    InleftwristY = Number(leftWristY);
    remove_decimals = floor(leftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "volume = "+volume;
    sound.setvolume(volume);
    }
}

function play() {
    sound.play();
    sound.setvolume(1);
    sound.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
    console.log(results);
    score_leftwrist = results[0].pose.keypoints[9].score;
    console.log("score leftwrist = "+score_leftwrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("left Wrist X = "+leftWristX+"left wrist y = "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWrsitY = results[0].pose.rightWrist.y;
    console.log("right wrist x = "+rightWristX+"right wrist y = "+rightWristY);
    }
}
