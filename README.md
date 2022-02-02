# MCI_project
This is the Master of Computing and Innovation Project by eason ma. 

**Server** consists of **Backend**, **Client Folder** and **Machine Learning Algorithm**

**Client** consists of Frontend

To make sure the project can run, you need to install npm and node.js

You can start the project by running (without running ML):
```
npm run dev
```
If you want to test ML, you need to install the libraries in requirements.txt:
```
pip3 install -r /server/requirements.txt
```

**Vgdemo** include a vagrantFile, to use this, you have to install Vagrant and a VM VirtualBox. 

```
cd vgdemo
```
```
vagrant up
```
It will create a virtual environment for you. (Note: The username and password both are: vagrant) After the VM is starting. You can go to /src and run:
```
npm run dev
```
The project should run automatically in localhost 3000
