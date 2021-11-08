import ReactHtmlParser from "react-html-parser";
import json from "./data.json";
import "./DataView.css";

const DataView = props => {
  const {stats, data} = json;

  console.log(stats);
  console.log(data);

  

//   var info = window.L.control();

// info.onAdd = function (mymap) {
//     this._div = window.L.DomUtil.create('div', 'info');
//     this.update();
//     return this._div;
// };

// info.update = function (props) {
//     this._div.innerHTML = '<h4>Nezaměstnanost</h4>' +  (props ?
//         '<b>' + props.name + '</b><br />' + props.density + ' procent</sup>'
//         : 'Najeďte na okres');
// };

// info.addTo(mymap);

  mymap.attributionControl.addAttribution('Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>' );
  mymap.attributionControl.addAttribution('Data nezaměstnanosti <a href="https://portal.mpsv.cz/upcr">Úřad práce ČR</a>');

  return ReactHtmlParser(mapEl.outerHTML);
}


export default DataView;