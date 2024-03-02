from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
import json

app = Flask(__name__)

@app.route("/")
def home():
    if request.method == 'POST':
        return render_template("rixs.html")
    if request.method == 'GET':
        return render_template("rixs.html")
@app.route("/index")

@app.route('/getmethod/<jsdata>')
def get_javascript_data(jsdata):
    return jsdata

@app.route('/postmethod', methods = ['POST'])
def get_post_javascript_data():
    jsdata = request.form['javascript_data']
    return jsdata

'''
@app.route('/login', methods=['GET', 'POST'])
def login():
   message = None
   if request.method == 'POST':
        datafromjs = request.form['mydata']
        result = "return this"
        resp = make_response('{"response": '+result+'}')
        resp.headers['Content-Type'] = "application/json"
        return resp
        return render_template('login.html', message=''
    
@app.route("path", methods=['GET', 'POST'])
def view():
    name = request.form.get('name')
    ...
    '''

if __name__ == "__main__":
    app.run(debug = True)
    
def errorhandler(e):
    if not isinstance(e, HTTPException):
        e = InternalServerError()
        return apology(e.name, e.code)
        
def apology(message, code=400):
    return render_template("apology.html")