Installation
---------------

virtualenv -p python3 envname
cd envname
source bin/activate

# Install Django
pip install Django

# Install Geospatial libraries (Ubuntu)
sudo apt-get install binutils libproj-dev gdal-bin

# Install PostGIS
sudo apt-get install postgis
pip install psycopg2

pip install requests
