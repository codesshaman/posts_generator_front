from django.shortcuts import render


def base(request):
    return render(request, 'basetmp/base.html', {
        'title': 'Base Page'
    })
