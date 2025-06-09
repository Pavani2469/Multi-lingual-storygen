# auth.py
from flask import request, redirect, url_for, session, render_template

users = {}  # In-memory DB for demo purposes

def handle_signup(req):
    username = req.form['username']
    password = req.form['password']
    if username in users:
        return "User already exists"
    users[username] = password
    return redirect(url_for('login'))

def handle_login(req):
    username = req.form['username']
    password = req.form['password']
    if users.get(username) == password:
        session['username'] = username
        return redirect(url_for('home'))
    return render_template('login.html', error='Invalid credentials')
