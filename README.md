# MyWeatherData ⛈⛈


## Description: 
MyWeatherData is a command-line interface designed to give the user quick and easy access to accurate weather forecasting.

MyWeatherData works through zip codes. Upon installation, the default zip code is set to 10001. 

MyWeatherData uses [Chalk](https://www.npmjs.com/package/chalk). By default, the theme color is set to #61DBFB.

## Installation

npm install -g myweatherdata

## Usage

### Command List:

**$mwd**: will print the weather chart for default zip code to the terminal.

**$mwd** **-z** **\<Input Zip Code>**: Print weather chart for spesified zipcode to the terminal.

**$mwd** **-sz** **\<Input Zip Code>**: Set the default zip code for the application.

**$mwd** **-st** **\<Input Hex Code>**: Set the default theme color for the application (ommit '#').

**$mwd -h**: Show help interface.

## Resources:

**API:** [Open Weather Map](https://openweathermap.org/api)

**npm** **modules**: The modules used can be found inside my [package.json](https://github.com/amortensen1229/WeatherDataCLI/blob/main/package.json) file.
