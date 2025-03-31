from django.shortcuts import render

# Create your views here.
def base(request):
    return render(request, 'basetmp/base.html', {
        'title': 'Base Page'
    })
