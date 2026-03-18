from flask import Flask, render_template,request
import joblib
from groq import Groq
import os

client= Groq()

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

@app.route("/chatbot",methods=["GET","POST"])
def chatbot():
    return(render_template("chatbot.html"))

@app.route("/chatbotReply",methods=["GET","POST"])
def chatbotReply():
    q = request.form.get("q")
    r = client.chat.completions.create(
    model="llama-3.1-8b-instant",
    messages=[
        {"role": "user","content": q}
        ]
    )
    return(render_template("chatbotReply.html", r=r.choices[0].message.content))

if __name__ == "__main__":
    app.run()