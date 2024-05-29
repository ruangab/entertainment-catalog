from flask import render_template, Blueprint, request, jsonify
from models.Database import Database

class FilmesRoutes():
    #Criando a instância do blueprint
    filmes_routes = Blueprint('filmes_routes', __name__,
                            template_folder='../templates/filmes_templates/')

    
    @filmes_routes.route("/", methods = ["GET"])
    def pegar_todos_filmes():
        filmes_banco = Database._find_all(
            query={},
            limit=10,
            project={
                "original_title":1,
                "genres":1,
                "popularity":1,
                "overview":1,
                "_id":0
            },
            collection_name="filmes"
        )

        if filmes_banco is None:
            return jsonify({
                "status":"erro",
                "mensgem":"Erro ao consultar"
            })
        
        return jsonify({
            "status":"sucesso",
            "data":filmes_banco,
            "mensagem":"Listagem capturada com sucesso!"
        })
    
    @filmes_routes.route("/filtrar-filme", methods = ["GET"])
    def filtrar_filme():
        nome_filme = request.args.get("nome")

        filmes_banco = Database._find_one(
            query={
                "original_title":{"$regex":nome_filme}
            },
            project={
                "original_title":1,
                "genres":1,
                "popularity":1,
                "overview":1,
                "_id":0
            },
            collection_name="filmes"
        )

        if filmes_banco is None:
            return jsonify({
                "status":"erro",
                "mensgem":"Erro ao consultar"
            })
        
        return jsonify({
            "status":"sucesso",
            "data":filmes_banco,
            "mensagem":"Filme capturado com sucesso!"
        })

    @filmes_routes.route("/listagem", methods = ["GET"])
    def cadastro():
        return render_template("filmes_templates/listagem-filmes.html")