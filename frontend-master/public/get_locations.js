const baseURL = 'http://doprava.plzensky-kraj.cz';

const htmlParser = require('node-html-parser');
let fetch;

const loadMain = async () => {
  const mainPage = await (await fetch(`${baseURL}/site/index`)).text();

  const root = htmlParser.parse(mainPage);
  const header = root.querySelector('.dropdown-header .yamm-content .row');

  const items = header.querySelectorAll('ul li table tr');
  const names = items.map(
    (el) => el.childNodes[3].childNodes[1].rawAttributes.href
  );
  console.log(names);
  return names;
};

const second = async (paths) => {
  console.log(paths.length);
  const dict = {};

  for (const path of paths) {
    const url = `${baseURL}${path}`;
    const page = await (await fetch(url)).text();

    const root = htmlParser.parse(page);
    const script = root.querySelector('#content script').innerText;

    const match = /\t var initialData = JSON\.parse\('(.*)'\)/.exec(script)[1];
    const {devices} = JSON.parse(match);

    for (const {statistics, name, lat, lng} of devices) {
      console.log(name);
      dict[statistics] = { name: name, location: [lat, lng] }
    }
  }

  return dict;
};

const main = async () => {
  fetch = (await import('node-fetch')).default;

  const paths = await loadMain();
  const dict = await second(paths);

  console.log(JSON.stringify(dict));
};
main().then(() => process.exit(0));
