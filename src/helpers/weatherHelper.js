import axios from 'axios';

export const getLocation = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`https://www.metaweather.com/api/location/search/?query=${query}`)
            .then(function (response) {
                if (response && response.data && response.data.length > 0) {
                    let location = response.data[0];
                    //woeid: Where On Earth IDentifier
                    resolve(location.woeid);
                }
                resolve()
            })
            .catch(function (error) {
                // handle error
                reject(error);
            })
    })

}

export const getWeather = async (query) => {
    return new Promise(async (resolve, reject) => {
        let locationId = await getLocation(query);
        if (locationId) {
            await axios.get(`https://www.metaweather.com/api/location/${locationId}/`)
                .then(function (response) {
                    if (response && response.data) {
                        let predict = response.data.consolidated_weather;
                        let weatherStateName = predict[0].weather_state_name;
                        let weatherStateAbbr = predict[0].weather_state_abbr;
                        let temperature = predict[0].the_temp;
                        let wind = predict[0].wind_speed;
                        let humidity = predict[0].humidity;
                        let visibility = predict[0].visibility;
                        let predictability = predict[0].predictability;
                        resolve({
                            weatherStateName, weatherStateAbbr, temperature, wind, humidity, visibility, predictability
                        })
                    } else {
                        // console.log('without data weather')
                        resolve()
                    }

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    reject(error)
                })

        } else {
            resolve()
            // console.log('without data locationId')
        }
    })
}

export const getImageBackgroundSrc = (weatherName) => {
    let listWeather = {
        'sn': require('./../../assets/weather/sn.jpg'), //snow
        'sl': require('./../../assets/weather/sl.png'), //Sleet
        'h': require('./../../assets/weather/h.jpg'), //Hail
        't': require('./../../assets/weather/t.jpg'), //Thunderstorm
        'hr': require('./../../assets/weather/hr.jpg'), //Heavy Rain
        'lr': require('./../../assets/weather/lr.jpg'), //Light Rain
        's': require('./../../assets/weather/s.jpg'), //Showers
        'hc': require('./../../assets/weather/hc.jpg'), //Heavy Cloud
        'lc': require('./../../assets/weather/lc.jpg'), //Light Cloud
        'c': require('./../../assets/weather/c.jpg'), //Clear

    };

    return listWeather[weatherName];
}


