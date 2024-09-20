import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
} from "react-icons/wi";
import { PiCloudSun } from "react-icons/pi";

const Icon = ({ weather }) => {
  let icon;
  switch (weather) {
    case "Sunny":
      icon = <WiDaySunny />;
      break;
    case "Clear":
      icon = <PiCloudSun />;
      break;
    case "Clouds":
      icon = <WiCloudy />;
      break;
    case "Rain":
      icon = <WiRain />;
      break;
    case "Snow":
      icon = <WiSnow />;
      break;
    case "Thunderstorm":
      icon = <WiThunderstorm />;
      break;
    case "Haze":
      icon = <WiFog />;
      break;
    default:
      icon = <WiDaySunny />; // Default icon if the weather type is not recognized
  }

  return <div>{icon}</div>;
};

export default Icon;
