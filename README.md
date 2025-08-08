For backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate

python manage.py runserver


python manage.py runworker background-tasks


http://127.0.0.1:8000/api/notes/  


 npm install -g wscat
then try something like {"message": "test"}
should get
> {"message": "test"}
< {"message": "Echo: test"}

cd frontend
npm i
npm run dev
