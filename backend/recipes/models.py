from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name="Название")
    slug = models.SlugField(unique=True, blank=True)
    description = models.TextField(blank=True, verbose_name="Описание")
    image = models.ImageField(
        upload_to='categories/',
        verbose_name="Изображение",
        blank=True,
        null=True
    )
    recipes_count = models.IntegerField(default=0, verbose_name="Количество рецептов")
    cooking_time_avg = models.IntegerField(default=0, verbose_name="Среднее время приготовления")

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        # Сначала сохраняем объект
        super().save(*args, **kwargs)

        # Теперь можно обновить статистику
        if self.id:  # Проверяем, что объект уже создан
            recipes = self.recipes.all()
            self.recipes_count = recipes.count()
            if self.recipes_count > 0:
                total_time = sum(recipe.cooking_time for recipe in recipes)
                self.cooking_time_avg = total_time // self.recipes_count
                # Сохраняем изменения, но избегаем рекурсии
                super().save(update_fields=['recipes_count', 'cooking_time_avg'])

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=200, verbose_name="Название")
    slug = models.SlugField(unique=True, blank=True)
    category = models.ForeignKey(
        Category,
        related_name='recipes',
        on_delete=models.CASCADE,
        verbose_name="Категория"
    )
    ingredients = models.TextField(verbose_name="Ингредиенты")
    instructions = models.TextField(verbose_name="Инструкция приготовления")
    cooking_time = models.IntegerField(
        verbose_name="Время приготовления",
        help_text="Время приготовления в минутах"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Рецепт"
        verbose_name_plural = "Рецепты"
