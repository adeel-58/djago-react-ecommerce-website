from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path # ADDED: re_path
from django.views.generic import TemplateView # ADDED: TemplateView

# You have duplicated admin imports, keeping one.
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView # Not directly used in urlpatterns below, but keep if used elsewhere

urlpatterns = [
    path('admin/', admin.site.urls),
    # Your API routes. It's good that they are prefixed with 'api/'.
    path('api/', include('core.urls')), # <== THIS is crucial

    # ADDED: Catch-all URL pattern for your React frontend.
    # This serves the index.html for any path not handled by Django's other URLs (like /admin/ or /api/).
    re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name='index.html')),
]

# This block is for development serving of static/media files.
# With WhiteNoise, these are not strictly necessary in production as WhiteNoise handles it.
# However, keeping them inside `if settings.DEBUG:` is standard practice.
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # MODIFIED: For DEBUG=False with WhiteNoise, STATIC_ROOT is handled by WhiteNoise middleware.
    # The line below is primarily for DEBUG=True when not using WhiteNoise or for specific dev needs.
    # For a production-like test with DEBUG=False, WhiteNoise takes over serving STATIC_ROOT.
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)