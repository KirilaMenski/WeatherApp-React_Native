
var background = {
  getIcon(icon){
    var background;
      if (icon == '01d') {
        background = require('./../resources/images/clear_sky.jpg');
      } else
      if (icon == '02d') {
        background = require('./../resources/images/few_clouds.jpg');
      } else
      if (icon == '03d') {
        background = require('./../resources/images/scattered_clouds.jpg');
      } else
      if (icon == '04d') {
        background = require('./../resources/images/broken_clouds.jpg');
      } else
      if (icon == '09d') {
        background = require('./../resources/images/shower_rain.jpg');
      } else
      if (icon == '10d') {
        background = require('./../resources/images/rain.jpg');
      } else
      if (icon == '11d') {
        background = require('./../resources/images/thunderstorm.jpg');
      } else
      if (icon == '13d') {
        background = require('./../resources/images/snow.jpg');
      } else
      if (icon == '50d') {
        background = require('./../resources/images/mist.jpg');
      } else {
				 background = require('./../resources/images/mist.jpg');
			}

    return background;
  }
};

module.exports = background;
