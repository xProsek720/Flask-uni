from flask import *
import math
import os

###
# TU WSZYSTKO DZIEJE SIĘ SERVERSIDE AŁĆ XD
# ###

inf = math.inf

app = Flask(__name__)
app.secret_key = str(os.urandom(24)).encode("utf-8")

funcCounter = 0

def funcGen(numb, app, funcCounter):
    source =f'''
@app.route('/{numb}', methods = ["GET", "POST"])
def f{funcCounter}():
    if session["kalkulacja"] == "0":
        session["kalkulacja"] = f"{numb}"
    else:
        session["kalkulacja"] += f"{numb}"

    return render_template('index.htm', calc = session['kalkulacja'])
'''
    funcCounter +=1
    f = exec(source)
    return f

def funcGen2(numb, app, funcCounter):
    source =f'''
@app.route('/{numb}', methods = ["GET", "POST"])
def f{funcCounter}():
    session["kalkulacja"] += "{numb}"

    return render_template('index.htm', calc = session['kalkulacja'])
'''
    funcCounter +=1
    f = exec(source)
    return f

def funcGen3(numb, app, funcCounter, link=-1):
    if link == -1:
        link = numb
    source =f'''
@app.route('/{link}', methods = ["GET", "POST"])
def f{funcCounter}():
    if not(session['kalkulacja'].endswith("{numb}")):
        session["kalkulacja"] += "{numb}"

    return render_template('index.htm', calc = session['kalkulacja'])
'''
    funcCounter +=1
    f = exec(source)
    return f

@app.route('/', methods = ["GET", "POST"])
def hello():

    session["kalkulacja"] = "0"

    return render_template('index.htm', calc = session['kalkulacja'])

for i in range(10):
    funcGen(i, app, i)
else:
    funcCounter = i

funcCounter += 1
funcGen2("+", app, funcCounter)

funcCounter += 1
funcGen2("-", app, funcCounter)

funcCounter += 1
funcGen3("*", app, funcCounter)

funcCounter += 1
funcGen3("/", app, funcCounter, "d")

funcCounter += 1
funcGen2("(", app, funcCounter)

funcCounter += 1
funcGen2(")", app, funcCounter)

funcCounter += 1
funcGen3(".", app, funcCounter, "dot")

@app.route('/e', methods = ["GET", "POST"])
def hello13():
    try:
        if (session['kalkulacja'].startswith("0")):
            session['kalkulacja'] = session['kalkulacja'].lstrip("0")
            session["kalkulacja"] = str(eval(session['kalkulacja']))
        else:
            session['kalkulacja'] = str(eval(session['kalkulacja']))
    except SyntaxError:
        session['kalkulacja'] = '0'
        print("SYNTAX ERR IN ONE SESSION")
    except ZeroDivisionError:
        session['kalkulacja'] = 'inf'
    except NameError:
        session['kalkulacja'] = '0'
    except TypeError:
        session['kalkulacja'] = '0'
    except KeyError:
        session["kalkulacja"] = "0"
        return render_template('index.htm', calc = session['kalkulacja'])
    return render_template('index.htm', calc = session['kalkulacja'])
@app.route('/c', methods = ["GET", "POST"])
def hello37():
    if len(session['kalkulacja']) == 1:
        session['kalkulacja'] = '0'
    else:
        session["kalkulacja"] = session['kalkulacja'][0:-1]

   # print(session['kalkulacja'])

    return render_template('index.htm', calc = session['kalkulacja'])


if __name__ == "__main__":
    app.run(port = 80)
