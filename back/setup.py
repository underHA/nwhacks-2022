from setuptools import setup, find_packages

requires = [
    'flask',
    'flask-sqlalchemy',
    'psycopg2',
]

setup(
    name='flask_nwhacks',
    version='0.0',
    description='nwhacks22 project backend',
    keywords='web flask',
    packages=find_packages(),
    include_package_data=True,
    install_requires=requires
)