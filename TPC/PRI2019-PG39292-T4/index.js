var http = require('http')
var fs = require('fs')

var myserver = http.createServer(function(req,res) {
    
    console.log(req.method + ' ' + req.url)
    var t = req.url.split('/')
    var numero = t[t.length-1]
    var musica = t[t.length-2]

    if(req.method == 'GET'){
        if(numero=="doc2html.xsl"){
            fs.readFile('doc2html.xsl', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/xml'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do documento')
                }
                res.end()  
            });
        }

        else if((musica == 'musica') && (parseInt(numero,10) > 0) && (parseInt(numero,10) < 500)){
            fs.readFile('data/doc' + numero + '.xml', (erro, dados)=>{
                if(!erro){
                    res.writeHead(200, {'Content-Type':'text/xml'}) 
                    res.write(dados);
                }
                else {
                    res.writeHead(200, {'Content-Type':'text/plain'}) 
                    res.write('Erro na leitura do documento ' + 'data/doc' + numero + '.xml')
                }
                res.end()  
            });      
        }
        else{
            res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'}) 
            res.end('Introduza um URL correto "localhost/musica/numero"');
        }
    } 
})

myserver.listen(3022); 

console.log("Servidor ativo na porta 3022...");