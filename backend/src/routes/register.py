from flask import Blueprint, request, jsonify
from src.models.user import User
from db.connection import col

register_bp = Blueprint('register', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')
    cpf = data.get('cpf', "")
    photoUrl = data.get('photoUrl', "/placeholder-player.png")
    position = data.get('position', "")

    # Verifica se o email já está registrado
    existing_user = col.find_one({"email": email})
    if existing_user:
        return jsonify({"success": False, "message": "Email já registrado."}), 409 

    # Cria o documento da jogadora com campos extras e estatísticas zeradas
    user = {
        "email": email,
        "nome": name,
        "senha": password,  # idealmente, hasheada
        "cpf": cpf,
        "photoUrl": photoUrl,
        "position": position,
        "socials": {},
        "achievements": [],
        "matches": [],
        "gols": 0,      # inicializa gols
        "defesas": 0    # inicializa defesas
    }

    result = col.insert_one(user)

    # Retorna o id do documento criado
    return {
        "id": str(result.inserted_id),
        "email": email,
        "name": name,
        "cpf": cpf,
        "photoUrl": photoUrl,
        "position": position,
        "gols": 0,
        "defesas": 0
    }, 201