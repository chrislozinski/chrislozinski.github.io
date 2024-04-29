import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

class RequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        urlParsed = urlparse(self.path)
        html_directory = "htmlFiles"  # Directory containing HTML files

        if urlParsed.path == '/':
            self.send_response(301) 
            self.send_header("Location", "/home.html")
            self.end_headers()

        elif urlParsed.path in ['/home.html', '/about.html', '/experience.html', '/projects.html', '/contact.html']:
            file_path = os.path.join(html_directory, urlParsed.path.strip('/'))
            if os.path.exists(file_path):
                with open(file_path, 'rb') as fp:
                    content = fp.read()
                self.send_response(200)
                self.send_header("Content-type", "text/html")
                self.send_header("Content-length", len(content))
                self.end_headers()
                self.wfile.write(content)
            else:
                self.send_error(404, "File not found")

        else:
            self.send_error(404, "File not found")

    def do_POST(self):
        urlParsed = urlparse(self.path)

        if self.path == '/submit-form':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            #add processing here later 

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = '{"status": "success"}'
            self.wfile.write(response.encode('utf-8'))

        else:
            self.send_error(404, "Action not found")

def run(server=HTTPServer, handler=RequestHandler, port=0):
    server_address = ('', port)
    httpd = server(server_address, handler)
    print(f"Starting httpd on port {port}...")
    httpd.serve_forever()

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
            run(port=port)
        except ValueError:
            print("The port number must be an integer.")
            sys.exit(1)
    else:
        print("Usage: python3 server.py <port>")
        sys.exit(1)
