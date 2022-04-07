//part 1
const http = require('http');
const express = require('express')
const app = express()
const Moment = require('moment-timezone');
const morgan = require('morgan');

let data = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]
//part 2
let personCount= data.length;

let timeZone = Moment.tz.guess();
let time = new Date();
let timeZoneOffset = time.getTimezoneOffset();
let tzabbr = Moment.tz.zone(timeZone).abbr(timeZoneOffset);
let infoTime= new Moment().format('dddd MMMM Do YYYY, h:mm:ss a')


app.get('/api/persons', (request, response) => {
    response.end(JSON.stringify(data));
})

app.get('/info', (request,response) => {
    response.end("Phonebook has info for " +JSON.stringify(personCount)+" people \r\n\n"+ (infoTime)+"  "+(tzabbr))
})

//part 3
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const people = data.find(person => person.id == id);
    if(people!=undefined){
        response.json(people);
    }
    else{
        response.end("aint\r\n a\r\n  thing\r\n    yo");
    }
})

//part 4

app.delete('/api/persons/:id', (request, response) => {
    const id  = Number(request.params.id);
    data = data.filter(person => person.id !== id);

    response.status("204").end();
})

//part 5

app.use(express.json())
app.post('/api/persons', (request, response) => {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    let randomId = getRandomInt(data.length,(data.length+100));
    const body = request.body;
    if(!body.number){
        return response.status(400).json({
            error: "It's gotta have a number",
        });
    }
    const arrNames = data.map(person => person.name)
        if (arrNames.includes(body.name)) {
            return response.status(400).json({
            error: "You can't have two of the same names.",
        });
    }
    const person = {
        id: randomId,
        name: body.name,
        number: body.number
    };
    data = data.concat(person);
    response.json(data);
})

// part 6 is in there somewhere ^^^

// part 7

        // app.use(morgan("tiny"))

// part 8

morgan.token('newPerson', (request, response) => {
    if (request.method === 'POST'){
        return JSON.stringify(request.body)
    }
    else{
    return null
    }
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :newPerson"))


const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
