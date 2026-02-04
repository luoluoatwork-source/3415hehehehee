from flask import Flask, render_template,request
import joblib

model = joblib.load("DBS_SGD.pkl")

app = Flask(__name__)

@app.route("/",methods=["GET","POST"])
def index():
    return(render_template("index.html"))

@app.route("/main",methods=["GET","POST"])
def main():
    return(render_template("main.html"))

@app.route("/dbs",methods=["GET","POST"])
def dbs():
    return(render_template("dbs.html"))

@app.route("/dbsPrediction",methods=["GET","POST"])
def dbsPrediction():
    q = float(request.form.get("q"))
    r = model.predict([[q]])
    r = r[0][0]
    return(render_template("dbsPrediction.html",r=r))

if __name__ == "__main__":
    app.run()