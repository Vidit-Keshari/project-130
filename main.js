var text_1 = "WELCOME to AI DJ webapp where you can play DJ using your hands in front of your camera";
var text_2 = text_1 + " Note:- Put your left hand in front of camera to play birthday song and right hand to play Harry Potter tittle song";

harry_music = "";
birthday_music = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreRightWrist = 0;
scoreLeftWrist = 0;
music_status = "";
rightWritStatus = "";

function preload() {
    harry_music = loadSound("harry_potter_music.mp3");
    birthday_music = loadSound("happy_birthday_song.mp3");
}

function welcome() {
    window.alert(text_1);
    console.log(text_1);
}

function wel_note () {
    window.alert(text_2);
    console.log(text_2);
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on('pose', gotposes);
}

function modalLoaded() {
    console.log("Posenet is loaded and initialized succesfully");
    window.alert("Posenet is loaded and initialized succesfully");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill('#000033');
    stroke('#000033');
    music_status = birthday_music.isPlaying();
    rightWritStatus = harry_music.isPlaying();
    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 24);
        harry_music.stop();
    }
    if(music_status == false) {
        birthday_music.play();
    }else if(music_status == true) {
        birthday_music.stop();
        document.getElementById("song_name").innerHTML = "Playing Birthday Song";
    }

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 24);
        birthday_music.stop();
    }
    if(rightWritStatus == false) {
        harry_music.play();
    } else if(rightWritStatus == true) {
        harry_music.stop();
        document.getElementById("song_name").innerHTML = "Playing harry potter theme";
    }
}

function gotposes(results) {
    if(results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[9].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " +  leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}