function setup(){
    canvas = createCanvas(500,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    posenet = ml5.poseNet(video, modalLoaded)
    posenet.on("pose", gotPoses)
}
function modalLoaded(){
    console.log("posenet loaded")
}
function draw(){
    image(video,0,0,500,500)
    fill("#655aff")
    stroke("#655aff")
    if(scoreRW > 0.4){
        circle(RWX,RWY,20)
        if(RWY>0 && RWY<= 100){
            document.getElementById("Speedtime").innerHTML = "Speed = 0.5x"
            song.rate(0.5)
        }
        else if(RWY>100 && RWY<=200){
            document.getElementById("Speedtime").innerHTML= "Speed = 1.0x"
            song.rate(1)
        }
        else if(RWY>200 && RWY<= 300){
            document.getElementById("Speedtime").innerHTML= "Speed = 1.5x"
            song.rate(1.5)
        }
        else if(RWY>300 && RWY<=400){
            document.getElementById("Speedtime").innerHTML = "Speed = 2.0x"
            song.rate(2)
        }
        else if(RWY>400 && RWY<= 500){
            document.getElementById("Speedtime").innerHTML = "Speed = 2.5x"
            song.rate(2.5)
        }
    }
    if(scoreLW > 0.4){
        circle(LWX, LWY, 20)

        LeftYCord = Number(LWY)
        decimal = floor(LeftYCord)
        Volume = decimal/500
        document.getElementById("volumetime").innerHTML = "Volume = "+Volume
        song.setVolume(Volume);
    }
}
song=""
LWX = "0";
LWY = "0";
RWX = "0";
RWY = "0";
scoreLW = "0";
scoreRW = "0";
function preload(){
    song= loadSound("music.mp3")
}
function start(){
    song.play()
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        scoreLW = results[0].pose.keypoints[9].score;
        scoreRW = results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist = "+scoreLW+", Score Right Wrist = "+scoreRW)
        LWX = results[0].pose.leftWrist.x;  
        LWY = results[0].pose.leftWrist.y;
        console.log("Left wrist X = "+LWX+ " left wrist Y = "+LWY);
        RWX = results[0].pose.rightWrist.x;
        RWY = results[0].pose.rightWrist.y;
        console.log("Right wrist X = "+RWX+ " Right wrist Y = "+RWY);
    }
}