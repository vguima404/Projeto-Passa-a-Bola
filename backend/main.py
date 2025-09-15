from flask import Flask, request, jsonify
from flask_cors import CORS  
from db.connection import col  
from src.routes.register import register_bp
from bson import ObjectId
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
        return jsonify({
            "success": True,
            "message": "Sucesso no Login",
            "user_id": str(user["_id"]),   # aqui retorna o ObjectId
            "name": user.get("nome")      # opcional, pode retornar nome também
        }), 200
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

@app.route("/user/<user_id>", methods=["GET"])
def get_user(user_id):
    try:
        user = col.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"success": False, "message": "Usuário não encontrado"}), 404

        return jsonify({
            "success": True,
            "email": user["email"],
            "name": user.get("nome")
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400




if __name__ == "__main__":
    app.run(debug=True)
