// Tabs


const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    contents.forEach(c => c.classList.remove("active"));
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// Chat
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const stepCheckbox = document.getElementById("step-by-step");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", e => { if(e.key === "Enter") sendMessage(); });
function appendMessage(sender, text){
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  msg.innerText = text;
  chatBox.appendChild(msg);

  // save to history
  

  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth"
  });
}



function appendTyping(){
  const typing = document.createElement("div");
  typing.classList.add("message", "ai", "typing");
  typing.innerHTML = '<span></span><span></span><span></span>';
  chatBox.appendChild(typing);
  chatBox.scrollTop = chatBox.scrollHeight;
  return typing;
}

async function appendStepByStep(answer){
  const steps = answer.split("\n").filter(s => s.trim()!=="");
  for(const step of steps){
    const typingElem = appendTyping();
    await new Promise(r => setTimeout(r, 1000));
    typingElem.remove();
    appendMessage("ai", step);
  }
}

async function sendMessage(){
  const question = userInput.value.trim();
  if(!question) return;
  appendMessage("user", question);
  userInput.value = "";
  const step = stepCheckbox.checked;

  try {
    // Mock response (replace with backend API call)
    const mockAnswer = step ?
      "Step 1: Understand the concept.\nStep 2: Break it into parts.\nStep 3: Practice examples.\nStep 4: Revise." :
      "This is the answer to your question: " + question;
    await appendStepByStep(mockAnswer);
  } catch(err){
    appendMessage("ai", "Error: Cannot reach server.");
  }
}

// Summarizer
document.getElementById("summarize-btn").addEventListener("click", async ()=>{
  const text = document.getElementById("summary-text").value.trim();
  if(!text) return;
  const result = document.getElementById("summary-result");
  result.innerText = "Summarizing...";
  await new Promise(r => setTimeout(r, 1000)); // mock delay
  result.innerText = "Summary: This is a mock summary of your text.";
});

// Quiz Generator
document.getElementById("quiz-btn").addEventListener("click", async ()=>{
  const topic = document.getElementById("quiz-topic").value.trim();
  const num = document.getElementById("num-questions").value || 5;
  if(!topic) return;
  const result = document.getElementById("quiz-result");
  result.innerText = "Generating quiz...";
  await new Promise(r => setTimeout(r, 1000)); // mock delay
  result.innerText = `Quiz on "${topic}":\n1. Question 1\n2. Question 2\n3. Question 3\n...`;
});

const themeBtn = document.getElementById("theme-toggle");

themeBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("light-mode");
});
const voiceBtn = document.getElementById("voice-btn");

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = "en-US";

voiceBtn.addEventListener("click", ()=>{
  recognition.start();
});

recognition.onresult = function(event){
  const transcript = event.results[0][0].transcript;
  userInput.value = transcript;
};
