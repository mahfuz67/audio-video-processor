import {
  app,
  di,
  PORT,
  baseRouter,
  basePath,
  handleGlobalError,
} from "./index";

(async () => {
  const container = await di();
  app.use("*", (req, _, next) => {
    req.container = container;
    next();
  });
  app.use(basePath, baseRouter);
  app.use(handleGlobalError);
  app.listen(PORT, () => {
    console.info(`
        ------------
        Internal Application Started!
        API: http://localhost:${PORT}/
        ------------
  `);
  });
})();

export default app;
