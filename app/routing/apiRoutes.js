var friends = require("../data/friends");

module.exports = function(app) {

  app.post("/api/friends", function(req, res) {

    var newUser = req.body;
    var newUserScore = newUser.scores;

    var newUserScoreNumber = newUserScore.map(Number);
    function add(accumulator, a) {
      return accumulator + a;
    }
    const sum = newUserScoreNumber.reduce(add);

    var sumArrayUsers = [];
    for (i = 0; i < friends.length; i++) {
      function add(accumulator, a) {
        return accumulator + a;
      }
      const sumUser = friends[i].scores.reduce(add);

      sumArrayUsers.push(sumUser);
    }

    var difArray = [];
    for (i = 0; i < sumArrayUsers.length; i++) {
      var dif = sumArrayUsers[i] - sum;
      var difAbs = Math.abs(dif);
      difArray.push(difAbs);
    }

    var lowest = 0;
    function smallest(difArray) {
      lowest = 0;
      for (var i = 1; i < difArray.length; i++) {
        if (difArray[i] < difArray[lowest]) lowest = i;
      }
      return lowest;
    }
    smallest(difArray);

    var match = {
      name: friends[lowest].name,
      photo: friends[lowest].photo,
      friendDifference: difArray[lowest]
    };

    friends.push(req.body);
    res.json(match);
  });

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
};
