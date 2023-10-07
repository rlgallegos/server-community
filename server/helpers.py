import os
import requests
import imghdr 

def save_to_imgur(id, file, prev_del_hash):

    # Delete previous picture from Imgur
    if prev_del_hash:
        delete_res = delete_from_imgur(prev_del_hash)
        if not delete_res:
            return make_response({'error': 'Failed to delete previous picture'}, 422)

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
        imgur_delete_hash = imgur_response['data']['deletehash']
        return (imgur_image_url, imgur_delete_hash)
    else:
        return ('', '')

def delete_from_imgur(del_hash):
    imgur_client_id = os.environ.get('IMGUR_CLIENT_ID')
    headers = {
        'Authorization': f'Client-ID {imgur_client_id}'
    }
    response = requests.delete(f'https://api.imgur.com/3/image/{del_hash}', headers=headers)
    imgur_response = response.json()

    if imgur_response['status'] == 200:
        return True
    else:
        return False