prediction="";
Webcam.set({
 width:330,
 height:300,
 image_format:'png',
 png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri +'"/>';
    });
}
console.log('ml5.version is',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oH20OcAoW/model.json',modelLoaded);
function modelLoaded(){
    console.log('Model Loaded!');

}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
    var utterThis= new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check(){

   
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);

}
function gotResult(error,results){
     if(error){
         console.error(error);
     }
     else{
         console.log(results);
         
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction=results[0].label;
        toSpeak="";
        
       if(results[0].label=="All the best"){
           document.getElementById("update_emoji").innerHTML="&#128077";
           toSpeak="All the best";
       }
       if(results[0].label=="Yo"){
        document.getElementById("update_emoji").innerHTML="&#129304";
        toSpeak="Yo";
       }
       if(results[0].label=="Victory"){
        document.getElementById("update_emoji").innerHTML="&#9996";
        toSpeak="That was a marvelous victory.";
       }
       if(results[0].label=="Amazing"){
           document.getElementById("update_emoji").innerHTML="&#128076";
           toSpeak="This looks amazing";
       }
       if(results[0].label=="Fist"){
        document.getElementById("update_emoji").innerHTML="&#128074";
        toSpeak="This was a fist";
    }
       speak();
     }
}