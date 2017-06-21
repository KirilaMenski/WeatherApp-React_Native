import moment from 'moment';

var date = {
  getDate(date){
    var timestamp = moment.unix(date);

    return timestamp.format('Do MMMM YYYY');
  }
};

module.exports = date;
