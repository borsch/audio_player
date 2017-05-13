import SimpleHTTPServer
import SocketServer
import webbrowser

PORT = 8080;
URL = 'http://localhost:' + str(PORT);

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
Handler.extensions_map.update({
    '.webapp': 'application/x-web-app-manifest+json',
});

httpd = SocketServer.TCPServer(("", PORT), Handler)

print "Serving at port", PORT
webbrowser.open(URL)
httpd.serve_forever()