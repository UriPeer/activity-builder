from flask import Flask, request, jsonify
from hashlib import sha256
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS, cross_origin
from jose import jwt
from functools import wraps
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func
import os
from datetime import datetime, timedelta
app = Flask(__name__)

# Init app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(basedir, 'db.sqlite')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)



class Users(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  firstName = db.Column(db.String(80), nullable=False)
  lastName = db.Column(db.String(80), nullable=False)
  email = db.Column(db.String(80), nullable=False, unique=True)
  phone = db.Column(db.String(10), nullable=False)
  passwordHash = db.Column(db.String(64), nullable=False)

class Activities(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  authorId = db.Column(db.Integer, nullable=False)
  subject = db.Column(db.String(100), nullable=False)
  goal = db.Column(db.String(100), nullable=False)
  description = db.Column(db.String(1500), nullable=False)
  audience = db.Column(db.String(1), nullable=False)

class Methods(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  activityId = db.Column(db.Integer, ForeignKey('activities.id'))
  name = db.Column(db.String(80), nullable=False)
  type = db.Column(db.String(80), nullable=False)
  description = db.Column(db.String(1000), nullable=False)
  notes = db.Column(db.String(1000), nullable=False)
  time = db.Column(db.Integer, nullable=False)
  equipment = db.Column(db.JSON, nullable=False)

class UserSchema(ma.Schema):
  class Meta:
    fields = ("id", "firstName", "lastName", "email", "phone")

class ActivitySchema(ma.Schema):
  class Meta:
    fields = ("id", "authorId", "subject", "goal", "description", "audience")

class MethodSchema(ma.Schema):
  class Meta:
    fields = ("id", "activityId", "name", "type", "description", "notes", "time", "equipment")

# Init schema
user_schema = UserSchema()
users_schema = UserSchema(many=True)
activity_schema = ActivitySchema()
activities_schema = ActivitySchema(many=True)
method_schema = MethodSchema()
methods_schema = MethodSchema(many=True)

def none_to_empty(val):
   if val == None:
      return ""
   return val

# Secret Key
SECRET_KEY = "4PmwCmANEELXEsKlw7PjfMlC3mHg8y3w"
# Generate JWT token
def generate_JWT(user):
  data = {"id":user.id, "role":"admin" if user.id == 1 else "user", "exp":datetime.utcnow() + timedelta(hours=2)}
  return jwt.encode(data, SECRET_KEY, algorithm="HS256")

# User Authentication Decorator
def requires_auth(allowed_roles):
    def decorator(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            try:
                try:
                    auth = request.headers.get("Authorization", None)
                    if not auth:
                        raise Exception("Header must contain Authorization")

                    parts = auth.split()
                    if parts[0].lower() != "bearer":
                        raise Exception("Authorization must start with Bearer")
                    elif len(parts) == 1:
                        raise Exception("Token not found")
                    elif len(parts) < 2:
                        raise Exception("Authorization must be: Bearer Token")

                    token = parts[1]
                except Exception:
                    raise
                try:
                    payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
                except:
                    return {"error":"Invalid Token"}, 498
                if payload["role"] not in allowed_roles:
                    raise Exception("Role must be one of: {}".format(", ".join(allowed_roles)))
                return f(payload, *args, **kwargs)
            except Exception as e:
                return {"error": str(e)}, 401
        return decorated
    return decorator


@app.route('/signup', methods=['POST'])
def signup():
  firstName = request.json['firstName']
  lastName = request.json['lastName']
  email = request.json['email']
  phone = request.json['phone']
  passwordHash = sha256(request.json['password'].encode('utf-8')).hexdigest()

  new_user = Users(firstName=firstName,
              lastName=lastName, 
              email=email,
              phone=phone,
              passwordHash=passwordHash)
  try:
    db.session.add(new_user)
    db.session.commit()
  except:
    return {"error": "Can't add user"}, 422
  return user_schema.jsonify(new_user)

@app.route('/login', methods=['POST'])
def login():
  email = request.json['email']
  passwordHash = sha256(request.json['password'].encode('utf-8')).hexdigest()
  users = Users.query.filter(Users.email==email,Users.passwordHash==passwordHash)
  if users.count() == 1:
    user = users.one()

    return {"access_token": generate_JWT(user)}
  else:
    return {"error": "Illegal credentials"}, 401

@app.route('/user', methods=["GET"])
@requires_auth(["admin", "user"])
def get_user(payload):
  user = Users.query.get(payload["id"])
  if not user:
    return {"error": "User not found"}, 404
  return user_schema.jsonify(user)

@app.route('/user/<id>', methods=["GET"])
@requires_auth(["admin"])
def get_user_by_id(payload, id):
  user = Users.query.get(id)
  if not user:
    return {"error": "User not found"}, 404
  return user_schema.jsonify(user)

@app.route('/user/<id>', methods=["DELETE"])
@requires_auth(["admin"])
def delete_user(payload, id):
  user = Users.query.get(id)
  if not user:
    return{"error": "User not found"}, 404
  try:
    db.session.delete(user)
    db.session.commit()
  except:
    return {"error": "Can't delete user"}, 500
  return user_schema.jsonify(user)

@app.route('/users', methods=["GET"])
@requires_auth(["admin"])
def get_users(payload):
  users = Users.query.all()
  if not users:
    return {"error": "No users found"}
  result = users_schema.dump(users)
  return jsonify(result)

@app.route('/user/<id>', methods=["PUT"])
@requires_auth(["user", "admin"])
def update_user(payload, id):  
  if not (payload["role"] == "admin" or payload["id"] == id):
    return {"error": "User Not authorized"}
  user = Users.query.get(id)
  if not user:
    return {"error": "User not found"}, 404
  try:
    if request.json['firstName']:
        user.firstName = request.json['firstName']

    if request.json['lastName']:
        user.lastName = request.json['lastName']

    if request.json['email']:
        user.email = request.json['email']

    if request.json['phone']:
        user.phone = request.json['phone']

    if request.json['password']:
        user.passwordHash = sha256(request.json['password'].encode('utf-8')).hexdigest()

    db.session.commit()
  except Exception as error:
    return {"error": f"Can't update user. \n{error}"}, 500
  return user_schema.jsonify(user)

@app.route('/activity', methods=["POST"])
@requires_auth(["user", "admin"])
def create_activity(payload):
  authorId = request.json['authorId']
  subject = request.json['subject']
  goal = request.json['goal']
  description = request.json['description']
  audience = request.json['audience']
  methods = request.json['methods']
  
  new_activity = Activities(
    authorId=authorId,
    subject=subject,
    goal=goal,
    description=description,
    audience=audience,
  )

  try:
    db.session.add(new_activity)
    db.session.flush()
  except:
    db.session.rollback()
    return {"error": "Can't add activity"}, 422

  for method in methods:
    new_method = Methods(
      activityId = new_activity.id,
      name = method["name"],  
      type = method["type"],
      description = method["description"],
      notes = method["notes"],
      time = method["time"],
      equipment = method["equipment"],
    )
    try:
      db.session.add(new_method)
    except:
      db.session.rollback()
      return {"error": "Can't add method"}, 422
  try:
    db.session.commit()
  except:
    db.session.rollback()
    return {"error": "Can't add activity"}, 422
  return activity_schema.jsonify(new_activity)

@app.route('/activity/<id>', methods=["DELETE"])
@requires_auth(["user", "admin"])
def delete_activity(payload, id):
  activity = Activities.query.get(id)
  if not activity:
    return{"error": "Activity not found"}, 404
  if not (payload["role"] == "admin" or payload["id"] == activity.authorId):
    return {"error": "User Not authorized"}
  try:
    db.session.delete(activity)
    db.session.commit()
  except:
    return {"error": "Can't delete activity"}, 500
  return activity_schema.jsonify(activity)

@app.route('/activity/<id>', methods=["GET"])
def get_activity(id):
  activity = Activities.query.get(id)
  if not activity:  
    return {"error": "Activity not found"}, 404
  methods = Methods.query.filter(Methods.activityId==activity.id)
  user = Users.query.get(activity.authorId)
  result = activity_schema.dump(activity)
  result.update({"methods": methods_schema.dump(methods)})
  if user:
    result.update({"author": none_to_empty(user.firstName) + " " + none_to_empty(user.lastName)})
  else:
    result.update({"author": ""})
  return jsonify(result)

@app.route('/activity/<id>', methods=["PUT"])
@requires_auth(["user", "admin"])
def update_activity(payload, id):
    activity = Activities.query.get(id)
    if not activity:
        return {"error": "Activity not found"}, 404
    if not (payload["role"] == "admin" or payload["id"] == activity.authorId):
      return {"error": "User Not authorized"}
    try:
        activity.authorId = request.json['authorId']
        activity.subject = request.json['subject']
        activity.goal = request.json['goal']
        activity.description = request.json['description']
        activity.audience = request.json['audience']
        methods = Methods.query.filter(Methods.activityId == id)
        methods.delete()
        for method in request.json['methods']:
          new_method = Methods(
          activityId = id,
          name = method["name"],  
          type = method["type"],
          description = method["description"],
          notes = method["notes"],
          time = method["time"],
          equipment = method["equipment"],
          )
          try:
            db.session.add(new_method)
          except:
            return {"error": "Can't update method"}, 500
        db.session.commit()
    except:
        return {"error": "Can't update activity"}, 500
    return activity_schema.jsonify(activity)

@app.route('/activities', methods=["GET"])
def get_activities():
  all_activities = db.session.query(
    Activities, Users.firstName, Users.lastName, 
    func.count(Methods.id), 
    func.ifnull(func.sum(Methods.time), 0)
    ).outerjoin(Users, Users.id == Activities.authorId
    ).outerjoin(Methods).group_by(Activities.id, Users.id
    ).all()
  if not all_activities:
    return {"error": "No activities found"}, 404
  result = activities_schema.dump([x[0] for x in all_activities])
  result = [result[i].update({
    "methodsCount": all_activities[i][3],
    "time": all_activities[i][4],
    "author": none_to_empty(all_activities[i][1]) + " " + none_to_empty(all_activities[i][2])
  }) or result[i] for i in range(len(result))]

  return jsonify(result)

@app.route('/activities/<id>', methods=["GET"])
def get_user_activities(id):
  all_activities = db.session.query(
    Activities, 
    func.count(Methods.id), 
    func.ifnull(func.sum(Methods.time), 0)
    ).outerjoin(Methods).filter(Activities.authorId == id).group_by(Activities.id)
  if not all_activities:
    return {"error": "No activities found"}, 404
  result = activities_schema.dump([x[0] for x in all_activities])
  result = [result[i].update({
    "methodsCount": all_activities[i][1],
    "time": all_activities[i][2]
  }) or result[i] for i in range(len(result))]

  return jsonify(result)

if __name__ == "__main__":
  app.run(debug=True)