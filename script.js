// Quiz Section
const quizData = [
    {
      question: "Which tag is used to link JavaScript to HTML?",
      options: ["<js>", "<script>", "<link>", "<style>"],
      answer: "<script>"
    },
    {
      question: "Which property in CSS is used for layout grid?",
      options: ["grid-template", "display", "grid-area", "all of these"],
      answer: "all of these"
    },
    {
      question: "Which method is used to fetch API data?",
      options: ["getData()", "fetch()", "request()", "call()"],
      answer: "fetch()"
    }
  ];
  
  let current = 0, score = 0;
  
  function loadQuiz() {
    const q = quizData[current];
    document.getElementById("question").innerText = q.question;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = '';
    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => {
        if (option === q.answer) score++;
        document.getElementById("score-display").innerText = `Score: ${score}/${quizData.length}`;
      };
      optionsDiv.appendChild(btn);
    });
  }
  
  document.getElementById("next-btn").onclick = () => {
    current++;
    if (current < quizData.length) {
      loadQuiz();
    } else {
      document.getElementById("question").innerText = "Quiz Completed!";
      document.getElementById("options").innerHTML = '';
      document.getElementById("next-btn").style.display = "none";
    }
  };
  
  loadQuiz();
  
  // Carousel Section
  const images = [
    "https://picsum.photos/id/1015/600/300",
    "https://picsum.photos/id/1016/600/300",
    "https://picsum.photos/id/1018/600/300"
  ];
  let imgIndex = 0;
  const imgEl = document.getElementById("carousel-image");
  
  function nextSlide() {
    imgIndex = (imgIndex + 1) % images.length;
    imgEl.src = images[imgIndex];
  }
  
  function prevSlide() {
    imgIndex = (imgIndex - 1 + images.length) % images.length;
    imgEl.src = images[imgIndex];
  }
  
  // Weather API
  function getWeather() {
    const city = document.getElementById("cityInput").value.toLowerCase();
    const weatherEl = document.getElementById("weatherOutput");
    let coords = {
      delhi: { lat: 28.61, lon: 77.23 },
      mumbai: { lat: 19.07, lon: 72.87 },
      chennai: { lat: 13.08, lon: 80.27 }
    };
  
    if (!coords[city]) {
      weatherEl.innerText = "Supported cities: Delhi, Mumbai, Chennai.";
      return;
    }
  
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords[city].lat}&longitude=${coords[city].lon}&current_weather=true`)
      .then(res => res.json())
      .then(data => {
        weatherEl.innerText = `Current Temperature in ${city.toUpperCase()}: ${data.current_weather.temperature}°C`;
      })
      .catch(() => {
        weatherEl.innerText = "Failed to fetch weather data.";
      });
  }
  