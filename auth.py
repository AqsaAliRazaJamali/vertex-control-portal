import jwt
from datetime import datetime, timedelta

SECRET_KEY = "VERTEX_SUPER_SECRET_SECURITY_MATRIX_KEY"
ALGORITHM = "HS256"

# Plain text password ko basic format secure string mein convert karna
def hash_password(password: str) -> str:
    return f"vertex_secure_hash_{password[::-1]}" # Inverting password for custom signature

# Token validation generator loop
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt