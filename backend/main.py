from flask import Flask, request, jsonify 
from flask_cors import CORS  
from db.connection import col  
from src.routes.register import register_bp
from bson import ObjectId
import os
import requests
import base64
from dotenv import load_dotenv

load_dotenv()  # carrega variáveis de ambiente de um arquivo .env local (desenvolvimento)

app = Flask(__name__)

# Origens permitidas (sem barra no final)
ALLOWED_ORIGINS = {
    # dev local (Next pode subir em 3000 ou 3001)
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    # produção
    "https://projeto-passa-a-bola.vercel.app",
}


CORS(
    app,
    origins=list(ALLOWED_ORIGINS),
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True,
)

# Garante que TODAS as respostas (incluindo preflight) recebam os headers de CORS
@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        # Vary para impedir cache incorreto entre diferentes origens
        vary = response.headers.get("Vary")
        response.headers["Vary"] = f"{vary}, Origin" if vary else "Origin"
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    return response

# Responde genericamente a preflight OPTIONS para qualquer rota
@app.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        return ("", 204)
app.register_blueprint(register_bp)

# =====================================
# LOGIN NORMAL
# =====================================
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
            "name": user.get("nome"),
            "admin": user.get("admin", False)
        }), 200
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

# =====================================
# LOGIN ADMIN
# =====================================
@app.route("/admin-login", methods=["POST", "OPTIONS"])
def admin_login():
    if request.method == "OPTIONS":
        return jsonify({"success": True}), 200

    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400

    user = col.find_one({"email": email, "senha": password})

    if user and user.get("admin") is True:
        return jsonify({
            "success": True,
            "message": "Admin login successful",
            "user": {
                "user_id": str(user["_id"]),
                "name": user.get("nome"),
                "email": user.get("email"),
                "admin": True
            }
        }), 200
    elif user:
        return jsonify({
            "success": False,
            "message": "Acesso negado. Este usuário não é administrador."
        }), 403
    else:
        return jsonify({"success": False, "message": "Invalid email or password"}), 401

# =====================================
# GET USUÁRIO
# =====================================
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
            "olheiro": user.get("olheiro", False),
            "admin": user.get("admin", False)
        }), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =====================================
# ATUALIZAR USUÁRIO
# =====================================
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

# =====================================
# ATUALIZAR ROLE
# =====================================
@app.route("/user/<user_id>/role", methods=["PUT"])
def update_role(user_id):
    try:
        data = request.json
        role = data.get("role")

        if role not in ["jogadora", "olheiro"]:
            return jsonify({"success": False, "message": "Role inválida"}), 400

        update_data = {role: True}
        result = col.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

        if result.modified_count > 0:
            return jsonify({"success": True, "message": f"{role.capitalize()} habilitada"}), 200
        else:
            return jsonify({"success": False, "message": "Nada foi alterado"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =====================================
# GET TODOS USUÁRIOS
# =====================================
@app.route("/users", methods=["GET"])
def get_all_players():
    try:
        players = list(col.find({"cpf": {"$exists": True}}))
        for p in players:
            p["_id"] = str(p["_id"])
        return jsonify(players), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =====================================
# GET USERS PARA ADMIN
# =====================================
@app.route("/admin/users", methods=["GET"])
def get_all_players_admin():
    try:
        players = list(col.find({"cpf": {"$exists": True}}))
        response = []
        for p in players:
            response.append({
                "_id": str(p["_id"]),
                "nome": p.get("nome", ""),
                "tipo": p.get("tipo") or ("Jogadora" if p.get("jogadora") else "Olheiro" if p.get("olheiro") else ""),
                "gols": p.get("gols", 0),
                "defesas": p.get("defesas", 0)
            })
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =====================================
# TOP ESTATÍSTICAS
# =====================================
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

# =====================================
# REMOVER USUÁRIO
# =====================================
@app.route("/user/<user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        user = col.find_one({"_id": ObjectId(user_id)})
        if user and user.get("admin", False):
            return jsonify({"success": False, "message": "Usuário admin não pode ser removido"}), 403
        result = col.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count > 0:
            return jsonify({"success": True, "message": "Usuário removido com sucesso"}), 200
        else:
            return jsonify({"success": False, "message": "Usuário não encontrado"}), 404
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

# =====================================
# HEALTH CHECK / TEST
# =====================================
@app.route("/")
def home():
    return jsonify({"status": "Backend online"}), 200

# =====================================
# UPLOAD IMAGEM (imgbb)
# =====================================
IMGBB_API_KEY = os.environ.get("IMGBB_API_KEY")  # definir no Render e local (.env)

@app.route("/upload-image", methods=["GET", "POST", "OPTIONS"])
def upload_image():
    if request.method == "OPTIONS":
        return ("", 204)

    if request.method == "GET":
        # Endpoint de verificação rápida em produção
        return jsonify({
            "success": True,
            "message": "Endpoint /upload-image disponível. Envie POST multipart/form-data com campo 'image'."
        }), 200

    if not IMGBB_API_KEY:
        return jsonify({"success": False, "message": "IMGBB_API_KEY não configurada"}), 500

    if 'image' not in request.files:
        return jsonify({"success": False, "message": "Arquivo 'image' não enviado"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"success": False, "message": "Nome de arquivo vazio"}), 400

    try:
        # Validação simples de tamanho (<= 5MB)
        file.seek(0, 2)  # move para fim
        size = file.tell()
        file.seek(0)
        if size > 5 * 1024 * 1024:
            return jsonify({"success": False, "message": "Imagem excede 5MB"}), 400

        raw = file.read()
        b64 = base64.b64encode(raw).decode('utf-8')
        url = f"https://api.imgbb.com/1/upload"
        payload = {"key": IMGBB_API_KEY, "image": b64}
        resp = requests.post(url, data=payload, timeout=25)
        if resp.status_code != 200:
            return jsonify({"success": False, "message": f"Erro imgbb {resp.status_code}", "detail": resp.text[:500]}), 502
        j = resp.json()
        if not j.get('success'):
            return jsonify({"success": False, "message": "Falha no imgbb", "detail": str(j)[:500]}), 502
        link = j.get('data', {}).get('url')
        if not link:
            return jsonify({"success": False, "message": "Resposta imgbb sem URL", "detail": str(j)[:500]}), 502
        return jsonify({"success": True, "link": link}), 200
    except Exception as e:
        return jsonify({"success": False, "message": "Exceção no upload", "detail": str(e)[:500]}), 500

# =====================================
# RUN (Render e local)
# =====================================
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)