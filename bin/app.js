#!/usr/bin/env node

// Require Statements:
// Modules:
//==========================================
const chalk = require('chalk');
const axios = require('axios');
const zip = require('zipcodes');
const fs = require('fs');
const { program } = require('commander');
program.version('0.0.1');
const Configstore = require('configstore');
const packageJson = require('../package.json');
//==========================================

// Local Files:
//==========================================
const apiKey = require('./ApiKey.json');
const Settings = require('./Settings.js');
//==========================================



program.option('-z, --zip <input_zip>', 'Enter non-default zip.');
program.option('-sz, --setzip <input_default_zip>', 'Enter desired default zip (persistant).');
program.option('-st, --settheme <input_theme_hex>', 'Enter hex code to set default theme color (ommit "#").');
program.parse(process.argv);

const config = new Configstore(packageJson.name);

// Setting Default Values in Config:
if (!(config.has('ThemeColor') && config.has('ZipCode'))) {
  config.set('ZipCode', '10001');
  config.set('ThemeColor', '61DBFB');
}

var my_zip;
my_zip = zip.lookup(config.get('ZipCode'));

// Checking if setting ZipCode:
if (program.setzip) {
  Settings.SetZipCode(program.setzip, config);
  console.log(`SUCCESS: Set Default Zip to ${config.get('ZipCode')}. ✅ ✅`);
  return 1;
}

// Checking if setting Theme:
if (program.settheme) {
  Settings.SetTheme(program.settheme, config);
  console.log(`SUCCESS: Set Theme to #${config.get('ThemeColor')}. ✅ ✅`);
  return 1;
}

// Checking if input ZipCode:
if (program.zip) {
  my_zip = zip.lookup(program.zip);
} 

CallApi();

// Make API call and draw onto terminall
function CallApi() {
  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${my_zip.latitude}&lon=${my_zip.longitude}&exclude=hourly,minutely&appid=${apiKey.apiKey}&units=imperial`)
  .then(function (response) {
    Draw(response.data);
  })
  .catch(function (error) {
    console.log("Encountered Error: " + error);
    console.log("Please try again.")
  });
}


function Draw(data) {
  let breaker_lines = "==========================================================================================================";
  var date1 = new Date(data.daily[0].dt * 1000);
  var date2 = new Date(data.daily[1].dt * 1000);
  var date3 = new Date(data.daily[2].dt * 1000);

  // Logic to determine middle of lines:
  let location = my_zip.city + ", " + my_zip.state;
  let title_line = "";
  for (let i = 0; i < (breaker_lines.length / 2 ) - 11; ++i) {
    title_line += " ";
  }
  title_line += "Terminal Weather Data:"

  let location_line = "";
  for (let i = 0; i < (breaker_lines.length / 2) - (location.length / 2) ; ++i) {
  location_line += " ";
  }
  location_line += location;
  let time_line = "";

  
  // Formatting data strings:
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < (breaker_lines.length / 3) - 17; ++j) {
      time_line += " ";
    }
    if (i == 0) {
        time_line += date1.toLocaleDateString();
    } 
    if (i == 1) {
      time_line += date2.toLocaleDateString();
    }
    if (i == 2) {
      time_line += date3.toLocaleDateString();
    }
  }

  // Formatting content strings:
  let line_zero = "";
  line_zero += `||           ${date1.toLocaleDateString()}`.padEnd(34);
  line_zero += `||           ${date2.toLocaleDateString()}`.padEnd(34);
  line_zero += `||           ${date3.toLocaleDateString()}`.padEnd(34);
  line_zero += "||";

  let line_one = "";
  line_one += `||   Weather Type: ${data.daily[0].weather[0].main}`.padEnd(34);
  line_one += `||   Weather Type: ${data.daily[1].weather[0].main}`.padEnd(34);     
  line_one += `||   Weather Type: ${data.daily[2].weather[0].main}`.padEnd(34);
  line_one += "||";

  let line_two = "";
  line_two += `||   Temperature High: ${data.daily[0].temp.max}`.padEnd(34);
  line_two += `||   Temperature High: ${data.daily[1].temp.max}`.padEnd(34);
  line_two += `||   Temperature High: ${data.daily[2].temp.max}`.padEnd(34);
  line_two += "||"

  let line_three = "";
  line_three += `||   Temperature Low: ${data.daily[0].temp.min}`.padEnd(34);
  line_three += `||   Temperature Low: ${data.daily[1].temp.min}`.padEnd(34);
  line_three += `||   Temperature Low: ${data.daily[2].temp.min}`.padEnd(34);
  line_three += "||"

  // Writing to command line:
  console.log("\n\n\n");

  console.log(chalk.hex(config.get('ThemeColor'))(breaker_lines));
  console.log(chalk.hex(config.get('ThemeColor'))(breaker_lines));

  console.log();
  console.log(chalk.hex(config.get('ThemeColor'))(title_line));
  console.log(chalk.hex(config.get('ThemeColor'))(location_line));
  console.log();

  console.log(line_zero);
  console.log(line_one);
  console.log(line_two);
  console.log(line_three);
  console.log();

  console.log(chalk.hex(config.get('ThemeColor'))(breaker_lines));
  console.log(chalk.hex(config.get('ThemeColor'))(breaker_lines));

  console.log("\n\n\n");
}