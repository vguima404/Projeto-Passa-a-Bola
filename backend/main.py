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
            "position": user.get("position"),
            "socials": user.get("socials"),
            "achievements": user.get("achievements", []),
            "matches": user.get("matches", []),
            "gols": user.get("gols", 0),
            "defesas": user.get("defesas", 0),
            "jogadora": user.get("jogadora", False),
            "olheiro": user.get("olheiro", False)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =========================
# ATUALIZAR USUÁRIO
# =========================
@app.route("/user/<user_id>", methods=["PUT"])
def update_user(user_id):
    try:
        data = request.json
        update_data = {}

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
        if "socials" in data:
            update_data["socials"] = data["socials"]
        if "achievements" in data:
            update_data["achievements"] = data["achievements"]
        if "matches" in data:
            update_data["matches"] = data["matches"]
        if "gols" in data:
            update_data["gols"] = data["gols"]
        if "defesas" in data:
            update_data["defesas"] = data["defesas"]

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
# ATUALIZAR ROLE (Jogadora ou Olheiro)
# =========================
@app.route("/user/<user_id>/role", methods=["PUT"])
def update_role(user_id):
    try:
        data = request.json
        role = data.get("role")  # "jogadora" ou "olheiro"

        if role not in ["jogadora", "olheiro"]:
            return jsonify({"success": False, "message": "Role inválida"}), 400

        update_data = {role: True}  # adiciona jogadora: True ou olheiro: True
        result = col.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

        if result.modified_count > 0:
            return jsonify({"success": True, "message": f"{role.capitalize()} habilitada"}), 200
        else:
            return jsonify({"success": False, "message": "Nada foi alterado"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =========================
# GET TODOS USUÁRIOS
# =========================
@app.route("/users", methods=["GET"])
def get_all_players():
    try:
        players = list(col.find({"cpf": {"$exists": True}}))
        for p in players:
            p["_id"] = str(p["_id"])
        return jsonify(players), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =========================
# TOP ESTATÍSTICAS
# =========================
@app.route("/top-stats", methods=["GET"])
def get_top_stats():
    try:
        top_gols = list(col.find({}, {"nome": 1, "gols": 1, "photoUrl": 1, "_id": 0}).sort("gols", -1).limit(3))
        top_defesas = list(col.find({}, {"nome": 1, "defesas": 1, "photoUrl": 1, "_id": 0}).sort("defesas", -1).limit(3))

        gols = [{"name": p.get("nome", ""), "image": p.get("photoUrl", "/placeholder-player.png"), "gols": p.get("gols", 0)} for p in top_gols]
        defesas = [{"name": p.get("nome", ""), "image": p.get("photoUrl", "/placeholder-player.png"), "defesas": p.get("defesas", 0)} for p in top_defesas]

        while len(gols) < 3:
            gols.append({"name": "", "image": "/placeholder-player.png", "gols": 0})
        while len(defesas) < 3:
            defesas.append({"name": "", "image": "/placeholder-player.png", "defesas": 0})

        return jsonify({"gols": gols, "defesas": defesas}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =========================
# RUN
# =========================
if __name__ == "__main__":
    app.run(debug=True)
