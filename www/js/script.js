/**
 * Created by carla on 11/23/15.
 */
document.addEventListener("deviceready", initDatabase, false);

function initDatabase() {

  db = openDatabase('dpmaps', '1.0', 'BD de Mapas', 2 * 1024 * 1024);


  db.transaction(function (tx) {
    tx.executeSql('DROP TABLE IF EXISTS maps');
    tx.executeSql('DROP TABLE IF EXISTS Markers');

    tx.executeSql('CREATE TABLE IF NOT EXISTS maps (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
        'name VARCHAR(45), ' +
        'latitud DOUBLE,' +
        'longitud DOUBLE,' +
        'zoom INTEGER)');

    tx.executeSql('CREATE TABLE IF NOT EXISTS markers (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, ' +
        'title VARCHAR(45), ' +
        'latitud DOUBLE,' +
        'longitud DOUBLE,' +
        'visited TINYINT(1),' +
        'map_id INTEGER)');

    tx.executeSql("INSERT INTO maps (name, latitud, longitud, zoom) VALUES ('hola', '3.57', '4.44', '10')");
    tx.executeSql("INSERT INTO markers (title, latitud, longitud, visited, map_id) VALUES ('Lugar 1', '5.57', '10.44', '1', '1')");
/*
    tx.executeSql('CREATE TABLE IF NOT EXISTS Maps (' +
        'id INT NOT NULL PRIMARY KEY AUTOINCREMENT,' +
        'name VARCHAR(50),' +
        'latitud DOUBLE,' +
        'longitud DOUBLE,' +
        'zoom INT NULL,' +
        'Markers_id INT,');*/
 });

/*
  db = openDatabase('mydb', '1.0', 'BD de comida', 2 * 1024 * 1024);

  var food = ["Cake", "Cookie", "Spaguetti", "Nachos"];
  var category = ["Dessert", "Dessert", "Main Course", "Entry"];
  db.transaction(function (tx) {
    tx.executeSql('DROP TABLE IF EXISTS food');
    tx.executeSql('CREATE TABLE IF NOT EXISTS food (idfood INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, food VARCHAR(45), category VARCHAR(45))');

    for (var i = 0; i < food.length; i++) {
      tx.executeSql("INSERT INTO food (food,category) VALUES ('"+food[i]+"','"+category[i]+"')");
    }
    doQuery();
  });*/
}

function doQuery() {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM food', [], function (tx, result) {
      for (var i = 0; i < result.rows.length; i++) {
        var item = result.rows.item(i);
        display(item.idfood, item.food, item.category);
      }
    });
  });
}

function display(id, food, category) {
  var row = document.createElement("tr");
  var idCell = document.createElement("td");
  var foodCell = document.createElement("td");
  var categoryCell = document.createElement("td");
  idCell.textContent = id;
  foodCell.textContent = food;
  categoryCell.textContent = category;
  row.appendChild(idCell);
  row.appendChild(foodCell);
  row.appendChild(categoryCell);
  document.getElementById("food").appendChild(row);
}

function drop() {
  db.transaction(function (tx) {
    tx.executeSql('DROP DATABASE mydb');
  });
}