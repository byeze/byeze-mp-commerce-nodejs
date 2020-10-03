const buildPreference = require("./mercadopago");

const home = (_req, res) => {
    res.render("home");
};

const detail = (req, res) => {
    const { query } = req;
    buildPreference(query)
        .then((response) => {
            const { init_point: initPoint } = response.body;
            res.render("detail", { ...query, initPoint });
        })
        .catch((error) => {
            console.log(error);
        });
};

const success = (req, res) => {
    res.render("meli", {
        title: "¡Gracias!",
        subtitle:
            "Tu pago se procesó con éxito, vamos a enviar tu producto dentro de poco.",
        params: req.query,
    });
};

const pending = (_req, res) => {
    res.render("meli", {
        title: "Estamos verificando tu pago",
        subtitle: "Te notificaremos dentro de poco.",
    });
};

const failure = (_req, res) => {
    res.render("meli", {
        title: "Oops...",
        subtitle: "Se rechazó tu pago, intentá dentro de poco.",
    });
};

const ipn = (req, res) => {
    console.log(JSON.stringify(req.query));
    console.log(JSON.stringify(req.body));
    console.log("COMPLETE", req);
    res.send("ok");
};

module.exports = {
    home,
    detail,
    success,
    pending,
    failure,
    ipn,
};
