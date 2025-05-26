from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),  # <== THIS is crucial
]

#urlpatterns = [
#    path('admin/', admin.site.urls),
#    path('api/', include('core.urls')),  # Your app's API routes
#]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
