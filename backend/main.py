
from flask import Flask
from flask_cors import CORS  
from src.routes.register import register_bp

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

app.register_blueprint(register_bp)  

if __name__ == '__main__':
    app.run(debug=True)