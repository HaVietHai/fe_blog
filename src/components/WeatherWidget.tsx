// src/components/WeatherWidget.tsx
import { useEffect, useState } from "react";
import cloudsJson from "../assets/weathers/Clouds.json";
import thunderJson from "../assets/weathers/Weather-storm.json";
import sunnyJson from "../assets/weathers/HappySUN.json";
import rainnyJson from "../assets/weathers/rainyicon.json";
import WeatherOverlay from "./Forms/WeatherOverlay";

interface WeatherData {
  city: string;
  temperature: number;
  windspeed: number;
  weathercode: number;
}

const cities = [
  { name: "Hà Nội", lat: 21.0285, lon: 105.8542 },
  { name: "TP. Hồ Chí Minh", lat: 10.7626, lon: 106.6602 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
];

// Mã -> mô tả
const getWeatherText = (code: number) => {
  const map: Record<number, string> = {
    0: "Trời quang",
    1: "Ít mây",
    2: "Có mây",
    3: "Nhiều mây",
    45: "Sương mù",
    51: "Mưa nhẹ",
    61: "Mưa vừa",
    95: "Dông nhẹ",
    96: "Dông",
    99: "Dông mạnh",
  };
  return map[code] || "Không rõ";
};

// Mode hiển thị animation
type OverlayMode = "clouds" | "clouds-thunder" | "fog" | "sunny" | "rain";

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayMode, setOverlayMode] = useState<OverlayMode>("clouds");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const results: WeatherData[] = [];

        for (const city of cities) {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`
          );
          const data = await res.json();
          const w = data.current_weather;
          results.push({
            city: city.name,
            temperature: w.temperature,
            windspeed: w.windspeed,
            weathercode: w.weathercode,
          });
        }

        setWeather(results);
      } catch (err) {
        console.error("Fetch weather failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const handleCityClick = (w: WeatherData) => {
    const code = w.weathercode;
    let mode: OverlayMode = "clouds";

    if ([0, 1].includes(code)) mode = "sunny";
    else if ([2, 3].includes(code)) mode = "clouds";
    else if ([45].includes(code)) mode = "fog";
    else if ([51, 61].includes(code)) mode = "rain";
    else if ([95, 96, 99].includes(code)) mode = "clouds-thunder";

    setOverlayMode(mode);
    setOverlayOpen(true);
  };

  if (loading) {
    return (
      <div className="p-4 text-white border border-cyan-400 rounded-2xl bg-black/50">
        Đang tải thời tiết...
      </div>
    );
  }

  return (
    <>
      <div className="p-4 border border-cyan-400 rounded-2xl bg-black/50 text-white mt-4">
        <h2 className="text-cyan-400 font-semibold text-lg mb-3 flex items-center gap-1">
          ☁️ Thời tiết
        </h2>
        <ul className="space-y-2">
          {weather.map((w, index) => (
            <li
              key={index}
              onClick={() => handleCityClick(w)}
              className="flex justify-between items-center text-sm border-b border-gray-700 pb-1 cursor-pointer transition-all hover:text-cyan-300 hover:scale-[1.02]"
            >
              <span className="font-medium">{w.city}</span>
              <span>
                {w.temperature}°C • {getWeatherText(w.weathercode)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <WeatherOverlay
        open={overlayOpen}
        onClose={() => setOverlayOpen(false)}
        mode={overlayMode}
        durationMs={4000}
        lottieCloud={cloudsJson}
        lottieThunder={thunderJson}
        lottieSunny={sunnyJson}
        lottieRain={rainnyJson}
      />
    </>
  );
};

export default WeatherWidget;
