from rest_framework import viewsets
from .models import Category, Recipe
from .serializers import CategorySerializer, RecipeSerializer

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

    def get_serializer_context(self):
        """Добавляем request в контекст сериализатора"""
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class RecipeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    lookup_field = 'slug'
