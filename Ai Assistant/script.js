const recognition=new(window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang="en-US"

const btn=document.querySelector("#btn")
btn.addEventListener("click",()=>{
    speak("How can I help you")
    setTimeout(()=>{
        speak("Listening...")
        btn.innerHTML="Listening ..."
        btn.style.backgroundColor="red"
        recognition.start()
    },2000)
     function speak(text){
        const abc=new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(abc)
     }
    function handleCommands(command,altcommand){
        if(command.includes("open youtube")){
            speak("Opening youtube....")
            window.open("https://www.youtube.com","_blank")
        }else if(command.includes("open facebook")){
            speak("Opening facebook....")
            window.open("https://www.facebook.com","_blank")
        }else if(command.includes("open google")){
            speak("Opening google....")
            window.open("https://www.google.com","_blank")
        }else if(command.includes("open instagram")){
            speak("Opening instagram....")
            window.open("https://www.instagram.com","_blank")
        }else{
            speak("Searching on google...")
            window.open(`https://www.google.com/search?q=${command}`,"_blank")
        }
    }
    
    recognition.onresult=((event)=>{
        const command=event.results[0][0].transcript.toLowerCase().split("siri")[1]
        handleCommands(command)
    })
    recognition.onend=(()=>{
        btn.innerHTML="🎙️ Start Listening"
        btn.style.backgroundColor=" #4CAF50"
    })

}) 