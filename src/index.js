require("dotenv").config();
//aquí arrancamos el servidor
const app = require('./server')
require('./database')



app.listen(app.get('port'), () => {
    console.log('listen on port:', app.get('port'));
    
})