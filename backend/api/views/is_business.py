from rest_framework.permissions import BasePermission


class IsBusiness(BasePermission):
    def has_permission(self, request, view):
        return hasattr(request.user, 'business')
    