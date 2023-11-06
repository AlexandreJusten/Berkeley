const axios = require('axios');

function generateRandomData() {
  return {
    node: '2',
    hora: null,
  };
}

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

function errarRelogio() {

    segundo = segundo + 2;
    minuto = minuto+1;
    hora = hora+0;
  horario =`${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}:${String(segundo).padStart(2, '0')}`;
}
function acertarRelogio(props) {

    ajuste = props.ajust;
    const totalSeconds = timeToSeconds(horario) + timeToSeconds(ajuste);
    const totalTime = secondsToTime(totalSeconds);
  console.log(totalTime)
   

const parts = totalTime.split(':'); 
const horas = parseInt(parts[0]); 
const minutos = parseInt(parts[1]); 
const segundos = parseInt(parts[2]); 
segundo = segundos;
minuto = minutos;
hora = horas;
horario =`${String(hora).padStart(2, '0')}:${String(minuto).padStart(2, '0')}:${String(segundo).padStart(2, '0')}`;
}


function sendDataToWebService() {
  setInterval(async () => {
    const data = generateRandomData();
    data.hora = horario;
    try {
      await axios.post('http://localhost:3000/data', data);
      console.log('Dados enviados com sucesso:', data);
    } catch (error) {
      console.error('Erro ao enviar dados:', error.message);
    }
  }, 10000);
}

sendDataToWebService();

///

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5002;

const dataStore = [];

app.use(bodyParser.json());

app.post('/', (req, res) => {
 errarRelogio();
  res.json("errado");
});

app.post('/ajust', (req, res) => {
  acertarRelogio(req.body)

  
  res.json("arrumado");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

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