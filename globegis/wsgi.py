"""
WSGI config for sensegis project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

#import os
#
#from django.core.wsgi import get_wsgi_application
#
#os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'globegis.settings')
#
#application = get_wsgi_application()

import os
import time
import traceback
import signal
import sys
# from desires.settings import BASE_DIR

from django.core.wsgi import get_wsgi_application

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# adjust the Python version in the line below as needed
sys.path.append('~/worldwind/lib/python3.6/site-packages')

os.environ["DJANGO_SETTINGS_MODULE"] = "globegis.settings"

try:
    application = get_wsgi_application()
except Exception:
    # Error loading applications
    if 'mod_wsgi' in sys.modules:
        traceback.print_exc()
        os.kill(os.getpid(), signal.SIGINT)
        time.sleep(2.5)
