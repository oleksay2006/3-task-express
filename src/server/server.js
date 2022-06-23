const path = require('path');
const app = require('../config/middleware');

const Router = require('../config/router');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(Router);

app.listen(3000, () => {
  console.log('Server has been started on 3000...');
});
