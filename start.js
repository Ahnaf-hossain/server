const express = require('express')
const ratings = require('@mtucourses/rate-my-professors').default;
const app = express()
const port = 3000

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

app.get('/:profName', async(req, res) => {

    let profName = req.params.profName;

    //const schools = await ratings.searchSchool('Texas A&M University');

    //   console.log(schools);
      /*
        [
          {
            city: 'Houghton',
            id: 'U2Nob29sLTYwMg==',
            name: 'Michigan Technological University',
            state: 'MI'
          }
        ]
      */
    
      const teachers = await ratings.searchTeacher(profName, 'U2Nob29sLTEwMDM=');
    
      console.log(teachers);
      /*
        [
          {
            firstName: 'Ching-Kuang',
            id: 'VGVhY2hlci0yMjkxNjI=',
            lastName: 'Shene',
            school: {
              id: 'U2Nob29sLTYwMg==',
              name: 'Michigan Technological University'
            }
          }
        ] 
      */
    try{
      console.log(teachers[0]["id"]);
      const teacher = await ratings.getTeacher(teachers[0]["id"]);
    
      console.log(teacher);
      let peep = [teacher["avgDifficulty"], teacher["avgRating"]];
      res.send( peep);
    }catch (e){
        console.log("dead");
        res.send(["Couldn't find","Couldn't find"]);
    }
    
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})