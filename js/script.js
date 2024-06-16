const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");

// Set default background image saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("weatherIcon").style.backgroundImage =
    "url('images/default.jpg')";
});

// Event listener untuk input kota saat menekan tombol Enter
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission
    getWeatherData();
  }
});

// Event listener untuk tombol getWeatherBtn
getWeatherBtn.addEventListener("click", function () {
  getWeatherData();
});

// Fungsi untuk mengambil data cuaca dari OpenWeatherMap API
function getWeatherData() {
  const city = cityInput.value.trim(); // Mengambil nilai input kota, dan menghilangkan spasi ekstra
  const apiKey = "91bbacb09bc80341dc61bde2982d8bbf";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Mengatur background image sesuai dengan cuaca
  const weatherDetails = document.getElementById("weatherDetails");
  weatherDetails.innerHTML = `
    <div class="flex items-center justify-between">
      <div class="skeleton short"></div>
      <div class="skeleton"></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="skeleton short"></div>
      <div class="skeleton"></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="skeleton short"></div>
      <div class="skeleton"></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="skeleton short"></div>
      <div class="skeleton"></div>
    </div>
  `;

  axios
    .get(apiUrl)
    .then((response) => {
      const data = response.data;
      const weatherElement = document.getElementById("weather");
      const weatherDetails = document.getElementById("weatherDetails");
      const iconCode = data.weather[0].icon;
      const temperature = Math.round(data.main.temp);
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      // Menampilkan informasi cuaca
      weatherElement.innerHTML = `
        <div class="flex flex-col lg:flex-row w-full items-center gap-2 md:gap-4 lg:gap-8">
          <h2 class="text-4xl md:text-5xl font-bold text-white">${temperature} °C</h2>
          <h5 class="text-xl text-white">${data.name}, ${data.sys.country}</h5>
          <div class="text-white flex items-center flex-col">
            <img src="${iconUrl}" alt="Weather Icon" class="w-20" />
            <span class="capitalize text-lg font-normal">${data.weather[0].main}</span>
          </div>
        </div>
      `;

      // Menampilkan detail cuaca
      weatherDetails.innerHTML = `
        <div class="flex items-center justify-between">
          <h2 class="capitalize">cloudy</h2>
          <p>${data.clouds.all}%</p>
        </div>
        <div class="flex items-center justify-between">
          <h2 class="capitalize">humidity</h2>
          <p>${data.main.humidity}%</p>
        </div>
        <div class="flex items-center justify-between">
          <h2 class="capitalize">wind</h2>
          <p>${data.wind.speed} m/s</p>
        </div>
        <div class="flex items-center justify-between">
          <h2 class="capitalize">rain</h2>
          <p>${data.rain ? data.rain["1h"] : 0} mm</p>
        </div>
      `;

      // Logika untuk menampilkan gambar latar belakang berdasarkan cuaca
      if (data.weather[0].main.toLowerCase().includes("rain")) {
        weatherIcon.style.backgroundImage = "url('images/rain.jpg')";
      } else if (data.weather[0].main.toLowerCase().includes("clear")) {
        weatherIcon.style.backgroundImage = "url('images/clear.jpg')";
      } else if (data.weather[0].main.toLowerCase().includes("cloud")) {
        weatherIcon.style.backgroundImage = "url('images/cloud.jpg')";
      } else if (data.weather[0].main.toLowerCase().includes("snow")) {
        weatherIcon.style.backgroundImage = "url('images/snow.jpg')";
      } else {
        weatherIcon.style.backgroundImage = "url('images/default.jpg')";
      }
    })
    .catch(() => {
      // Menampilkan pesan kesalahan jika kota tidak ditemukan
      Swal.fire({
        icon: "error",
        title: "City not found!",
        text: "Please enter a valid city name.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      // Reset gambar latar belakang ke default
      document.getElementById("weatherIcon").style.backgroundImage =
        "url('images/default.jpg')";
    });
}
