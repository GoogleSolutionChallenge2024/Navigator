const cors = require('cors');
const express = require('express');
const { firebaseApp } = require('./dbconnect');
const { getFirestore, collection, getDocs } = require("firebase/firestore");

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

const whitelist = ['http://localhost:5173', "https://nevi.page", 'http://localhost:8080', "https://nevi-service-xivns55yhq-uw.a.run.app"]; // react-app의 주소
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

app.get('/api/refugees/:id', (req, res) => { // 예시로 만든 api
  const id = req.params.id;
  console.log(id);
  const refugee = getRefugee(id);
  if (!refugee) {
    res.status(404).send({ error: `Refugee ${id} not found`});
  } else {
    res.send({ data: refugee });
  }
});

function getRefugee(id) {
  const refugees = [ // 임시방편으로 만들어놓은 DB
    {id: 1, name: "First Ref", created_at: '2024-02-17', country: 'Poland'},
    {id: 2, name: "Second Ref", created_at: '2024-02-18', country: 'China'},
    {id: 3, name: "Third Ref", created_at: '2024-02-19', country: 'Hong Kong'},
    {id: 4, name: "Fourth Ref", created_at: '2024-02-20', country: 'Russia'},
    {id: 5, name: "Fifth Ref", created_at: '2024-02-21', country: 'Egypt'},
  ];
  return refugees.find(r => r.id == id);
}

// Firestore 컬렉션 가져오기
const refugeesCollection = collection(db, "users");

// 모든 난민 문서 가져오기
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
