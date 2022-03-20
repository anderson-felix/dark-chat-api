import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

export default routes;
