// createServer comes from the http module built-in to Node.
import { createServer, get } from 'http';

const handleIncomingRequest = (request, response) => {
  console.log('Received request!');
  response.writeHead(200, {});
  // response.end tells the server to send the completed response and mark
  // this request-response interaction complete.
  // https://nodejs.org/api/http.html#http_response_end_data_encoding_callback
  response.end('Yay!', 'utf-8');
};

// createServer creates the server object. It accepts a request listener function.
// The server calls the function every time it receives a request.
// The listen method tells server to start listening for requests on given port.

createServer(handleIncomingRequest).listen(3004);

const handleResponse = (response) => {
  // Compile response data in a data variable.
  // The response may contain multiple "chunks" of data.
  let data = '';

  // Add chunk of data to data var when each "chunk" is received.
  response.on('data', (chunk) => {
    data += chunk;
  });

  // We have received the whole response. Print the full response data.
  response.on('end', () => {
    console.log('Response Data: ', data);
  });
};
