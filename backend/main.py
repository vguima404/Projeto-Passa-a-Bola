from flask import Flask, request, jsonify
from flask_cors import CORS  
from db.connection import col  
from src.routes.register import register_bp

app = Flask(__name__)

# CORS liberado para o frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

app.register_blueprint(register_bp)

@app.route("/login", methods=["POST", "OPTIONS"])  # aceita POST e preflight OPTIONS
def login():
    if request.method == "OPTIONS":
        # responde ao preflight
        return jsonify({"success": True}), 200

    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    user = col.find_one({"email": email, "senha": password})

    if user:
        return jsonify({"success": True, "message": "Login successful"})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401


if __name__ == "__main__":
    app.run(debug=True)
