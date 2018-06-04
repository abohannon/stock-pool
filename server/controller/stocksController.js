const helloWorld = (req, res) => {
  res.send({
    data: 'Hello World!',
  });
};

module.exports = {
  helloWorld,
};
