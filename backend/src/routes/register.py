from flask import Blueprint, request, jsonify
from src.models.user import User
from db.connection import col
import json
import os

register_bp = Blueprint('register', __name__)

@register_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    name = data.get('name')
    password = data.get('password')


    user = {
    "email": email,
    "nome": name,
    "senha": password  # idealmente, hasheada
}

    result = col.insert_one(user)

    # Retorna o id do documento criado
    return {"id": str(result.inserted_id), "email": email, "name": name}, 201