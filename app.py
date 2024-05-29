from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET"])
def login():
    return render_template("usuario_templates/usuario-login.html")

@app.route("/cadastro", methods=["GET"])
def cadastro():
    return render_template("usuario_templates/usuario-cadastro.html")

@app.route("/inicio", methods=["GET"])
def inicio():
    return render_template("")

#Importação da classe onde fica o blueprint
from routes.UsuarioRoutes import UsuarioRoutes
from routes.FilmesRoutes import FilmesRoutes
from routes.AnimesRoutes import AnimesRoutes
#Adicionando o blueprint na instância principal do flask
app.register_blueprint(UsuarioRoutes.usuario_routes, url_prefix = "/usuario")
# app.register_blueprint(AnimesRoutes.AnimesRoutes, url_prefix = "/animes")
app.register_blueprint(FilmesRoutes.filmes_routes, url_prefix = "/filmes")


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=19980, debug=True)