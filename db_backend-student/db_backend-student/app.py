from flask import Flask

from routes import initialize_routes
from flask_cors import CORS

# create the Flask application
app = Flask(__name__)

# used to sign cookies to protect against data tampering
app.config['SECRET_KEY'] = 'Hello from the secret world of Flask! ;)'

# used to allow cross origin resource sharing e.g. requests from different hosts
app.config['CORS_HEADERS'] = ['Content-Type','Authorization']
CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "*"}})


initialize_routes(app)

if __name__ == "__main__":
    app.run(debug=True)

