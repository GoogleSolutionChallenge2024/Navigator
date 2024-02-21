const cors = require('cors');
const express = require('express');
const { firebaseApp } = require('./dbconnect');
const { getFirestore, collection, getDocs } = require("firebase/firestore");
const admin = require('firebase-admin');
const { doc, setDoc } = require("firebase/firestore"); 
const bodyParser = require('body-parser');

const db = getFirestore(firebaseApp);

const app = express();
app.use(express.json());
app.use(express.static('react-app/dist'));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', true);
  next();
});

const whitelist = ['http://localhost:5173', "https://nevi.page", 'http://localhost:8080', "https://nevi-service-xivns55yhq-uw.a.run.app"]; 
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  next();
});
app.use(
  cors(corsOptions)
);


// test api
app.get('/api/refugees/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const refugee = getRefugee(id);
  if (!refugee) {
    res.status(404).send({ error: `Refugee ${id} not found`});
  } else {
    res.send({ data: refugee });
  }
});

// test DB
function getRefugee(id) {
  const refugees = [
    {id: 1, name: "First Ref", created_at: '2024-02-17', country: 'Poland'},
    {id: 2, name: "Second Ref", created_at: '2024-02-18', country: 'China'},
    {id: 3, name: "Third Ref", created_at: '2024-02-19', country: 'Hong Kong'},
    {id: 4, name: "Fourth Ref", created_at: '2024-02-20', country: 'Russia'},
    {id: 5, name: "Fifth Ref", created_at: '2024-02-21', country: 'Egypt'},
  ];
  return refugees.find(r => r.id == id);
}

const refugeesCollection = collection(db, "users");

const getRefugees = async () => {
  const querySnapshot = await getDocs(refugeesCollection);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
};

app.get('/api/getRefugees', async (req, res) => {
  try {
    const querySnapshot = await getDocs(refugeesCollection);
    const refugees = [];
    querySnapshot.forEach((doc) => {
      refugees.push({ id: doc.id, data: doc.data() });
    });
    res.json({ success: true, refugees });
  } catch (error) {
    console.error("Error getting refugees:", error);
    res.status(500).json({ success: false, error: "Error getting refugees" });
  }
});

app.use(bodyParser.json());
app.post('/api/addUser', async (req, res) => {
  try {
    const randomUserId = generateUserId();
    const randomCountry = getRandomCountry();
    const { country, job, gender, language, name, religion } = req.body;
    console.log(req.body);

    await setDoc(doc(db, "users", `${name}-${randomUserId}`), {
      country : country,
      job : job,
      gender : gender,
      language : language,
      result : randomCountry,
      name: name,
      religion: religion,
      user_id: randomUserId,
    });

    res.status(201).send('User added successfully');
  } catch (error) {
    console.error('Error adding user: ', error);
    res.status(500).send('Error adding user');
  }
});

const generateUserId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10;
  let userId = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    userId += characters[randomIndex];
  }
  
  return userId;
}

const getRandomCountry = () => {
  const countries = ['United States', 'United Kingdom', 'France', 'Japan', 'China', 'South Korea', 'Italy', 'Germany', 'Spain', 'Canada', 'Australia', 'Sweden'];
  
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}