/**
 * Created by carla on 11/23/15.
 */
document.addEventListener("deviceready", initDatabase, false);

function initDatabase() {
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
  });
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