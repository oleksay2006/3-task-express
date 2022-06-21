const app = require('../config/middleware');

const Router = require('../config/router');

app.use('/v1/user', Router);

app.listen(3000, () => {
  console.log('Server has been started on 3000...');
});
