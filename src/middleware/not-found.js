const notFound = (req, res) => res.status(404).send('Cette page n\'existe pas');

module.exports = notFound;
