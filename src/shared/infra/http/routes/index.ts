import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

routes.post('/webhook', (req, res) => {
  console.log('_____TEMPORARY WEBHOOK CALLED\n', JSON.stringify({data: req.body}, null, 4));
  return res.sendStatus(200);
});

export default routes;
