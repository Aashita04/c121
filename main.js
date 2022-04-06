function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet' , modelLoaded)
}

function modelLoaded(){
  console.log("Model Loaded!");
}

function draw(){
  image(video,0,0,300,300);
  classifier.classify(video, gotResult);
}

var previous= ""

function gotResult(error, result){
  if (error){
    console.log(error);
  }
  else{
    if ((result[0].confidence > 0.5) && (previous != result[0].label)){
      console.log(result);
      previous= result[0].label;
      var synth= window.speechSynthesis;
      var speak_data="Object detected is : " + result[0].label;
      var utterThis= new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("object").innerHTML = result[0].label;
      document.getElementById("accuracy").innerHTML = result[0].confidence.toFixed(3);

    }

    
  }
}

