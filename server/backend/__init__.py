from flask import Flask, jsonify
from flask_cors import CORS
from flask_graphql import GraphQLView

from .api.payments import payments_bp
from .graphql.schema import schema


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True),
    )
    app.register_blueprint(payments_bp)

    @app.route("/")
    def home():
        return jsonify({"message": "Welcome to the Numida API"})

    return app
