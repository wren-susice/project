const myMap = (() => {
  const mapLayer = window.L.tileLayer(
    'https://api.mapbox.com/styles/v1/petufo/cj0xseq8l00w02rqpafh4n9ss/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGV0dWZvIiwiYSI6ImNqMHhzOTQwejAweDAycXJ0emEzd3RjOGUifQ.A93-n6Snr7XPtzAoXEjYlQ',
    {
      maxZoom: 16,
      minZoom: 8,
      useCache: true,
      crossOrigin: true,
      accessToken:
        'pk.eyJ1IjoicGV0dWZvIiwiYSI6ImNqMHhzOTQwejAweDAycXJ0emEzd3RjOGUifQ.A93-n6Snr7XPtzAoXEjYlQ'
    }
  );

  const map = window.L.map('map', {})
    .setView([49.2399833, 13.5255667], 8)
    .addLayer(mapLayer);

  map.attributionControl.addAttribution(
    'Mapová data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>'
  );
  map.attributionControl.addAttribution(
    'Data o provozu: <a href="https://doprava.plzensky-kraj.cz">Plzeňský kraj</a>'
  );

  return map;
})();

const circles = [];
const data = [];
const locations = {};
const days = [];

const getColor = (value) => {
  return value > 25 * 60
    ? '#f55'
    : value > 20 * 60
    ? '#f84'
    : value > 12 * 60
    ? '#fa0'
    : value > 5 * 60
    ? '#bd1'
    : '#5f5';
};

const fetchData = async () => {
  for (let i = 1; i <= 1; i++) {
    let week = await (await fetch(`week${i}.json`)).json();

    data.push(week);
  }

  data.forEach((week) => {
    week.forEach((day, i) => {
      day.forEach(({ name, location, value }) => {
        if (!locations[name]) locations[name] = [];
        locations[name].push({ location, value });
      });
    });
  });

  console.log(data);
  console.log(days);
  console.log(locations);

  Object.keys(locations).forEach((location) => {
    console.log(location);

    const data = locations[location];

    console.log(data);

    let {
      location: [lat, lng],
      value: values
    } = data[0];
    console.log(values);
    values = eval(values);
    const circle = window.L.circleMarker([lat, lng], {
      color: getColor(values[13]),
      fillColor: getColor(values[13]),
      fillOpacity: 0.5,
      radius: 5
    });

    circle.bindPopup(`${location}:   ${values[13]} aut`);
    circle.addTo(myMap);

    circle.on('click', () => changeGraph(values));

    circles.push(circle);
  });
};

fetchData();

fetch('blocked.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    data.forEach(({ lat, lng }) => {
      const circle = window.L.circleMarker([lat, lng], {
        color: '#000',
        fillColor: '#000',
        fillOpacity: 0.5,
        radius: 5
      });

      circle.bindPopup(`Neprůjezdné`);
      circle.addTo(myMap);

      circles.push(circle);
    });
  });

const ctx = document.getElementById('chart').getContext('2d');
const chart = new window.Chart(ctx, {
  type: 'line',
  data: {
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23
    ],
    datasets: [
      {
        label: 'Počet aut za hodinu',
        data: [
          3, 3, 2, 1, 9, 17, 29, 23, 29, 46, 84, 247, 283, 291, 257, 243, 273,
          246, 187, 144, 183, 62, 41, 13
        ],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3
      }
    ]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
const changeGraph = (data) => {
  console.log(chart.data.datasets, data);
  chart.data.datasets[0].data = data;
  chart.update();
};
