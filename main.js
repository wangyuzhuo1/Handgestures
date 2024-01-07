
Webcam.set({
    width:350, 
    height:300,
    img_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_img" src="' +data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nbzYuzP3e/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data = toSpeak();
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('capture_img');
    classifier.classify(img, gotResults);
}

function gotResults(error, results){
if(error){
    console.error(error)
}
else{
    console.log(results)
    document.getElementById("result_gesture_name").innerHTML=results[0].label
    document.getElementById("result_gesture_name2").innerHTML=results[1].label
    prediction_1 = results[0].label
    prediction_2 = results[1].label
    speak()
    if(results[0].label=="Okay"){
        document.getElementById("update_hand").innerHTML="&#128076;"
    }
    if(results[0].label=="Alien Hand"){
        document.getElementById("update_hand").innerHTML="&#128406;" 
    }
    if(results[0].label=="Spider Man"){
        document.getElementById("update_hand").innerHTML="&#129304;"
    }
    if(results[1].label=="Okay"){
        document.getElementById("update_hand").innerHTML="&#128076;"
    }
    if(results[1].label=="Alien Hand"){
        document.getElementById("update_emoji2").innerHTML="&#128406;" 
    }
    if(results[1].label=="Spider Man"){
        document.getElementById("update_emoji2").innerHTML="&#129304;"
    }
}

}









