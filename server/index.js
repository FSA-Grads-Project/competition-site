const { connection } = require('./db');
const app = require('./app');

const initialization = async () => {
  try {

    // database connection
    await connection.sync();

    // listen for requests
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });

  } catch(ex) {
    console.log(ex);
  }
};

initialization();
