
const express = require('express');

const app = express();

const jobs = require("./jobs.json")

app.use(express.static('frontend'))

app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile('/frontend/index.html', { root: __dirname })
})
  
app.get('/page1', (req, res) => {
    res.sendFile('/frontend/page1.html', { root: __dirname })
})
  
app.get('/page2', (req, res) => {
    res.sendFile('/frontend/page2.html', { root: __dirname })
})
  
app.get('/page3', (req, res) => {
    res.sendFile('/frontend/page3.html', { root: __dirname })
})

// Q1
// return the categories mentioned in all the jobs and how many timnes each category was mentioned 
// to accomplish this, the handler below creates an empty object to ... convert to a json before sending the response
//initialize object to count jobs in specific categories in the json file. Convert back to json at the end.
app.get('/functionality1', (req, res) => {
    let categories = {};
    for (let j in jobs) {
        for (let c of jobs[j].categories)
            if (!categories[c]) {
                categories[c] = 1;
            }
        else
            categories[c]++;
    }
    res.json(categories);

});

//Q2:
//array to store categories and iterate through the json file
app.get('/:functionality2', (req, res) => {
    let jobCategories = [];
    for (let j in jobs) {
        if (jobs[j].categories.includes(req.params.category)) {
            jobCategories.push(j);
        }
    }
    res.json({
        jobs: jobCategories
    })
});

//Q3:
//last array to store jobs, find city name corresponding to job, push to another array and then convert back to json again.
app.get('/functionality3', (req, res) => {
    let jobCities = {};
    for (let j in jobs) {
        if (jobs[j].title.includes(req.query.city)) {
            jobCities[j] = jobs[j];
        }
    }
    res.send(JSON.stringify(jobCities));
});

//listen to port 80 as per project instructions
app.listen(80);