const express = require('express')
const globby = require('globby')
const morgan = require('morgan')
const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
} else {
    app.use(morgan('combined'))
}

app.use(require('cors')())
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))



globby.sync('./*.controller.js', { cwd: __dirname }).forEach((file) => {
    import(`./${file}`).then((module) => {
        app.use(module.default)
    })
})

module.exports =  app;