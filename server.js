const express = require('express')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({origin: true, credentials: true, Authorization: true}))
app.listen(5000)

console.log('API is running on port 5000')