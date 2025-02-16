from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Recipe


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'recipes_count', 'image_preview')
    prepopulated_fields = {'slug': ('name',)}

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
        return "Нет изображения"

    image_preview.short_description = 'Предпросмотр изображения'

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'cooking_time', 'created_at')
    list_filter = ('category', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'ingredients')
