from django.http import JsonResponse

def handle500(request):
    response = JsonResponse({ 'detail': 'Internal Server Error' })
    response.status_code = 500
    return response
