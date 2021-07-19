const fs = require("fs");
const path = require("path");

module.exports = function (app, passportConfig) {
  fs.readdir("./controllers", function (err, filenames) {
    if (err) {
      console.log(err);
      return;
    }

    function camelize(str) {
      return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
          return index === 0 ? word.toLowerCase() : word.toUpperCase();
        })
        .replace(/\s+/g, "");
    }

    filenames.forEach(function (dir) {
      const routeFile = path.join(
        __dirname,
        `../controllers/${dir}/${camelize(dir)}Routes.js`
      );

      try {
        if (fs.existsSync(routeFile)) {
          require(routeFile)(app);
        } else {
          console.error(`Missing route, probably no API: ${routeFile}`);
        }
      } catch (err) {
        console.error(`Error: in route file: ${routeFile}`);
        console.error(err);
        process.exit(1);
      }
    });
  });
};
