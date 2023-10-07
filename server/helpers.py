import os
import requests
import imghdr 


def save_to_imgur(id, file):
    imgur_client_id = os.environ.get('IMGUR_CLIENT_ID')
    image_format = 'jpg' if imghdr.what(None, h=file) == 'jpeg' else 'png'

    id_string = str(id)

    form_data = {
        'type': 'file',
        'image': file,
        'name': f'user_{id_string}_profile_picture.{image_format}'
    }

    headers = {
        'Authorization': f'Client-ID {imgur_client_id}'
    }

    response = requests.post('https://api.imgur.com/3/image', headers=headers, data=form_data)
    imgur_response = response.json()

    if imgur_response['status'] == 200:
        imgur_image_url = imgur_response['data']['link']
        return imgur_image_url
    else:
        return ''
