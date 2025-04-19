import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

const PORT = process.env.APP_PORT
const app = express()

app.use(morgan('combined'))
app.use(express.json())
app.use(express.static('public'))

const logHeaders = (request: Request, response: Response, next: NextFunction) => {
    console.log(request.headers)
    next()
}

const verifyBrowser = (request: Request, response: Response, next: NextFunction) => {
    if (request.headers['sec-ch-ua-platform'] === 'Windows') {
        throw new Error('Access denied')
    }
    next()
}

app.use(verifyBrowser)
app.use(logHeaders)

app.get('/', (request, response) => {
    response.send('спуки')
})

app.get('/news', verifyBrowser, (request, response) => {
    response.send('новости: last night it came as a picture, with a good reason, a warning sign')
})

app.get('/statistics', (request, response) => {
    response.send('статистика: 13 из 10 панков не верят в систему')
})

app.get('/status', (request, response) => {
    response.status(418).send('я чайник..')
})

app.listen(PORT, () => {
    console.log(`App is listening on: http://localhost:${PORT}`)
})