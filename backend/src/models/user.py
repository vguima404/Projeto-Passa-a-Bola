class User:
    def __init__(self, email, name, password):
        self.email = email
        self.name = name
        self.password = password

    def to_dict(self):
        return {
            "email": self.email,
            "name": self.name,
            "password": self.password
        }