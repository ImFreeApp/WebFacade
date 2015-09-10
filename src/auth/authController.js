module.exports = {
  authenticate: function(req, res, next){
    res.status(200).send('authenticate');
  }
};
