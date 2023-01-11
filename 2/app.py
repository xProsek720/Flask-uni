from flask import *
import math
import os

inf = math.inf

app = Flask(__name__)
app.secret_key = str(os.urandom(24)).encode("utf-8")


@app.route('/', methods = ["GET", "POST"])
def hello():


    return render_template('index.htm')

if __name__ == "__main__":
    app.run(port = 80)


