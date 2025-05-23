# posting/templatetags/custom_filters.py
from django import template

register = template.Library()

@register.filter
def multiply(value, arg):
    try:
        return int(float(value) * float(arg))
    except (ValueError, TypeError):
        return ''