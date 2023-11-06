const http = require('http');
const fs = require('fs');
const axios = require('axios');

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        try {
            const response = await axios.get('http://localhost:3000/data');
            const data = response.data;
            let horaS=''

            const html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="refresh" content="8">
                <title>Dados do Web Service</title>
            </head>
                <body>
                
                    <h1>Dados do Web Service</h1>
                    <table>
                        <tr>
                            <th>Node-1</th>
                        </tr>
                        ${data
                            .filter(item => item.node === '1') 
                            .map(item => {
                              horaS = item.serverHora;
                              return `
                                <tr>
                                 
                                  <td>${item.hora}</td>
                                </tr>
                              `;
                            })
                            .join('')}
                    </table>
                    <table>
                    <tr>
                        <th>Node-2</th>
                    </tr>
                    ${data
                        .filter(item => item.node === '2') 
                        .map(item => {
                        
                          return `
                            <tr>
                             
                              <td>${item.hora}</td>
                            </tr>
                          `;
                        })
                        .join('')}
                </table>
                <table>
                <tr>
                    <th>Node-3</th>
                </tr>
                ${data
                    .filter(item => item.node === '3') 
                    .map(item => {
                      
                      return `
                        <tr>
                         
                          <td>${item.hora}</td>
                        </tr>
                      `;
                    })
                    .join('')}
            </table>
            <table>
            <tr>
                <th>Node-4</th>
            </tr>
            ${data
                .filter(item => item.node === '4') 
                .map(item => {
                  
                  return `
                    <tr>
                     
                      <td>${item.hora}</td>
                    </tr>
                  `;
                })
                .join('')}
        </table>
                    <table>
                        <tr>
                            <th>Server Hora</th>
                        </tr>
                       
                            <tr>
                                <td>${horaS}</td>
                            </tr>
                    
                    </table>
                </body>
                </html>
            `;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(html);
        } catch (error) {
            console.error('Erro ao obter os dados:', error.message);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro interno do servidor');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
});

const port = 8000;
server.listen(port, () => {
    console.log(`Servidor web rodando em http://localhost:${port}`);
});
