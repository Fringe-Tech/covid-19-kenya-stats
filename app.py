from flask import Flask, render_template, url_for
import requests
import json
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
@app.route('/')
def index():
  r = requests.get('https://corona.lmao.ninja/countries/kenya')
  return render_template('index.html', stats=json.loads(r.text))
  print("stats data: ", r.text)

if __name__ == "__main__":
    app.run(debug=True)   
