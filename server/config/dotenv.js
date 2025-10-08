//load env variables from .env so other files ex. database can use, also protect them from being uplaoded to version control

import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })