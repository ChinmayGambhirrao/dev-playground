// This is a Typescript interface. It defines the structure or shape of the response we expect from the OpenWeatherMap API

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}
