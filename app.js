//Require Statements:
const chalk = require('chalk');
const axios = require('axios');
const zip = require('zipcodes');
const config = require('./config.json');
const env = require('./env.json')
const { program } = require('commander');
program.version('0.0.1');

program.option('-z, --zip <input_zip>', 'enter non-default zip');
program.parse(process.argv);

var my_zip;
if (program.zip) {
  my_zip = zip.lookup(program.zip);
  get_data();
} else {
  my_zip = zip.lookup(env.zipCode);
  get_data();
}

function get_data() {
  axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${my_zip.latitude}&lon=${my_zip.longitude}&exclude=hourly,minutely&appid=${config.apiKey}&units=imperial`)
  .then(function (response) {
    draw(response.data);
  })
  .catch(function (error) {
    console.log("Encountered Error: " + error);
    console.log("Please try again.")
  });
}


function draw(data) {
  let breaker_lines = "==========================================================================================================";
  var date1 = new Date(data.daily[0].dt * 1000);
  var date2 = new Date(data.daily[1].dt * 1000);
  var date3 = new Date(data.daily[2].dt * 1000);

  console.log("\n\n\n");
  console.log(chalk.hex(env.themeColor)(breaker_lines));
  console.log(chalk.hex(env.themeColor)(breaker_lines));

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
  console.log();
  console.log(chalk.hex(env.themeColor)(title_line));
  console.log(chalk.hex(env.themeColor)(location_line));
  console.log();
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

  //Writing to command line:
  console.log(line_one);
  console.log(line_two);
  console.log(line_three);
  console.log();
  console.log(chalk.hex(env.themeColor)(breaker_lines));
  console.log(chalk.hex(env.themeColor)(breaker_lines));
  console.log("\n\n\n");
}
