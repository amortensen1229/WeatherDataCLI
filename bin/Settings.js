var Settings = {
  SetTheme(theme, config) {
    config.set('ThemeColor', theme);
  },
  SetZipCode(zip, config) {
    config.set('ZipCode', zip);
  }
}
module.exports = Settings;