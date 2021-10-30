
import nodeFetch from 'node-fetch';
import phq from 'predicthq';
const apikey = '7uch17JbJ6yTTeW7XTuu4Nl0AEddZZ-wNs8qSnUQ';
const client = new phq.Client({access_token: '7uch17JbJ6yTTeW7XTuu4Nl0AEddZZ-wNs8qSnUQ', fetch: nodeFetch});
import express from 'express';
//const express = require('express');
const myapp = express();
myapp.listen(3000, () => console.log('listening at 3000'));
myapp.use(express.static('public'));
myapp.use(express.json({limit : '1 mb'}));

myapp.get('/eventdata', (request, response) => {
    

const phqEvents = client.events;

console.log(phqEvents.country);

console.log("TESTING TESTING TESTING", phqEvents);
   let maplist = [];
   phqEvents.search({country : 'AE'})
       .then(
           res => {
               var result = res.toDict();
   
               for (const event of res.toArray()) {
                    var mapdata = {
                        "name": event.title,
                        "category" : event.category,
                        "description" : event.description,
                        "attendance" : event.phq_attendance,
                        "startDate" : event.start.split('T')[0],
                        "rank" : event.local_rank,
                        "location" : event.location
                    };
                   console.log();
                   maplist.push(mapdata);
               }
               response.json(JSON.stringify(maplist));
           }
           
           ).catch(err => console.error(err));
           
           

        });
