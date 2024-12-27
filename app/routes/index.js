module.exports = function(app) {
    
    app.get('/health', (req, res) => {
        res.send("Logger service is UP.")
    })
}