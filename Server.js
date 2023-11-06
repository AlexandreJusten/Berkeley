const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

const dataStore = [];
function timeToSeconds(time) {
  const parts = time.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseInt(parts[2]);
  return hours * 3600 + minutes * 60 + seconds;
}

function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

function berkeley(){
  const lastFourElements = dataStore.slice(-4);
  const t = {};
  let t1;
let t2;
let t3;
let t4;
  
  for (let x = 0; x < lastFourElements.length; x++) {
    const nodeValue = lastFourElements[x].node;
    
  
    if (nodeValue === '1') {
      t1 = lastFourElements[0].hora;
    } else if (nodeValue === '2') {
      t2 = lastFourElements[1].hora;
    } else if (nodeValue === '3') {
      t3 = lastFourElements[2].hora;
    } else if (nodeValue === '4') {
      t4 = lastFourElements[3].hora;
    }
  }
  
  const tS = lastFourElements[0].serverHora;
 

 const totalSeconds = ((timeToSeconds(t1) + timeToSeconds(t2) + timeToSeconds(t3) + timeToSeconds(t4)) / 4) - timeToSeconds(tS);
const totalTime = secondsToTime(totalSeconds);
if(tS!==t1){

  ajustar(totalTime,1)
}

if(tS!==t2){

  ajustar(totalTime,2)
}

if(tS!==t3){

  ajustar(totalTime,3)
}

if(tS!==t4){

  ajustar(totalTime,4)
}


}
async function ajustar(props,node) {
  console.log('ajustar',node)
  const data = {
    ajust: props+""
  };
  if(node === '1'){
    console.log('if',node)
    try {
      await axios.post('http://localhost:5001/ajust', data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
    }
  }if(node === '2'){
    try {
      await axios.post('http://localhost:5002/ajust', data);  
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
    }
  }if(node === '3'){
    try {
      await axios.post('http://localhost:5003/ajust', data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
    }
  }if(node ==='4'){
    try {
      await axios.post('http://localhost:5004/ajust', data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
    }
  }
 
}

app.use(bodyParser.json());

app.post('/data', (req, res) => {
  const newData = req.body;
  newData.serverHora = horario;
  dataStore.push(newData);
  res.json(newData);
});
app.post('/berkeley', (req, res) => {
  berkeley()
  res.json('success');
});

app.get('/data', (req, res) => {
  res.json(dataStore);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

let horario=''
let hora = 0;
let minuto = 0;
let segundo = 0;

function atualizarRelogio() {
  segundo++;
  if (segundo === 60) {
    segundo = 0;
    minuto++;
    if (minuto === 60) {
      minuto = 0;
      hora++;
      if (hora === 24) {
        hora = 0;
      }
    }
  }


  horario =`${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}:${String(segundo).padStart(2, '0')}`;
}


setInterval(atualizarRelogio, 1000);

atualizarRelogio();