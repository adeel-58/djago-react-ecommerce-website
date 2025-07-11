import os
from .settings import *
from .settings import BASE_DIR


ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = ['https://'+os.environ['WEBSITE_HOSTNAME']]
DEBUG = True
SECRET_KEY = os.environ['MY_SECRET_KEY']

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # ADDED: WhiteNoise middleware. Must be after SecurityMiddleware.
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware', # This is duplicated, remove one if not needed
]

CORS_ALLOWED_ORIGINS =["https://blue-desert-098867800.2.azurestaticapps.net",]

STORAGES={
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

CONNECTION = os.environ['AZURE_POSTGRESQL_CONNECTIONSTRING']
CONNECTION_STR = {pair.split('=')[0]:pair.split('=')[1] for pair in CONNECTION.split(' ')}
DATABASES = {
    'default':{
        'ENGINE' : 'django.db.backends.postgresql',
        'NAME':  CONNECTION_STR['dbname'],
        'USER':CONNECTION_STR['user'],
        'PASSWORD' :CONNECTION_STR['password'],
        'HOST': CONNECTION_STR['host'],
        

    }
}


STATIC_ROOT=BASE_DIR/'staticfiles'