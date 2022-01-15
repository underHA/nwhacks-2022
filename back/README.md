to setup:

make virtual environment (with name 'modules') if first time running
```
python3 -m venv ./modules
```

go into virtual environment, modules
```
source ./modules/bin/activate
```

install dependencies if first time running
```
make install
```

launch the server with dependencies, aka main.py. 
```
make server
```

check server is working
```
curl http://localhost:5000/
```