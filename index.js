const filename = "./config.yaml"
const fs = require('fs')
const yaml = require('js-yaml')
const express = require('express')
const yamlText = fs.readFileSync(filename, 'utf8')
yaml_data = yaml.load(yamlText);
console.log(yaml_data['user'])

const mysql = require('mysql2')
const app = express()
const port = process.env.PORT || 3001

const connection = mysql.createConnection({
  host: yaml_data['host'],
  user: yaml_data['user'],
  password: yaml_data['password'],
  port : yaml_data['port'],
  database: yaml_data['db'] 
});

app.get("/api", (req, res) => {
  connection.query(
    'SELECT * FROM `list`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({message: results[0].title});
    }
  );
  console.log("接続終了(正常)");
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})