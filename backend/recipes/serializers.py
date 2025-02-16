from rest_framework import serializers
from .models import Category, Recipe

class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'slug', 'category', 'ingredients',
                 'instructions', 'cooking_time', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    recipes = RecipeSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'image_url',
                 'recipes_count', 'cooking_time_avg', 'recipes']

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None
