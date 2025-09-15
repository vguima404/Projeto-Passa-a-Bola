from flask import Flask, request, jsonify 
from flask_cors import CORS  
from db.connection import col  
from src.routes.register import register_bp
from bson import ObjectId

app = Flask(__name__)

# CORS liberado para o frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

# Blueprint de cadastro
app.register_blueprint(register_bp)

# =========================
# LOGIN
# =========================
@app.route("/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
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
            "user_id": str(user["_id"]),
            "name": user.get("nome")
        }), 200
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

# =========================
# GET USUÁRIO
# =========================
@app.route("/user/<user_id>", methods=["GET"])
def get_user(user_id):
    try:
        user = col.find_one({"_id": ObjectId(user_id)})
        if not user:
            return jsonify({"success": False, "message": "Usuário não encontrado"}), 404

        return jsonify({
            "success": True,
            "email": user.get("email"),
            "name": user.get("nome"),
            "cpf": user.get("cpf"),
            "photoUrl": user.get("photoUrl"),
            "position": user.get("position")
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =========================
# ATUALIZAR USUÁRIO (CPF, foto, posição, nome, email)
# =========================
@app.route("/user/<user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        data = request.json
        update_data = {}

        # Atualiza campos permitidos
        if "cpf" in data:
            update_data["cpf"] = data["cpf"]
        if "photoUrl" in data:
            update_data["photoUrl"] = data["photoUrl"]
        if "position" in data:
            update_data["position"] = data["position"]
        if "name" in data:
            update_data["nome"] = data["name"]
        if "email" in data:
            update_data["email"] = data["email"]

        if not update_data:
            return jsonify({"success": False, "message": "Nenhum dado para atualizar"}), 400

        result = col.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

        if result.modified_count > 0:
            return jsonify({"success": True, "message": "Perfil atualizado"}), 200
        else:
            return jsonify({"success": False, "message": "Nada foi alterado"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =========================
# RUN
# =========================
if __name__ == "__main__":
    app.run(debug=True)
