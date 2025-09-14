from flask import Blueprint, request, jsonify
from src.models.user import User
import json
import os

register_bp = Blueprint('register', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')

    # Cria o usuário
    user = User(email=email, name=name, password=password)

    # Salva no arquivo JSON (simulando banco)
    users_file = os.path.join(os.path.dirname(__file__), '..', 'db', 'users.json')
    users_file = os.path.abspath(users_file)
    if os.path.exists(users_file):
        with open(users_file, 'r', encoding='utf-8') as f:
            users = json.load(f)
    else:
        users = []

    users.append(user.to_dict())

    with open(users_file, 'w', encoding='utf-8') as f:
        json.dump(users, f, ensure_ascii=False, indent=2)

    return jsonify(user.to_dict()), 201