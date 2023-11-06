const { spawn } = require('child_process');

//server
const webServiceProcess = spawn('node', ['Server.js']);

webServiceProcess.stdout.on('data', (data) => {
  console.log(` Server: ${data}`);
});

webServiceProcess.stderr.on('data', (data) => {
  console.error(`Erro no Service: ${data}`);
});

//clientes
const client1Process = spawn('node', ['clientes/cliente1.js']);

client1Process.stdout.on('data', (data) => {
  console.log(`Cliente1: ${data}`);
});

client1Process.stderr.on('data', (data) => {
  console.error(`Erro no Cliente1: ${data}`);
});

const client2Process = spawn('node', ['clientes/cliente2.js']);

client2Process.stdout.on('data', (data) => {
  console.log(`Cliente2: ${data}`);
});

client2Process.stderr.on('data', (data) => {
  console.error(`Erro no Cliente2: ${data}`);
});

const client3Process = spawn('node', ['clientes/cliente3.js']);

client3Process.stdout.on('data', (data) => {
  console.log(`Cliente3: ${data}`);
});

client3Process.stderr.on('data', (data) => {
  console.error(`Erro no Cliente3: ${data}`);
});

const client4Process = spawn('node', ['clientes/cliente4.js']);

client4Process.stdout.on('data', (data) => {
  console.log(`Cliente4: ${data}`);
});

client4Process.stderr.on('data', (data) => {
  console.error(`Erro no Cliente4: ${data}`);
});
//View
const ViewProcess = spawn('node', ['view.js']);

ViewProcess.stdout.on('data', (data) => {
  console.log(`View: ${data}`);
});

ViewProcess.stderr.on('data', (data) => {
  console.error(`Erro no View: ${data}`);
});
