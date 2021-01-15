const passport = require("passport");
const User = require("../sequelize");

module.exports = (app) => {
  app.post("/findUsers", (req, res, next) => {
    const utente = req.body.utente;
    passport.authenticate("jwt", { session: false }, (err, user, info) => {
      if (err) {
        console.log("Erro: " + err);
      }
      if (info != undefined) {
        console.log(info.message);
        res.send(info.message); // envia ao cliente a indicação da falha de autenticação
      } else {
        console.log("Utilizador encontrado na BD - da rota findUser!");
        User.findOne({
          where: {
            username: utente,
          },
        }).then((user) => {
          res.status(200).send({
            auth: true,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            username: user.username,
            password: user.password,
            message: "Utilizador " + user.username + " encontrado na BD!",
          });
        });
      }
    })(req, res, next);
  });
};
