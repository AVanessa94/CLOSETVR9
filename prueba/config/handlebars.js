module.exports = (app, hbs, data) => {
    const hbsEngine = hbs.create({
        layoutsDir: data.layouts_dir,
        defaultLayout: "main",
        extname: ".hbs",
        helpers: {
            eq: function(a, b) {
                return a === b;
            },
            // Puedes agregar más helpers aquí si quieres
        }
    });

    app.engine(".hbs", hbsEngine.engine);
    app.set("view engine", ".hbs");
};
