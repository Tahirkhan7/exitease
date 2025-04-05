const axios = require('axios');

const isHoliday = async (date, country) => {
  const apiKey = process.env.CALENDARIFIC_KEY;
  const year = new Date(date).getFullYear();

  const res = await axios.get(`https://calendarific.com/api/v2/holidays`, {
    params: {
      api_key: apiKey,
      country,
      year
    }
  });

  const holidays = res.data.response.holidays.map(h => h.date.iso.split('T')[0]);
  return holidays.includes(date);
};

module.exports = isHoliday;
