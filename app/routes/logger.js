

module.exports = function(app) {

    app.get('/get', (req, res) => {
        res.send("Get");
    })

}