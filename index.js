const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('react-app/dist'));
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/api/refugees/:id', (req, res) => { // 예시로 만든 api
  const id = req.params.id;
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