import moment from 'moment';

var date = {
  getDate(){
    var date = new Date().toDateString();
    var newDate = moment(Date(date)).format('DD MMMM YYYY');

    console.log(newDate);
    return newDate;
  }
};

module.exports = date;
