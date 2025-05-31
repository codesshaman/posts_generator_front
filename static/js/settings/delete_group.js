function deleteGroup(groupId) {
    if (confirm(window.Translations.are_you_sure)) {
        fetch(`/delete_group/${groupId}/`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': '{{ csrf_token }}'
            }
        }).then(() => {
            window.location.reload();
        });
    }
}